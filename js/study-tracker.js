// ═══════════════════════════════════════════════════════════════
// STUDY SESSION TRACKER v2 — Session Bar Integration
// Persistent session bar + Unified streak + Fixed daily count
// ═══════════════════════════════════════════════════════════════

const ST_KEYS = {
  sessions: 'ep_sessions',
  active: 'ep_active_session',
  goal: 'ep_daily_goal',
};

// ═══ DATA ACCESS ═══
function getSessionData() {
  try { return JSON.parse(localStorage.getItem(ST_KEYS.sessions) || '{}'); } catch { return {}; }
}
function saveSessionData(data) {
  localStorage.setItem(ST_KEYS.sessions, JSON.stringify(data));
}
function getActiveSession() {
  try { return JSON.parse(localStorage.getItem(ST_KEYS.active)); } catch { return null; }
}
function saveActiveSession(session) {
  localStorage.setItem(ST_KEYS.active, JSON.stringify(session));
}
function getDailyGoal() {
  try { return JSON.parse(localStorage.getItem(ST_KEYS.goal)) || { mins: 45, challenges: 3 }; } catch { return { mins: 45, challenges: 3 }; }
}
function saveDailyGoal(goal) {
  localStorage.setItem(ST_KEYS.goal, JSON.stringify(goal));
}

// ═══ DATE HELPERS ═══
function todayKey() { return new Date().toISOString().split('T')[0]; }
function dateToKey(date) { return date.toISOString().split('T')[0]; }
function keyToDate(key) { return new Date(key + 'T00:00:00'); }
function formatMins(mins) {
  if (mins < 60) return `${Math.round(mins)}m`;
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
function getDayOfWeek(dateKey) {
  return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][keyToDate(dateKey).getDay()];
}
function getMonthLabel(dateKey) {
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][keyToDate(dateKey).getMonth()];
}

// ═══ SESSION START / STOP ═══
let sessionTickInterval = null;

function startStudySession() {
  const active = getActiveSession();
  if (active) return;

  const session = { startTime: new Date().toISOString() };
  saveActiveSession(session);
  updateSessionBar();
  startSessionTick();
}

function stopStudySession() {
  const active = getActiveSession();
  if (!active) return;

  const start = new Date(active.startTime);
  const end = new Date();
  const mins = (end - start) / 60000;

  if (mins >= 0.1) { // Record even short sessions
    const data = getSessionData();
    const key = todayKey();
    if (!data[key]) data[key] = { totalMins: 0, sessions: [] };
    data[key].sessions.push({
      start: active.startTime,
      end: end.toISOString(),
      mins: Math.round(mins * 10) / 10
    });
    data[key].totalMins = data[key].sessions.reduce((s, sess) => s + sess.mins, 0);
    saveSessionData(data);
  }

  saveActiveSession(null);
  stopSessionTick();
  updateSessionBar();
  // Refresh analytics if on that tab
  if (typeof renderHeatmap === 'function') renderHeatmap();
  if (typeof updateWeeklyStats === 'function') updateWeeklyStats();
  if (typeof renderSessionHistory === 'function') renderSessionHistory();
  if (typeof updateAnalyticsTodaySummary === 'function') updateAnalyticsTodaySummary();
  updateStreakWidget();
}

function startSessionTick() {
  stopSessionTick();
  sessionTickInterval = setInterval(updateSessionTimer, 1000);
}
function stopSessionTick() {
  if (sessionTickInterval) { clearInterval(sessionTickInterval); sessionTickInterval = null; }
}

function updateSessionTimer() {
  const active = getActiveSession();
  const timer = document.getElementById('sbTimer');
  if (!active || !timer) return;

  const elapsed = (new Date() - new Date(active.startTime)) / 1000;
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = Math.floor(elapsed % 60);

  timer.textContent = h > 0
    ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ═══ SESSION BAR UI ═══
function updateSessionBar() {
  const active = getActiveSession();
  const startBtn = document.getElementById('sbStartBtn');
  const stopBtn = document.getElementById('sbStopBtn');
  const timer = document.getElementById('sbTimer');
  const dot = document.getElementById('sbStatusDot');

  if (!startBtn) return;

  if (active) {
    startBtn.style.display = 'none';
    stopBtn.style.display = 'flex';
    timer.classList.add('active');
    dot.classList.add('active');
    startSessionTick();
    updateSessionTimer();
  } else {
    startBtn.style.display = 'flex';
    stopBtn.style.display = 'none';
    timer.classList.remove('active');
    timer.textContent = '00:00';
    dot.classList.remove('active');
  }

  updateSessionBarGoals();
}

function updateSessionBarGoals() {
  const goal = getDailyGoal();
  const data = getSessionData();
  const today = data[todayKey()] || { totalMins: 0 };

  // Time goal
  const timePct = Math.min(100, (today.totalMins / goal.mins) * 100);
  const timeFill = document.getElementById('sbGoalTimeFill');
  const timeText = document.getElementById('sbGoalTimeText');
  if (timeFill) timeFill.style.width = timePct + '%';
  if (timeText) timeText.textContent = `${formatMins(today.totalMins)} / ${formatMins(goal.mins)}`;

  // Challenge goal — use today's count
  const todayCount = typeof getTodayCompletedCount === 'function' ? getTodayCompletedCount() : 0;
  const challengePct = Math.min(100, (todayCount / goal.challenges) * 100);
  const challengeFill = document.getElementById('sbGoalChallengeFill');
  const challengeText = document.getElementById('sbGoalChallengeText');
  if (challengeFill) challengeFill.style.width = challengePct + '%';
  if (challengeText) challengeText.textContent = `${todayCount} / ${goal.challenges}`;

  // Today's total time label
  const totalEl = document.getElementById('sbTotalToday');
  if (totalEl) totalEl.textContent = today.totalMins > 0 ? `${formatMins(today.totalMins)} today` : '0m today';

  updateStreakWidget();
}

// ═══ UNIFIED STREAK ═══
function calcUnifiedStreak() {
  const data = getSessionData();
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = dateToKey(d);
    const dayData = data[key];
    const hasSession = dayData && dayData.totalMins > 0;

    // Check if any challenges were completed on this day
    let hasChallenge = false;
    if (typeof completedChallenges !== 'undefined') {
      hasChallenge = Object.values(completedChallenges).some(val => {
        if (typeof val === 'string') return val.startsWith(key);
        return false;
      });
    }

    const hasActivity = hasSession || hasChallenge;

    if (i === 0 && !hasActivity) {
      continue; // Today is allowed to be empty
    }
    if (hasActivity) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  return streak;
}

function updateStreakWidget() {
  const streak = calcUnifiedStreak();
  const streakEl = document.getElementById('sbStreakCount');
  if (streakEl) streakEl.textContent = streak;

  // Also update analytics tab streak
  const anStreak = document.getElementById('anStreak');
  if (anStreak) anStreak.textContent = streak;

  // Streak warning on Practice tab
  const warn = document.getElementById('streakWarning');
  if (warn) {
    const data = getSessionData();
    const todayData = data[todayKey()];
    const hasStudiedToday = todayData && todayData.totalMins > 0;
    const hasChallengeToday = typeof getTodayCompletedCount === 'function' && getTodayCompletedCount() > 0;
    const hasActivityToday = hasStudiedToday || hasChallengeToday;

    if (streak > 0 && !hasActivityToday) {
      warn.style.display = 'flex';
      warn.className = 'streak-warning';
      warn.innerHTML = `⚠️ Don't break your <strong>${streak}-day streak</strong>! Start a session now.`;
    } else if (streak > 0 && hasActivityToday) {
      warn.style.display = 'flex';
      warn.className = 'streak-warning safe';
      warn.innerHTML = `🔥 <strong>${streak}-day streak</strong> protected! Keep it up!`;
    } else {
      warn.style.display = 'none';
    }
  }
}

// ═══ HEATMAP ═══
function renderHeatmap() {
  const container = document.getElementById('heatmapGrid');
  if (!container) return;

  const data = getSessionData();
  const today = new Date();
  const days = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(dateToKey(d));
  }

  // Group into weeks
  const weeks = [];
  let currentWeek = [];
  const firstDayOfWeek = keyToDate(days[0]).getDay();
  for (let i = 0; i < firstDayOfWeek; i++) currentWeek.push(null);
  days.forEach(key => {
    currentWeek.push(key);
    if (currentWeek.length === 7) { weeks.push(currentWeek); currentWeek = []; }
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  // Month labels
  const monthLabels = document.getElementById('heatmapMonths');
  if (monthLabels) {
    const months = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const validDay = week.find(d => d !== null);
      if (validDay) {
        const m = keyToDate(validDay).getMonth();
        if (m !== lastMonth) { months.push({ label: getMonthLabel(validDay), col: wi }); lastMonth = m; }
      }
    });
    monthLabels.style.gridTemplateColumns = `repeat(${weeks.length}, 1fr)`;
    monthLabels.innerHTML = months.map(m => `<span style="grid-column:${m.col + 1}">${m.label}</span>`).join('');
  }

  // Render cells
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${weeks.length}, 1fr)`;

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < weeks.length; col++) {
      const key = weeks[col][row];
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';

      if (key === null) {
        cell.classList.add('empty');
      } else {
        const mins = data[key]?.totalMins || 0;
        if (key === todayKey()) cell.classList.add('today');
        cell.classList.add(mins === 0 ? 'level-0' : mins <= 15 ? 'level-1' : mins <= 45 ? 'level-2' : mins <= 90 ? 'level-3' : 'level-4');

        const dateObj = keyToDate(key);
        const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const sessionCount = data[key]?.sessions?.length || 0;
        cell.title = mins > 0
          ? `${dateStr}\n${formatMins(mins)} studied\n${sessionCount} session${sessionCount !== 1 ? 's' : ''}`
          : `${dateStr}\nNo study logged`;
      }
      container.appendChild(cell);
    }
  }

  // Total label
  const totalDays = Object.keys(data).filter(k => data[k].totalMins > 0).length;
  const totalMins = Object.values(data).reduce((s, d) => s + (d.totalMins || 0), 0);
  const totalLabel = document.getElementById('heatmapTotalLabel');
  if (totalLabel) totalLabel.textContent = `${formatMins(totalMins)} over ${totalDays} day${totalDays !== 1 ? 's' : ''}`;
}

// ═══ WEEKLY STATS ═══
function updateWeeklyStats() {
  const data = getSessionData();
  const today = new Date();
  const dayOfWeek = today.getDay();

  let weekMins = 0, weekDays = 0;
  let bestDay = { key: '', mins: 0 };
  const dayBars = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - dayOfWeek + i);
    const key = dateToKey(d);
    const dayData = data[key];
    const mins = dayData?.totalMins || 0;
    dayBars.push({ day: ['S','M','T','W','T','F','S'][i], mins, key, isFuture: d > today });
    if (d <= today) {
      weekMins += mins;
      if (mins > 0) weekDays++;
      if (mins > bestDay.mins) bestDay = { key, mins };
    }
  }

  const weekTimeEl = document.getElementById('weekTotalTime');
  const weekDaysEl = document.getElementById('weekActiveDays');
  const weekBestEl = document.getElementById('weekBestDay');
  const weekAvgEl = document.getElementById('weekAvgTime');

  if (weekTimeEl) weekTimeEl.textContent = formatMins(weekMins);
  if (weekDaysEl) weekDaysEl.textContent = `${weekDays}/7`;
  if (weekBestEl) weekBestEl.textContent = bestDay.mins > 0 ? `${getDayOfWeek(bestDay.key)} (${formatMins(bestDay.mins)})` : '—';
  if (weekAvgEl) {
    const avg = weekDays > 0 ? weekMins / weekDays : 0;
    weekAvgEl.textContent = avg > 0 ? formatMins(avg) : '—';
  }

  // Week bar chart
  const barsContainer = document.getElementById('weekBarsChart');
  if (barsContainer) {
    const maxBar = Math.max(1, ...dayBars.map(b => b.mins));
    barsContainer.innerHTML = dayBars.map(b => {
      const pct = b.mins > 0 ? Math.max(4, (b.mins / maxBar) * 100) : 0;
      const isToday = b.key === todayKey();
      const cls = b.isFuture ? 'future' : b.mins > 0 ? 'filled' : 'empty';
      return `<div class="week-bar-col ${cls} ${isToday ? 'current' : ''}">
        <div class="week-bar-value">${b.mins > 0 ? formatMins(b.mins) : ''}</div>
        <div class="week-bar-track"><div class="week-bar-fill" style="height:${pct}%"></div></div>
        <div class="week-bar-label">${b.day}</div>
      </div>`;
    }).join('');
  }
}

// ═══ GOAL CUSTOMIZATION ═══
function setDailyGoalMins(mins) {
  const goal = getDailyGoal();
  goal.mins = mins;
  saveDailyGoal(goal);
  updateSessionBarGoals();
  document.querySelectorAll('.goal-preset-time').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.mins) === mins);
  });
}
function setDailyGoalChallenges(count) {
  const goal = getDailyGoal();
  goal.challenges = count;
  saveDailyGoal(goal);
  updateSessionBarGoals();
  document.querySelectorAll('.goal-preset-challenge').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.count) === count);
  });
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  updateSessionBar();
  updateStreakWidget();
});
