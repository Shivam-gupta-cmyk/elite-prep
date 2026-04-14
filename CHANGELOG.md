# ElitePrep — Changelog

All notable changes to the ElitePrep platform are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [3.0.0] — 2026-04-15

### ☁️ Firebase Cloud Sync — Cross-Device Persistence

#### Added
- **Firebase Firestore Integration**: All user progress now syncs to the cloud automatically when signed in.
- **Google Authentication**: One-click Google sign-in via popup. Sign-in button in the header with avatar dropdown when authenticated.
- **Data Abstraction Layer (`db.js`)**: New `DB.load()`/`DB.save()` API wraps localStorage + Firestore writes. Background cloud sync on every save.
- **Auto-Migration**: On first sign-in, existing localStorage data is batch-migrated to Firestore in a single transaction.
- **Sync Toast Notifications**: Visual feedback on sync events (backup confirmation, cloud pull, errors).
- **Auth Dropdown**: Click avatar to see name, email, sync status, and sign-out button.
- **Offline-First Architecture**: App loads instantly from localStorage cache. Firestore updates in background. No sign-in required — full localStorage-only mode as before.

#### Changed
- Replaced all direct `localStorage.getItem/setItem` calls in `app.js`, `study-tracker.js`, and `data-airtribe.js` with `DB.load()`/`DB.save()`.
- Active session timer (`ep_active_session`) and active tab (`ep_active_tab`) remain localStorage-only (per-tab transient state).
- Script load order updated: Firebase SDK → firebase-config.js → db.js → data files → app logic.

#### Data Synced to Firestore
| Key | Firestore Path | Description |
|-----|---------------|-------------|
| `ep_completed` | `progress.completedChallenges` | Challenge completion timestamps |
| `ep_days` | `progress.completedDays` | Day completion markers |
| `ep_sessions` | `sessions.sessionData` | Study session history by date |
| `ep_daily_goal` | `settings.dailyGoal` | Time & challenge goals |
| `ep_theme` | `settings.theme` | Dark/light preference |
| `airtribeProgress` | `airtribe.progress` | Course completion tracking |

---

## [2.0.0] — 2026-04-05

### 🚀 Major Redesign — Tab-Based Architecture

#### Added
- **3-Tab Layout**: Reorganized the entire platform into **Practice**, **Analytics**, and **Library** tabs, replacing the cluttered single-page design.
- **Persistent Session Bar**: Sticky bar visible across all tabs showing live timer, goal progress (time + challenges), and streak count.
- **Keyboard Shortcuts**: `1/2/3` for tab switching, `S` for session toggle, `J/K` for card navigation, `Enter` to expand, `Ctrl+K` for search.
- **Pro-Level Content Fields**: Challenge cards now support up to 4 additional expert tabs:
  - ⚖️ **Trade-off Analysis** — side-by-side comparison of architectural choices.
  - 🚩 **Red Flags & Anti-Patterns** — what candidates do that results in a "no hire."
  - 🎯 **Grading Rubric** — exact interviewer evaluation criteria with weighted percentages.
  - 🔄 **Discussion Pivots** — how to steer the interview when the interviewer drops a curveball.
- **Timestamp-Based Completions**: Challenge completions now store ISO timestamps (`ep_completed` in localStorage), enabling accurate "today's progress" instead of all-time counts.
- **Unified Streak Logic**: Streak now counts days where you either completed a study session OR solved a challenge.
- **Airtribe Course Tracker**: 78 System Design + 50 Java topics from Airtribe courses, with progress tracking.
- **Deep Dive Readings Library**: 270 curated readings across 90 days, separated into the Library tab.
- **CSV Data Export Pipeline**: `export-data.js` script to generate a mega CSV for LLM analysis.

#### Changed
- Removed redundant hero section and duplicate timer/streak UI from the main page.
- Consolidated all progress visualization into the Analytics tab (heatmap, radar chart, weekly stats, session history).
- Challenge card tabs now dynamically render based on available data — cards without pro fields show standard tabs only.

#### Fixed
- **Daily challenge count bug**: Previously showed all-time completed count as today's progress. Now correctly filters by today's date using ISO timestamps.
- **Duplicate DOMContentLoaded handlers**: Consolidated into a single initialization flow.
- **Streak calculation**: Previously only counted study sessions; now includes challenge completion days.

---

## [1.0.0] — 2026-03-15

### 🎉 Initial Release

#### Added
- 90-day SDE-2 / Lead Engineer interview preparation curriculum.
- 630 challenges across 5 categories: DSA (270), LLD (90), HLD (90), Custom Data Structures (90), Leadership (90).
- Difficulty distribution: 192 Medium, 438 Hard.
- Company tagging for 43 unique companies (Amazon, Google, Meta, Microsoft, Uber, Netflix, etc.).
- Study session timer with localStorage persistence.
- GitHub-style activity heatmap.
- Streak tracking and weekly stats.
- Dark/light theme toggle.
- Responsive mobile layout.
- Deployed on Netlify at https://eliteprep-daily.netlify.app.
