// ═══ STATE ═══
let currentDay = 1;
let currentPhase = 1;
let activeFilter = 'all';
let searchQuery = '';
let focusedCard = -1;
let radarChart = null;
let currentTab = 'practice';

// Completion data — now stores timestamps for "today" tracking
// Format: { "d1_dsa_1": "2026-04-05T12:30:00Z", ... } or { "d1_dsa_1": true } (legacy)
let completedChallenges = JSON.parse(localStorage.getItem('ep_completed') || '{}');
let completedDays = JSON.parse(localStorage.getItem('ep_days') || '[]');

// Library day (independent from practice day)
let libDay = 1;

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  renderDayStrip();
  renderDay(currentDay);
  updateProgress();
  updateHeaderStats();
  updateCategoryBars();
  renderQuote();
  renderReadings();
  initRadarChart();
  initKeyboard();
  initTheme();
  renderSessionHistory();
  document.getElementById('prevDay').addEventListener('click', () => navigateDay(-1));
  document.getElementById('nextDay').addEventListener('click', () => navigateDay(1));
  document.getElementById('searchBox').addEventListener('input', e => { searchQuery = e.target.value.toLowerCase(); renderDay(currentDay); });
});

// ═══ TAB SWITCHING ═══
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.tab-nav-btn[data-tab="${tab}"]`).classList.add('active');
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  localStorage.setItem('ep_active_tab', tab);

  // Refresh tab data when switching
  if (tab === 'analytics') {
    updateAnalyticsTab();
  } else if (tab === 'library') {
    renderReadings();
    if (typeof AIRTRIBE_SD !== 'undefined') renderAirtribeList();
  }
}

function updateAnalyticsTab() {
  if (typeof renderHeatmap === 'function') renderHeatmap();
  if (typeof updateWeeklyStats === 'function') updateWeeklyStats();
  updateCategoryBars();
  if (radarChart) updateRadarChart();
  updateAnalyticsTodaySummary();
  renderSessionHistory();

  // Goal presets
  if (typeof getDailyGoal === 'function') {
    const goal = getDailyGoal();
    document.querySelectorAll('.goal-preset-time').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.mins) === goal.mins);
    });
    document.querySelectorAll('.goal-preset-challenge').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.count) === goal.challenges);
    });
  }
}

function updateAnalyticsTodaySummary() {
  const todayTime = document.getElementById('anTodayTime');
  const todaySessions = document.getElementById('anTodaySessions');
  const todayChallenges = document.getElementById('anTodayChallenges');
  const streak = document.getElementById('anStreak');

  if (typeof getSessionData === 'function') {
    const data = getSessionData();
    const today = data[todayKey()] || { totalMins: 0, sessions: [] };
    if (todayTime) todayTime.textContent = formatMins(today.totalMins);
    if (todaySessions) todaySessions.textContent = today.sessions?.length || 0;
  }

  if (todayChallenges) {
    todayChallenges.textContent = getTodayCompletedCount();
  }

  if (streak && typeof getSessionData === 'function') {
    streak.textContent = document.getElementById('sbStreakCount')?.textContent || '0';
  }
}

// ═══ THEME ═══
function initTheme() {
  const saved = localStorage.getItem('ep_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeToggle').textContent = saved === 'dark' ? '🌙' : '☀️';
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Restore active tab
  const savedTab = localStorage.getItem('ep_active_tab');
  if (savedTab && ['practice', 'analytics', 'library'].includes(savedTab)) {
    switchTab(savedTab);
  }
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ep_theme', next);
  document.getElementById('themeToggle').textContent = next === 'dark' ? '🌙' : '☀️';
  if (radarChart) { updateRadarChart(); }
}

// ═══ PHASE ═══
function switchPhase(phase) {
  currentPhase = phase;
  document.querySelectorAll('.phase-pill').forEach(p => p.classList.remove('active'));
  document.querySelector(`.phase-pill.p${phase}`).classList.add('active');
  const startDay = (phase - 1) * 30 + 1;
  goToDay(startDay);
  renderDayStrip();
}

// ═══ NAVIGATION ═══
function navigateDay(delta) {
  const newDay = currentDay + delta;
  if (newDay >= 1 && newDay <= DAYS_DATA.length) { goToDay(newDay); }
}
function goToDay(day) {
  currentDay = day;
  currentPhase = day <= 30 ? 1 : day <= 60 ? 2 : 3;
  document.querySelectorAll('.phase-pill').forEach(p => p.classList.remove('active'));
  document.querySelector(`.phase-pill.p${currentPhase}`).classList.add('active');
  focusedCard = -1;
  renderDay(currentDay);
  updateDayStrip();
  updateProgress();
  renderQuote();
  document.getElementById('prevDay').disabled = currentDay === 1;
  document.getElementById('nextDay').disabled = currentDay === DAYS_DATA.length;
}

// ═══ DAY STRIP ═══
function renderDayStrip() {
  const strip = document.getElementById('dayStrip');
  strip.innerHTML = '';
  const start = (currentPhase - 1) * 30 + 1;
  const end = Math.min(currentPhase * 30, DAYS_DATA.length);
  for (let i = start; i <= end; i++) {
    const dot = document.createElement('div');
    const cls = ['day-dot'];
    if (i === currentDay) cls.push('active');
    if (completedDays.includes(i)) cls.push('completed');
    dot.className = cls.join(' ');
    dot.textContent = i;
    dot.addEventListener('click', () => goToDay(i));
    strip.appendChild(dot);
  }
}
function updateDayStrip() {
  const dots = document.querySelectorAll('.day-dot');
  const start = (currentPhase - 1) * 30 + 1;
  dots.forEach((dot, idx) => {
    const day = start + idx;
    const cls = ['day-dot'];
    if (day === currentDay) cls.push('active');
    if (completedDays.includes(day)) cls.push('completed');
    dot.className = cls.join(' ');
  });
  const active = document.querySelector('.day-dot.active');
  if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

// ═══ RENDER DAY ═══
function renderDay(dayNum) {
  const dayData = DAYS_DATA.find(d => d.day === dayNum);
  if (!dayData) return;
  document.getElementById('dayTitle').innerHTML = `Day <span>${dayData.day}</span> — ${dayData.title}`;
  const grid = document.getElementById('challengesGrid');
  grid.innerHTML = '';
  let filtered = dayData.challenges;
  if (activeFilter !== 'all') { filtered = filtered.filter(c => c.category === activeFilter); }
  if (searchQuery) { filtered = filtered.filter(c => c.title.toLowerCase().includes(searchQuery) || c.description.toLowerCase().includes(searchQuery) || (c.companies && c.companies.some(co => co.toLowerCase().includes(searchQuery)))); }
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="no-results">No matching challenges found</div>';
    return;
  }
  filtered.forEach((ch, idx) => grid.appendChild(createChallengeCard(ch, idx + 1)));
}

function createChallengeCard(ch, num) {
  const done = !!completedChallenges[ch.id];
  const card = document.createElement('div');
  card.className = 'challenge-card';
  card.setAttribute('data-id', ch.id);
  const colors = { dsa:'#06b6d4', lld:'#10b981', hld:'#f59e0b', ds:'#a855f7', lead:'#ec4899' };
  const labels = { dsa:'DSA', lld:'LLD', hld:'HLD', ds:'DATA STRUCT', lead:'LEADERSHIP' };
  const color = colors[ch.category] || '#6366f1';
  const diffCap = ch.difficulty.charAt(0).toUpperCase() + ch.difficulty.slice(1);

  const tabs = ['Problem', 'Hints', 'Approach'];
  if (ch.code) tabs.push('Solution');
  if (ch.tradeoffs) tabs.push('Trade-offs');
  if (ch.redFlags) tabs.push('Red Flags');
  if (ch.rubric) tabs.push('Grading Rubric');
  if (ch.pivots) tabs.push('Discussion Pivots');

  let tabBar = '<div class="tab-bar">' + tabs.map((t, i) => `<button class="tab-btn ${i===0?'active':''}" onclick="event.stopPropagation();switchCardTab(this,'${ch.id}',${i})">${t}</button>`).join('') + '</div>';

  let tabContents = `<div class="tab-content active" data-tab="${ch.id}-0"><h4>📋 Problem</h4><p>${ch.description}</p>`;
  if (ch.companies && ch.companies.length) { tabContents += `<div class="company-tags">${ch.companies.map(c => `<span class="company-tag">${c}</span>`).join('')}</div>`; }
  tabContents += '</div>';
  
  let tIdx = 1;
  tabContents += `<div class="tab-content" data-tab="${ch.id}-${tIdx++}"><h4>💡 Hints</h4><ul>${ch.hints.map(h => `<li>${h}</li>`).join('')}</ul></div>`;
  tabContents += `<div class="tab-content" data-tab="${ch.id}-${tIdx++}"><h4>🧠 Approach</h4><p>${ch.approach}</p></div>`;
  
  if (ch.code) { tabContents += `<div class="tab-content" data-tab="${ch.id}-${tIdx++}"><h4>💻 Solution</h4><pre><code>${escapeHtml(ch.code)}</code></pre></div>`; }
  if (ch.tradeoffs) { tabContents += `<div class="tab-content" data-tab="${ch.id}-${tIdx++}"><h4>⚖️ Trade-off Analysis</h4><div class="pro-content">${ch.tradeoffs}</div></div>`; }
  if (ch.redFlags) { tabContents += `<div class="tab-content" data-tab="${ch.id}-${tIdx++}"><h4>🚩 Red Flags & Anti-Patterns</h4><div class="pro-content">${ch.redFlags}</div></div>`; }
  if (ch.rubric) { tabContents += `<div class="tab-content" data-tab="${ch.id}-${tIdx++}"><h4>🎯 Grading Rubric</h4><div class="pro-content">${ch.rubric}</div></div>`; }
  if (ch.pivots) { tabContents += `<div class="tab-content" data-tab="${ch.id}-${tIdx++}"><h4>🔄 Drive the Discussion</h4><div class="pro-content">${ch.pivots}</div></div>`; }

  card.innerHTML = `
    <div class="challenge-header" onclick="toggleCard(this)">
      <div class="challenge-left">
        <div class="challenge-number" style="background:${color}20;color:${color};">${num}</div>
        <div class="challenge-info">
          <div class="challenge-title">${ch.title}</div>
          <div class="challenge-meta">
            <span class="category-tag ${ch.category}">${labels[ch.category]}</span>
            <span class="difficulty-tag ${ch.difficulty}">${diffCap}</span>
          </div>
        </div>
      </div>
      <div class="challenge-right">
        <button class="check-btn ${done?'done':''}" onclick="event.stopPropagation();toggleComplete('${ch.id}',this)">${done?'✓':''}</button>
        <span class="expand-icon">▼</span>
      </div>
    </div>
    <div class="challenge-body"><div class="challenge-content">${tabBar}${tabContents}</div></div>`;
  return card;
}

function escapeHtml(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function switchCardTab(btn, id, idx) {
  const card = btn.closest('.challenge-card');
  card.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  card.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  card.querySelector(`[data-tab="${id}-${idx}"]`).classList.add('active');
}
function toggleCard(header) { header.closest('.challenge-card').classList.toggle('expanded'); }

// ═══ FILTER ═══
function filterCategory(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderDay(currentDay);
}

// ═══ COMPLETION (with timestamps) ═══
function toggleComplete(id, btn) {
  if (completedChallenges[id]) {
    delete completedChallenges[id];
  } else {
    // Store ISO timestamp instead of boolean
    completedChallenges[id] = new Date().toISOString();
  }
  localStorage.setItem('ep_completed', JSON.stringify(completedChallenges));
  btn.classList.toggle('done');
  btn.textContent = completedChallenges[id] ? '✓' : '';
  checkDayCompletion();
  updateProgress();
  updateHeaderStats();
  updateRadarChart();
  updateCategoryBars();
  // Sync with study tracker
  if (typeof updateSessionBarGoals === 'function') updateSessionBarGoals();
}

function getTodayCompletedCount() {
  const todayStr = new Date().toISOString().split('T')[0];
  let count = 0;
  Object.values(completedChallenges).forEach(val => {
    if (typeof val === 'string') {
      // New format: ISO timestamp
      if (val.startsWith(todayStr)) count++;
    }
    // Legacy boolean format: can't determine date, skip
  });
  return count;
}

function checkDayCompletion() {
  const dayData = DAYS_DATA.find(d => d.day === currentDay);
  if (!dayData) return;
  const allDone = dayData.challenges.every(ch => completedChallenges[ch.id]);
  if (allDone && !completedDays.includes(currentDay)) { completedDays.push(currentDay); }
  else if (!allDone) { completedDays = completedDays.filter(d => d !== currentDay); }
  localStorage.setItem('ep_days', JSON.stringify(completedDays));
  updateDayStrip();
}

// ═══ PROGRESS ═══
function updateProgress() {
  const total = DAYS_DATA.reduce((s, d) => s + d.challenges.length, 0);
  const done = Object.keys(completedChallenges).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = `${done} / ${total} challenges (${pct}%)`;
}
function updateHeaderStats() {
  document.getElementById('solvedCount').textContent = Object.keys(completedChallenges).length;
}

// ═══ RADAR CHART ═══
function initRadarChart() {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['DSA', 'LLD', 'HLD', 'Data Struct', 'Leadership'],
      datasets: [{ label: 'Mastery %', data: getMasteryData(), backgroundColor: 'rgba(99,102,241,0.2)', borderColor: '#6366f1', borderWidth: 2, pointBackgroundColor: '#6366f1', pointRadius: 4 }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      scales: { r: { beginAtZero: true, max: 100, ticks: { display: false }, grid: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }, pointLabels: { color: isDark ? '#9090a8' : '#555570', font: { size: 11, weight: '600' } } } },
      plugins: { legend: { display: false } }
    }
  });
}
function getMasteryData() {
  const cats = ['dsa', 'lld', 'hld', 'ds', 'lead'];
  return cats.map(cat => {
    let total = 0, done = 0;
    DAYS_DATA.forEach(d => d.challenges.forEach(c => { if (c.category === cat) { total++; if (completedChallenges[c.id]) done++; } }));
    return total > 0 ? Math.round((done / total) * 100) : 0;
  });
}
function updateRadarChart() {
  if (!radarChart) return;
  radarChart.data.datasets[0].data = getMasteryData();
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  radarChart.options.scales.r.grid.color = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  radarChart.options.scales.r.pointLabels.color = isDark ? '#9090a8' : '#555570';
  radarChart.update();
}

// ═══ CATEGORY BARS ═══
function updateCategoryBars() {
  const cats = {dsa:'Dsa',lld:'Lld',hld:'Hld',ds:'Ds',lead:'Lead'};
  Object.entries(cats).forEach(([cat, suffix]) => {
    let total = 0, done = 0;
    DAYS_DATA.forEach(d => d.challenges.forEach(c => { if (c.category === cat) { total++; if (completedChallenges[c.id]) done++; } }));
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const bar = document.getElementById('catBar' + suffix);
    const pctEl = document.getElementById('catPct' + suffix);
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  });
}

// ═══ SESSION HISTORY ═══
function renderSessionHistory() {
  const container = document.getElementById('sessionHistory');
  if (!container || typeof getSessionData !== 'function') return;
  const data = getSessionData();
  const keys = Object.keys(data).sort().reverse().slice(0, 14); // Last 14 days

  if (keys.length === 0 || keys.every(k => !data[k].sessions?.length)) {
    container.innerHTML = '<div class="empty-state">No sessions recorded yet. Start your first session!</div>';
    return;
  }

  const maxMins = Math.max(1, ...keys.map(k => data[k].totalMins || 0));
  container.innerHTML = keys.filter(k => data[k].totalMins > 0).map(key => {
    const d = data[key];
    const dateObj = new Date(key + 'T00:00:00');
    const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const pct = (d.totalMins / maxMins) * 100;
    return `<div class="session-history-item">
      <span class="sh-date">${dateStr}</span>
      <span class="sh-time">${formatMins(d.totalMins)}</span>
      <div class="sh-bar"><div class="sh-bar-fill" style="width:${pct}%"></div></div>
      <span style="font-size:.65rem;color:var(--text-muted)">${d.sessions?.length || 0} sess</span>
    </div>`;
  }).join('');
}

// ═══ KEYBOARD ═══
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); navigateDay(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); navigateDay(1); }
    else if (e.key === 'j' || e.key === 'J') { moveFocus(1); }
    else if (e.key === 'k' || e.key === 'K') { moveFocus(-1); }
    else if (e.key === 'Enter') { const cards = document.querySelectorAll('.challenge-card'); if (focusedCard >= 0 && focusedCard < cards.length) { cards[focusedCard].classList.toggle('expanded'); } }
    else if (e.key === '1') { switchTab('practice'); }
    else if (e.key === '2') { switchTab('analytics'); }
    else if (e.key === '3') { switchTab('library'); }
    else if (e.key === 's' || e.key === 'S') {
      if (typeof getActiveSession === 'function') {
        if (getActiveSession()) stopStudySession(); else startStudySession();
      }
    }
    else if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); switchTab('practice'); document.getElementById('searchBox').focus(); }
  });
}
function moveFocus(delta) {
  const cards = document.querySelectorAll('.challenge-card');
  focusedCard = Math.max(-1, Math.min(cards.length - 1, focusedCard + delta));
  cards.forEach(c => c.style.outline = 'none');
  if (focusedCard >= 0 && focusedCard < cards.length) {
    cards[focusedCard].style.outline = '2px solid var(--accent-blue)';
    cards[focusedCard].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ═══ QUOTE ═══
function renderQuote() {
  const q = QUOTES[(currentDay - 1) % QUOTES.length];
  document.getElementById('dailyQuote').innerHTML = `"${q.text}" <span class="author">${q.author}</span>`;
}

// ═══ READINGS (Library Tab) ═══
function renderReadings() {
  const grid = document.getElementById('readingsGrid');
  if (!grid || typeof DAILY_READINGS === 'undefined') return;
  const readings = DAILY_READINGS[libDay - 1];
  if (!readings) return;
  // Update label
  const label = document.getElementById('libDayLabel');
  if (label) label.textContent = `Day ${libDay}`;
  grid.innerHTML = readings.map(r => `
    <div class="reading-card">
      <div class="reading-card-header">
        <span class="reading-tag ${r.tag}">${r.tag}</span>
        <span class="reading-time">⏱ ${r.time}</span>
      </div>
      <div class="reading-card-title">${r.title}</div>
      <div class="reading-card-desc">${r.desc}</div>
      <div class="reading-card-source">📖 ${r.src}</div>
    </div>
  `).join('');
}
function libPrevDay() {
  if (libDay > 1) { libDay--; renderReadings(); }
}
function libNextDay() {
  if (typeof DAILY_READINGS !== 'undefined' && libDay < DAILY_READINGS.length) { libDay++; renderReadings(); }
}

// ═══ AIRTRIBE COURSE TRACKER ═══
let airtribeTab = 'sd';

function switchAirtribeTab(tab) {
  airtribeTab = tab;
  document.getElementById('tabSD').classList.toggle('active', tab === 'sd');
  document.getElementById('tabJava').classList.toggle('active', tab === 'java');
  document.getElementById('airtribeSearch').value = '';
  renderAirtribeList();
}

function getQuestionTag(title) {
  const t = title.toLowerCase();
  if (t.includes('low level') || t.includes('lld') || t.includes('parking') || t.includes('vending') || t.includes('tic-tac') || t.includes('restaurant') || t.includes('airline')) return { cls: 'lld', label: 'LLD' };
  if (t.includes('cache') || t.includes('cdn') || t.includes('kafka') || t.includes('redis') || t.includes('load') || t.includes('scheduler') || t.includes('crawler') || t.includes('health check') || t.includes('fault') || t.includes('chaos') || t.includes('pipeline') || t.includes('message queue') || t.includes('config')) return { cls: 'infra', label: 'INFRA' };
  if (t.includes('canary') || t.includes('rollout') || t.includes('toggle') || t.includes('multi-tenant') || t.includes('dependency') || t.includes('authorization') || t.includes('compatibility') || t.includes('surge') || t.includes('shedding') || t.includes('dsp')) return { cls: 'adv', label: 'ADV' };
  return { cls: 'hld', label: 'HLD' };
}

function renderAirtribeList() {
  const list = document.getElementById('airtribeList');
  if (!list) return;
  const items = airtribeTab === 'sd' ? AIRTRIBE_SD : AIRTRIBE_JAVA;
  const prefix = airtribeTab === 'sd' ? 'sd' : 'java';
  const progress = getAirtribeProgress();
  const search = (document.getElementById('airtribeSearch')?.value || '').toLowerCase();

  let html = '';
  items.forEach((title, i) => {
    const key = `${prefix}_${i}`;
    const checked = progress[key] || false;
    if (search && !title.toLowerCase().includes(search)) return;
    const tag = airtribeTab === 'sd' ? getQuestionTag(title) : { cls: 'hld', label: 'JAVA' };
    html += `<div class="airtribe-item ${checked ? 'checked' : ''}" onclick="toggleAirtribeItem('${key}')">
      <div class="airtribe-check">${checked ? '✓' : ''}</div>
      <span class="airtribe-num">#${i + 1}</span>
      <span class="airtribe-title">${title}</span>
      <span class="airtribe-tag ${tag.cls}">${tag.label}</span>
    </div>`;
  });
  list.innerHTML = html || '<div style="text-align:center;color:rgba(255,255,255,.3);padding:2rem;">No matching questions</div>';

  const sdProgress = getAirtribeProgress();
  const sdDone = AIRTRIBE_SD.filter((_, i) => sdProgress[`sd_${i}`]).length;
  const javaDone = AIRTRIBE_JAVA.filter((_, i) => sdProgress[`java_${i}`]).length;
  const total = AIRTRIBE_SD.length + AIRTRIBE_JAVA.length;
  const totalDone = sdDone + javaDone;

  document.getElementById('sdCount').textContent = `${sdDone}/${AIRTRIBE_SD.length}`;
  document.getElementById('javaCount').textContent = `${javaDone}/${AIRTRIBE_JAVA.length}`;
  document.getElementById('airtribeStats').textContent = `${totalDone}/${total} completed`;
  document.getElementById('airtribeProgressFill').style.width = `${(totalDone / total) * 100}%`;
}

function toggleAirtribeItem(key) {
  const progress = getAirtribeProgress();
  progress[key] = !progress[key];
  saveAirtribeProgress(progress);
  renderAirtribeList();
}

// Initialize airtribe on load
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AIRTRIBE_SD !== 'undefined') renderAirtribeList();
});
