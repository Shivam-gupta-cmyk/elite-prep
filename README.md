<p align="center">
  <img src="https://img.shields.io/badge/Days-90-6366f1?style=for-the-badge&labelColor=0a0a0f" alt="90 Days" />
  <img src="https://img.shields.io/badge/Challenges-630-a855f7?style=for-the-badge&labelColor=0a0a0f" alt="630 Challenges" />
  <img src="https://img.shields.io/badge/Categories-5-ec4899?style=for-the-badge&labelColor=0a0a0f" alt="5 Categories" />
  <img src="https://img.shields.io/badge/Companies-43-f59e0b?style=for-the-badge&labelColor=0a0a0f" alt="43 Companies" />
</p>

# 🚀 ElitePrep — 90-Day SDE-2 / Lead Engineer Interview Prep

A curated, daily-driven interview preparation platform for senior backend engineers targeting SDE-2 and Lead Engineer roles at top-tier companies.

**Live:** [eliteprep-daily.netlify.app](https://eliteprep-daily.netlify.app)

---

## ✨ Features

### 📝 Practice Tab
- **630 challenges** across a 90-day structured curriculum
- **5 categories**: DSA (270), LLD (90), HLD (90), Custom Data Structures (90), Leadership (90)
- **Difficulty split**: 192 Medium, 438 Hard
- **Company tags** from 43 companies (Amazon, Google, Meta, Microsoft, Uber, Netflix, etc.)
- **Pro-level content** on each challenge:
  - ⚖️ Trade-off Analysis — side-by-side architectural comparisons
  - 🚩 Red Flags & Anti-Patterns — common "no hire" mistakes
  - 🎯 Grading Rubric — weighted interviewer evaluation criteria
  - 🔄 Discussion Pivots — handling curveball follow-ups

### 📊 Analytics Tab
- GitHub-style **90-day activity heatmap**
- **Radar chart** for topic mastery visualization
- **Weekly stats** with bar charts (total time, active days, avg/day)
- **Session history** with visual timeline
- **Daily goal tracking** (study time + challenge count)

### 📚 Library Tab
- **270 deep dive readings** across 90 days — curated system design articles
- **Airtribe Course Tracker** — 78 System Design + 50 Java topics with progress tracking

### ☁️ Cloud Sync (Firebase)
- **Google sign-in** — one-click authentication
- **Firestore cloud sync** — progress persists across devices
- **Offline-first** — works without sign-in (localStorage only)
- **Auto-migration** — existing data imports on first sign-in

### 🛠 General
- **Study session timer** with start/stop and daily totals
- **Unified streak tracking** (sessions + challenge completions)
- **Keyboard shortcuts** — `←/→` days, `J/K` cards, `1/2/3` tabs, `S` session, `Ctrl+K` search
- **Dark/Light theme** toggle
- **Responsive** mobile layout

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────┐
│                    Browser (Static)                   │
│                                                       │
│  index.html ── css/style.css                          │
│       │                                               │
│       ├── js/db.js          ← Data Abstraction Layer  │
│       ├── js/app.js         ← Core UI + Rendering     │
│       ├── js/study-tracker.js ← Timer + Analytics     │
│       └── js/data-*.js      ← 630 Challenges + Data   │
│                                                       │
│  DB.load() / DB.save()                                │
│       │           │                                   │
│  localStorage   Firestore                             │
│  (instant)      (background sync)                     │
└──────────────────────────────────────────────────────┘
```

### Data Flow
| Action | localStorage | Firestore |
|--------|:---:|:---:|
| Read (page load) | ✅ Instant | ✅ Pull in background |
| Write (complete challenge, end session) | ✅ Immediate | ✅ Async push |
| No sign-in | ✅ Full functionality | ❌ Skipped |
| First sign-in | ✅ Source | ⬆️ Migration target |
| Subsequent loads | ⬅️ Updated from cloud | ✅ Source of truth |

---

## 🚀 Getting Started

### Quick Start (No Backend)
Just open `index.html` in a browser — everything works out of the box with localStorage.

### With Cloud Sync

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com)

2. **Enable Google Authentication:**
   - Authentication → Sign-in method → Enable Google

3. **Create Firestore Database:**
   - Firestore Database → Create database → Start in test mode
   - Rules tab → paste:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId}/data/{docId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

4. **Add your config** to `js/firebase-config.js`:
   ```js
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Add your domain** to Firebase → Authentication → Settings → Authorized domains

6. **Deploy** — push to GitHub and Netlify auto-deploys

---

## 📁 Project Structure

```
interview-prep-daily/
├── index.html              # Single-page app
├── css/
│   └── style.css           # Full design system (dark/light themes)
├── js/
│   ├── firebase-config.js  # Firebase project credentials
│   ├── db.js               # Data abstraction (localStorage + Firestore)
│   ├── app.js              # Core app logic, rendering, keyboard shortcuts
│   ├── study-tracker.js    # Session timer, heatmap, streak, weekly stats
│   ├── data-core.js        # DAYS_DATA array + quotes
│   ├── data-phase1a.js     # Days 1–15 challenges
│   ├── data-phase1b.js     # Days 16–30 challenges
│   ├── data-phase1c.js     # Days 31–45 challenges
│   ├── data-phase1d.js     # Days 46–60 challenges
│   ├── data-phase1e.js     # Days 61–75 challenges
│   ├── data-remaining.js   # Days 76–90 challenges
│   ├── data-readings.js    # Deep dive readings (Days 1–45)
│   ├── data-readings2.js   # Deep dive readings (Days 46–90)
│   └── data-airtribe.js    # Airtribe SD + Java course data
├── CHANGELOG.md
└── export-data.js          # CSV export pipeline for LLM analysis
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` `→` | Navigate days |
| `J` `K` | Navigate challenge cards |
| `Enter` | Expand/collapse focused card |
| `1` `2` `3` | Switch tabs (Practice, Analytics, Library) |
| `S` | Start/stop study session |
| `Ctrl+K` | Focus search box |

---

## 🔐 Firestore Data Model

```
users/{userId}/data/
├── progress     → { completedChallenges, completedDays }
├── sessions     → { sessionData }
├── settings     → { dailyGoal, theme }
└── airtribe     → { progress }
```

---

## 📊 Curriculum Breakdown

| Phase | Days | Focus | Difficulty |
|-------|------|-------|------------|
| 🧱 Foundation | 1–30 | Core DSA, basic LLD/HLD patterns, DS fundamentals | Medium–Hard |
| ⚡ Advanced | 31–60 | Complex system design, advanced data structures, leadership scenarios | Hard |
| 🎯 Simulation | 61–90 | Mock interviews, end-to-end system design, staff-level problems | Hard |

### Category Distribution
- **DSA** (270) — Arrays, Trees, Graphs, DP, Greedy, Backtracking, etc.
- **LLD** (90) — Design Patterns, SOLID, OOP design problems
- **HLD** (90) — Distributed systems, scalability, trade-off analysis
- **Custom DS** (90) — LRU Cache, Bloom Filter, Skip List, Trie variants, etc.
- **Leadership** (90) — Conflict resolution, mentoring, technical decision-making

---

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (zero dependencies)
- **Charts**: Chart.js (CDN)
- **Database**: Firebase Firestore (cloud sync)
- **Auth**: Firebase Authentication (Google sign-in)
- **Hosting**: Netlify
- **Fonts**: Inter + JetBrains Mono (Google Fonts)

---

## 📝 License

Personal project for interview preparation. All challenge content is curated and original.

---

<p align="center">
  <strong>Built for engineers who refuse to be average.</strong>
</p>
