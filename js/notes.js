// ═══════════════════════════════════════════════════════════════
// CODE NOTEBOOK — Cross-device code snippet sync
// Write code at office → synced via Firebase → review at home
// ═══════════════════════════════════════════════════════════════

let notes = DB.load('ep_notes', []);
let activeNoteId = null;
let _autoSaveTimer = null;

// ═══ CRUD ═══
function createNote() {
  const note = {
    id: 'note_' + Date.now(),
    title: '',
    language: 'java',
    code: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.unshift(note);
  saveAllNotes();
  activeNoteId = note.id;
  renderNotes();
  setTimeout(() => document.getElementById('noteTitle')?.focus(), 50);
}

function deleteActiveNote() {
  if (!activeNoteId) return;
  const note = notes.find(n => n.id === activeNoteId);
  if (!confirm(`Delete "${note?.title || 'Untitled'}"?`)) return;
  notes = notes.filter(n => n.id !== activeNoteId);
  activeNoteId = notes.length > 0 ? notes[0].id : null;
  saveAllNotes();
  renderNotes();
}

function setActiveNote(id) {
  activeNoteId = id;
  renderNoteEditor();
  document.querySelectorAll('.notes-card').forEach(c => {
    c.classList.toggle('active', c.dataset.id === id);
  });
}

function saveAllNotes() {
  DB.save('ep_notes', notes);
}

function autoSaveNote() {
  clearTimeout(_autoSaveTimer);
  const saveStatus = document.getElementById('notesAutoSave');
  if (saveStatus) {
    saveStatus.textContent = 'Saving...';
    saveStatus.className = 'notes-autosave saving';
  }

  _autoSaveTimer = setTimeout(() => {
    const note = notes.find(n => n.id === activeNoteId);
    if (!note) return;

    note.title = document.getElementById('noteTitle')?.value || '';
    note.language = document.getElementById('noteLang')?.value || 'java';
    note.code = document.getElementById('noteCode')?.value || '';
    note.updatedAt = new Date().toISOString();
    saveAllNotes();

    if (saveStatus) {
      saveStatus.textContent = '✓ Saved';
      saveStatus.className = 'notes-autosave';
    }

    // Update card preview without full re-render
    _updateCardPreview(note);
    _updateEditorFooter(note);
  }, 800);
}

function _updateCardPreview(note) {
  const card = document.querySelector(`.notes-card[data-id="${note.id}"]`);
  if (!card) return;
  const titleEl = card.querySelector('.notes-card-title');
  const previewEl = card.querySelector('.notes-card-preview');
  const timeEl = card.querySelector('.notes-card-time');
  if (titleEl) titleEl.textContent = note.title || 'Untitled';
  if (previewEl) previewEl.textContent = (note.code || '').substring(0, 60);
  if (timeEl) timeEl.textContent = _timeAgo(note.updatedAt);
}

function _updateEditorFooter(note) {
  const lines = document.getElementById('notesLines');
  const chars = document.getElementById('notesChars');
  const updated = document.getElementById('notesUpdated');
  const code = note.code || '';
  if (lines) lines.textContent = code.split('\n').length + ' lines';
  if (chars) chars.textContent = code.length + ' chars';
  if (updated) updated.textContent = 'Saved ' + _timeAgo(note.updatedAt);
}

// ═══ RENDERING ═══
function renderNotes() {
  renderNotesList();
  renderNoteEditor();

  const count = document.getElementById('notesCount');
  if (count) count.textContent = `${notes.length} snippet${notes.length !== 1 ? 's' : ''}`;

  const empty = document.getElementById('notesEmpty');
  const cards = document.getElementById('notesCards');
  const editor = document.getElementById('notesEditor');

  if (notes.length === 0) {
    if (empty) empty.style.display = 'block';
    if (cards) cards.style.display = 'none';
    if (editor) editor.style.display = 'none';
  } else {
    if (empty) empty.style.display = 'none';
    if (cards) cards.style.display = 'flex';
    if (editor) editor.style.display = 'block';
  }
}

function renderNotesList() {
  const container = document.getElementById('notesCards');
  if (!container) return;

  const langColors = {
    java: '#f89820', python: '#3776ab', javascript: '#f7df1e',
    typescript: '#3178c6', cpp: '#00599c', go: '#00add8',
    sql: '#e38c00', rust: '#ce412b', text: '#888'
  };

  container.innerHTML = notes.map(note => {
    const isActive = note.id === activeNoteId;
    const color = langColors[note.language] || '#6366f1';
    const preview = (note.code || '').substring(0, 60).replace(/\n/g, ' ');

    return `<div class="notes-card ${isActive ? 'active' : ''}" data-id="${note.id}" onclick="setActiveNote('${note.id}')">
      <div class="notes-card-title">${escapeHtml(note.title || 'Untitled')}</div>
      <div class="notes-card-preview">${escapeHtml(preview) || 'Empty snippet'}</div>
      <div class="notes-card-meta">
        <span class="notes-card-lang" style="background:${color}20;color:${color}">${note.language.toUpperCase()}</span>
        <span class="notes-card-time">${_timeAgo(note.updatedAt)}</span>
      </div>
    </div>`;
  }).join('');
}

function renderNoteEditor() {
  const editor = document.getElementById('notesEditor');
  if (!editor) return;

  const note = notes.find(n => n.id === activeNoteId);
  if (!note) {
    editor.style.display = 'none';
    return;
  }

  editor.style.display = 'block';
  const titleInput = document.getElementById('noteTitle');
  const langSelect = document.getElementById('noteLang');
  const codeArea = document.getElementById('noteCode');

  if (titleInput) titleInput.value = note.title;
  if (langSelect) langSelect.value = note.language;
  if (codeArea) codeArea.value = note.code;

  _updateEditorFooter(note);

  // Apply syntax highlighting
  highlightCode();

  const saveStatus = document.getElementById('notesAutoSave');
  if (saveStatus) {
    saveStatus.textContent = '';
    saveStatus.className = 'notes-autosave';
  }
}

// ═══ SEARCH / FILTER ═══
function searchNotes() {
  const query = (document.getElementById('notesSearch')?.value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.notes-card');

  cards.forEach(card => {
    const note = notes.find(n => n.id === card.dataset.id);
    if (!note) return;
    const match = !query ||
      (note.title || '').toLowerCase().includes(query) ||
      (note.code || '').toLowerCase().includes(query) ||
      note.language.toLowerCase().includes(query);
    card.style.display = match ? '' : 'none';
  });
}

// ═══ DUPLICATE NOTE ═══
function duplicateActiveNote() {
  const source = notes.find(n => n.id === activeNoteId);
  if (!source) return;
  const note = {
    id: 'note_' + Date.now(),
    title: (source.title || 'Untitled') + ' (copy)',
    language: source.language,
    code: source.code,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.unshift(note);
  saveAllNotes();
  activeNoteId = note.id;
  renderNotes();
}

// ═══ SYNTAX HIGHLIGHTING (overlay approach) ═══
function highlightCode() {
  const codeArea = document.getElementById('noteCode');
  const highlightEl = document.getElementById('noteCodeHighlight');
  if (!codeArea || !highlightEl) return;

  const note = notes.find(n => n.id === activeNoteId);
  const lang = note?.language || 'text';
  const code = codeArea.value;

  if (typeof hljs !== 'undefined' && lang !== 'text') {
    const hljsMap = {
      java: 'java', python: 'python', javascript: 'javascript',
      typescript: 'typescript', cpp: 'cpp', go: 'go',
      sql: 'sql', rust: 'rust'
    };
    const hljsLang = hljsMap[lang];
    if (hljsLang) {
      try {
        const result = hljs.highlight(code, { language: hljsLang });
        highlightEl.innerHTML = result.value + '\n';
        return;
      } catch (e) { /* fallback below */ }
    }
  }

  // Fallback: plain text
  highlightEl.textContent = code + '\n';
}

// ═══ CODE FORMATTING ═══
function formatCode() {
  const note = notes.find(n => n.id === activeNoteId);
  if (!note) return;

  const codeArea = document.getElementById('noteCode');
  if (!codeArea || !codeArea.value.trim()) return;

  let code = codeArea.value;

  if (['java', 'javascript', 'typescript', 'cpp', 'go', 'rust'].includes(note.language)) {
    code = _formatBraceCode(code);
  } else {
    code = _formatGenericCode(code);
  }

  codeArea.value = code;
  note.code = code;
  note.updatedAt = new Date().toISOString();
  saveAllNotes();
  highlightCode();
  _updateEditorFooter(note);
  _updateCardPreview(note);

  // Flash feedback
  const btn = document.getElementById('formatBtn');
  if (btn) {
    btn.textContent = '✓ Formatted';
    btn.style.color = 'var(--accent-green)';
    setTimeout(() => { btn.textContent = '{ } Format'; btn.style.color = ''; }, 1500);
  }
}

// ── Brace-based formatter (Java, JS, C++, Go, Rust) ──
function _formatBraceCode(code) {
  const lines = code.split('\n');
  const formatted = [];
  let indent = 0;
  const TAB = '    '; // 4 spaces
  let inBlockComment = false;

  for (let rawLine of lines) {
    let line = rawLine.trim();

    // ── Block comments ──
    if (inBlockComment) {
      // Align block comment body
      if (line.startsWith('*')) {
        formatted.push(TAB.repeat(indent) + ' ' + line);
      } else {
        formatted.push(TAB.repeat(indent) + line);
      }
      if (line.includes('*/')) inBlockComment = false;
      continue;
    }
    if (line.startsWith('/*')) {
      formatted.push(TAB.repeat(indent) + line);
      if (!line.includes('*/')) inBlockComment = true;
      continue;
    }

    // ── Blank lines: collapse multiples into one ──
    if (!line) {
      if (formatted.length > 0 && formatted[formatted.length - 1].trim() !== '') {
        formatted.push('');
      }
      continue;
    }

    // ── Fix spacing ──
    line = _fixSpacing(line);

    // ── Indentation based on braces ──
    const startsWithClose = line[0] === '}';
    if (startsWithClose) {
      indent = Math.max(0, indent - 1);
    }

    formatted.push(TAB.repeat(indent) + line);

    // Adjust indent for next line
    const net = _countNetBraces(line);
    if (startsWithClose) {
      indent = Math.max(0, indent + net + 1);
    } else {
      indent = Math.max(0, indent + net);
    }
  }

  // Trim trailing blank lines, ensure single trailing newline
  while (formatted.length > 0 && formatted[formatted.length - 1].trim() === '') {
    formatted.pop();
  }

  return formatted.join('\n') + '\n';
}

// Count net open braces { minus } (ignoring strings and line comments)
function _countNetBraces(line) {
  let net = 0;
  let inStr = false;
  let strChar = '';
  let escaped = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (escaped) { escaped = false; continue; }
    if (ch === '\\') { escaped = true; continue; }

    if (inStr) {
      if (ch === strChar) inStr = false;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inStr = true;
      strChar = ch;
      continue;
    }

    // Skip line comments
    if (ch === '/' && i + 1 < line.length && line[i + 1] === '/') break;

    if (ch === '{') net++;
    if (ch === '}') net--;
  }

  return net;
}

// Fix common Java/JS spacing issues
function _fixSpacing(line) {
  // Don't touch comments
  if (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) return line;

  // Keyword spacing: if(, for(, while(, switch(, catch( → add space before (
  line = line.replace(/\b(if|for|while|switch|catch|synchronized|return)\(/g, '$1 (');

  // Space after commas (not already spaced)
  line = line.replace(/,([^\s])/g, ', $1');

  // Space after semicolons in for-loops: for(int i=0;i<n;i++)
  line = line.replace(/;([^\s\)])/g, '; $1');

  // Remove trailing whitespace
  return line.trimEnd();
}

// ── Generic formatter (Python, SQL, text) ──
function _formatGenericCode(code) {
  const lines = code.split('\n');
  const formatted = [];

  for (let rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      if (formatted.length > 0 && formatted[formatted.length - 1].trim() !== '') {
        formatted.push('');
      }
    } else {
      formatted.push(line);
    }
  }

  while (formatted.length > 0 && formatted[formatted.length - 1].trim() === '') {
    formatted.pop();
  }

  return formatted.join('\n') + '\n';
}

// ═══ HELPERS ═══
function _timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ═══ TAB KEY SUPPORT IN CODE TEXTAREA ═══
function initNoteEditor() {
  const codeArea = document.getElementById('noteCode');
  if (!codeArea) return;

  codeArea.addEventListener('keydown', function (e) {
    // Shift+Alt+F → Format code (VS Code keybinding)
    if (e.key === 'F' && e.shiftKey && e.altKey) {
      e.preventDefault();
      formatCode();
      return;
    }

    // Tab → insert 2 spaces
    if (e.key === 'Tab' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      e.stopPropagation(); // Prevent tab-switching shortcut
      const start = this.selectionStart;
      const end = this.selectionEnd;

      if (e.shiftKey) {
        // Shift+Tab: un-indent current line
        const lineStart = this.value.lastIndexOf('\n', start - 1) + 1;
        if (this.value.substring(lineStart, lineStart + 2) === '  ') {
          this.value = this.value.substring(0, lineStart) + this.value.substring(lineStart + 2);
          this.selectionStart = this.selectionEnd = Math.max(lineStart, start - 2);
        }
      } else {
        // Tab: indent
        this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 2;
      }
      highlightCode();
      autoSaveNote();
    }

    // Enter → auto-indent (match previous line's whitespace)
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = this.selectionStart;
      const lineStart = this.value.lastIndexOf('\n', start - 1) + 1;
      const line = this.value.substring(lineStart, start);
      const indent = line.match(/^\s*/)[0];
      const insertion = '\n' + indent;
      this.value = this.value.substring(0, start) + insertion + this.value.substring(this.selectionEnd);
      this.selectionStart = this.selectionEnd = start + insertion.length;
      highlightCode();
      autoSaveNote();
    }
  });

  // Scroll sync — keep highlight backdrop aligned with textarea
  codeArea.addEventListener('scroll', function () {
    const backdrop = document.getElementById('noteCodeBackdrop');
    if (backdrop) {
      backdrop.scrollTop = this.scrollTop;
      backdrop.scrollLeft = this.scrollLeft;
    }
  });

  // Stop keyboard shortcuts from firing when typing in code area
  codeArea.addEventListener('keydown', function (e) {
    // Don't let app-level shortcuts fire when in code editor
    if (['1', '2', '3', '4', 'j', 'k', 's'].includes(e.key.toLowerCase()) && !e.ctrlKey && !e.metaKey) {
      e.stopPropagation();
    }
  });
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  if (notes.length > 0) {
    activeNoteId = notes[0].id;
  }
  renderNotes();
  initNoteEditor();
});
