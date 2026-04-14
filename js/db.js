// ═══════════════════════════════════════════════════════════════
// DB — Data Abstraction Layer (localStorage + Firestore Sync)
// ═══════════════════════════════════════════════════════════════
//
// Architecture:
// - localStorage = primary cache (instant reads, works offline)
// - Firestore = cloud backend (background sync when authenticated)
// - Unauthenticated users = full localStorage-only experience (zero regression)
// - First sign-in = auto-migrates existing localStorage → Firestore
// - Subsequent loads = Firestore is source of truth → refreshes localStorage
//
// ═══════════════════════════════════════════════════════════════

const DB = (() => {
  // ── Private State ──
  let _user = null;
  let _db = null;
  let _syncing = false;
  let _initialized = false;

  // Map localStorage keys → Firestore document paths
  // Structure: users/{uid}/data/{doc} → { [field]: value }
  const CLOUD_MAP = {
    'ep_completed':       { doc: 'progress',  field: 'completedChallenges' },
    'ep_days':            { doc: 'progress',  field: 'completedDays' },
    'ep_sessions':        { doc: 'sessions',  field: 'sessionData' },
    'ep_daily_goal':      { doc: 'settings',  field: 'dailyGoal' },
    'ep_theme':           { doc: 'settings',  field: 'theme' },
    'airtribeProgress':   { doc: 'airtribe',  field: 'progress' },
  };

  // Keys that are NOT synced (transient / per-tab state)
  // ep_active_session → live timer, local to current tab
  // ep_active_tab → UI state, per-browser preference

  // ── Read from localStorage (synchronous, instant) ──
  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch {
      // Handle legacy non-JSON strings (e.g., 'dark' stored without quotes)
      const raw = localStorage.getItem(key);
      return raw !== null ? raw : fallback;
    }
  }

  // ── Write to localStorage + async Firestore push ──
  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    _pushToCloud(key, value);
  }

  // ── Firestore: push a single key in background ──
  async function _pushToCloud(key, value) {
    if (!_user || !_db) return;
    const mapping = CLOUD_MAP[key];
    if (!mapping) return;

    try {
      const docRef = _db.collection('users').doc(_user.uid)
        .collection('data').doc(mapping.doc);
      await docRef.set({
        [mapping.field]: value,
        _updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('[DB] Firestore write failed for', key, err.message);
    }
  }

  // ── Firestore: pull all data → update localStorage ──
  async function _pullFromCloud() {
    if (!_user || !_db) return false;
    _syncing = true;
    _updateSyncUI('syncing');

    try {
      const snapshot = await _db.collection('users').doc(_user.uid)
        .collection('data').get();

      if (snapshot.empty) {
        // First sign-in: migrate existing localStorage → Firestore
        await _migrateToCloud();
        _syncing = false;
        _updateSyncUI('synced');
        _showToast('☁️ Data backed up to cloud');
        return false; // No UI refresh needed, data is already in localStorage
      }

      // Firestore has data → pull it into localStorage
      let hasUpdates = false;
      snapshot.forEach(doc => {
        const data = doc.data();
        const docId = doc.id;

        Object.entries(CLOUD_MAP).forEach(([key, mapping]) => {
          if (mapping.doc === docId && data[mapping.field] !== undefined) {
            localStorage.setItem(key, JSON.stringify(data[mapping.field]));
            hasUpdates = true;
          }
        });
      });

      _syncing = false;
      _updateSyncUI('synced');
      return hasUpdates;
    } catch (err) {
      console.error('[DB] Firestore pull failed:', err);
      _syncing = false;
      _updateSyncUI('error');
      return false;
    }
  }

  // ── Migrate localStorage → Firestore (first sign-in) ──
  async function _migrateToCloud() {
    // Group localStorage data by Firestore document
    const grouped = {};
    Object.entries(CLOUD_MAP).forEach(([key, mapping]) => {
      if (!grouped[mapping.doc]) grouped[mapping.doc] = {};
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        try { grouped[mapping.doc][mapping.field] = JSON.parse(raw); }
        catch { grouped[mapping.doc][mapping.field] = raw; }
      }
    });

    // Batch write all documents at once
    const batch = _db.batch();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    let hasData = false;

    Object.entries(grouped).forEach(([docId, data]) => {
      if (Object.keys(data).length > 0) {
        const ref = _db.collection('users').doc(_user.uid)
          .collection('data').doc(docId);
        batch.set(ref, { ...data, _updatedAt: timestamp }, { merge: true });
        hasData = true;
      }
    });

    if (hasData) {
      await batch.commit();
      console.log('[DB] Migration complete — localStorage → Firestore');
    }
  }

  // ── Refresh in-memory app state after cloud sync ──
  function _refreshAppState() {
    // Reload global in-memory variables from localStorage (now updated from Firestore)
    if (typeof completedChallenges !== 'undefined') {
      completedChallenges = load('ep_completed', {});
    }
    if (typeof completedDays !== 'undefined') {
      completedDays = load('ep_days', []);
    }

    // Apply theme from cloud
    const cloudTheme = load('ep_theme', null);
    if (cloudTheme && document.documentElement.getAttribute('data-theme') !== cloudTheme) {
      document.documentElement.setAttribute('data-theme', cloudTheme);
      const toggle = document.getElementById('themeToggle');
      if (toggle) toggle.textContent = cloudTheme === 'dark' ? '🌙' : '☀️';
    }

    // Re-render all UI components
    if (typeof renderDayStrip === 'function') renderDayStrip();
    if (typeof renderDay === 'function' && typeof currentDay !== 'undefined') renderDay(currentDay);
    if (typeof updateProgress === 'function') updateProgress();
    if (typeof updateHeaderStats === 'function') updateHeaderStats();
    if (typeof updateCategoryBars === 'function') updateCategoryBars();
    if (typeof updateRadarChart === 'function') updateRadarChart();
    if (typeof updateSessionBar === 'function') updateSessionBar();
    if (typeof updateStreakWidget === 'function') updateStreakWidget();
    if (typeof renderAirtribeList === 'function') renderAirtribeList();
    if (typeof renderSessionHistory === 'function') renderSessionHistory();

    _showToast('✓ Synced from cloud');
  }

  // ── Auth UI Updates ──
  function _updateAuthUI(user) {
    const signInBtn = document.getElementById('signInBtn');
    const authUser = document.getElementById('authUser');
    const authAvatar = document.getElementById('authAvatar');
    const authName = document.getElementById('authName');
    const authEmail = document.getElementById('authEmail');

    if (!signInBtn || !authUser) return;

    if (user) {
      signInBtn.style.display = 'none';
      authUser.style.display = 'flex';
      if (authAvatar) authAvatar.src = user.photoURL || '';
      if (authName) authName.textContent = user.displayName || 'User';
      if (authEmail) authEmail.textContent = user.email || '';
    } else {
      signInBtn.style.display = 'flex';
      authUser.style.display = 'none';
    }
  }

  function _updateSyncUI(status) {
    const el = document.getElementById('authSyncStatus');
    if (!el) return;
    switch (status) {
      case 'syncing':
        el.textContent = '⟳ Syncing...';
        el.className = 'auth-sync-status syncing';
        break;
      case 'synced':
        el.textContent = '✓ Synced';
        el.className = 'auth-sync-status synced';
        break;
      case 'error':
        el.textContent = '✕ Sync failed';
        el.className = 'auth-sync-status error';
        break;
    }
  }

  // ── Toast Notifications ──
  function _showToast(message) {
    let toast = document.getElementById('syncToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'syncToast';
      toast.className = 'sync-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ── Public API ──
  return {
    load,
    save,

    // Initialize Firebase Auth listener
    init() {
      if (_initialized) return;
      _initialized = true;

      // Guard: if Firebase SDK isn't loaded or wasn't configured
      if (typeof firebase === 'undefined' || !firebase.apps?.length) {
        console.warn('[DB] Firebase not initialized. Running in localStorage-only mode.');
        return;
      }

      _db = firebase.firestore();

      firebase.auth().onAuthStateChanged(async (user) => {
        _user = user;
        _updateAuthUI(user);

        if (user) {
          console.log('[DB] Authenticated as', user.displayName);
          const hasUpdates = await _pullFromCloud();
          if (hasUpdates) _refreshAppState();
        }
      });
    },

    // Google Sign-In (popup)
    async signIn() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
      } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user') {
          console.error('[DB] Sign-in failed:', err);
          _showToast('Sign-in failed. Try again.');
        }
      }
    },

    // Sign Out
    async signOut() {
      try {
        await firebase.auth().signOut();
        _user = null;
        _showToast('Signed out');
      } catch (err) {
        console.error('[DB] Sign-out failed:', err);
      }
    },

    // Toggle auth dropdown (called from HTML)
    toggleDropdown() {
      const dropdown = document.getElementById('authDropdown');
      if (dropdown) dropdown.classList.toggle('show');

      // Close on outside click
      const handler = (e) => {
        if (!e.target.closest('.auth-user')) {
          dropdown?.classList.remove('show');
          document.removeEventListener('click', handler);
        }
      };
      setTimeout(() => document.addEventListener('click', handler), 10);
    },

    // Utility getters
    isAuthenticated() { return !!_user; },
    getUser() { return _user; },
  };
})();
