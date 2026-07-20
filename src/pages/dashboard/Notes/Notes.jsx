import { useState, useEffect, useMemo } from 'react';
import { Plus, Pin, PinOff, Pencil, Trash2, StickyNote } from 'lucide-react';
import Modal from '../../../components/atoms/Modal/Modal';
import SearchBar from '../../../components/atoms/SearchBar/SearchBar';
import Badge from '../../../components/atoms/Badge/Badge';
import styles from './Notes.module.css';

const STORAGE_KEY = 'students_hub_notes';

const initialNotes = [
  {
    id: 'note_001',
    title: 'React 19 Key Changes',
    content: 'New compiler, improved hydration, Actions API for async state transitions, and the use() hook for reading resources.',
    date: '2026-07-15',
    pinned: true,
    color: 'purple',
  },
  {
    id: 'note_002',
    title: 'CSS Variables Cheatsheet',
    content: 'Use --var-name syntax for custom properties. Inherit through DOM. Override at any scope. Great for theming and dark mode.',
    date: '2026-07-14',
    pinned: true,
    color: 'cyan',
  },
  {
    id: 'note_003',
    title: 'useEffect Cleanup Pattern',
    content: 'Return a cleanup function from useEffect to clear subscriptions, timers, and event listeners before the next render.',
    date: '2026-07-13',
    pinned: false,
    color: 'blue',
  },
  {
    id: 'note_004',
    title: 'TypeScript Generics Notes',
    content: 'Generics allow writing reusable, type-safe components. Use <T extends SomeType> for constraints. Prefer interface over type for objects.',
    date: '2026-07-12',
    pinned: false,
    color: 'warning',
  },
  {
    id: 'note_005',
    title: 'Project Ideas Brainstorm',
    content: 'AI-powered study planner, real-time collaborative whiteboard, code review tool with inline comments, and a habit tracker with XP system.',
    date: '2026-07-11',
    pinned: false,
    color: 'pink',
  },
  {
    id: 'note_006',
    title: 'DSA Revision List',
    content: 'Binary search, sliding window, two pointers, BFS/DFS, dynamic programming, union-find. Practice 2-3 problems per pattern.',
    date: '2026-07-10',
    pinned: false,
    color: 'success',
  },
];

const NOTE_COLORS = ['purple', 'cyan', 'blue', 'warning', 'pink', 'success'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialNotes;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);


  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formColor, setFormColor] = useState('purple');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result = q
      ? notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q)
        )
      : notes;
    return [...result].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [notes, searchQuery]);

  const openCreate = () => {
    setEditingNote(null);
    setFormTitle('');
    setFormContent('');
    setFormColor('purple');
    setShowModal(true);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormColor(note.color || 'purple');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setFormTitle('');
    setFormContent('');
    setFormColor('purple');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id
            ? { ...n, title: formTitle.trim(), content: formContent.trim(), color: formColor }
            : n
        )
      );
    } else {
      const newNote = {
        id: `note_${Date.now()}`,
        title: formTitle.trim(),
        content: formContent.trim(),
        date: new Date().toISOString().split('T')[0],
        pinned: false,
        color: formColor,
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    closeModal();
  };

  const handlePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const confirmDelete = (note) => {
    setDeleteTarget(note);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setNotes((prev) => prev.filter((n) => n.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const pinnedCount = notes.filter((n) => n.pinned).length;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <p className={styles.subtitle}>
            Your personal knowledge base. {notes.length} notes &middot; {pinnedCount} pinned.
          </p>
        </div>
        <div className={styles.headerRight}>
          <SearchBar
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            glass
            className={styles.searchBar}
          />
          <button className={styles.addBtn} onClick={openCreate}>
            <Plus size={16} />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className={styles.grid}>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onPin={handlePin}
              onEdit={openEdit}
              onDelete={confirmDelete}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <StickyNote size={40} />
          </div>
          <h3>
            {searchQuery ? 'No notes match your search' : 'No Notes Yet'}
          </h3>
          <p>
            {searchQuery
              ? 'Try a different keyword or clear your search.'
              : 'Create your first note to start capturing ideas, summaries, and reminders.'}
          </p>
          {!searchQuery && (
            <button className={styles.addBtn} onClick={openCreate} style={{ marginTop: '1rem' }}>
              <Plus size={16} /> Create Note
            </button>
          )}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingNote ? 'Edit Note' : 'New Note'}
        maxWidth="520px"
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Title *</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="Note title..."
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Content</label>
            <textarea
              className={`${styles.formInput} ${styles.formTextarea}`}
              placeholder="Write your note here..."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              rows={5}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Color Tag</label>
            <div className={styles.colorPicker}>
              {NOTE_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.colorDot} ${styles[`dot_${c}`]} ${formColor === c ? styles.colorDotActive : ''}`}
                  onClick={() => setFormColor(c)}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editingNote ? <><Pencil size={14} /> Save Changes</> : <><Plus size={14} /> Create Note</>}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Note"
        maxWidth="420px"
      >
        <div className={styles.deleteConfirm}>
          <p className={styles.deleteText}>
            Are you sure you want to delete <strong>"{deleteTarget?.title}"</strong>? This action cannot be undone.
          </p>
          <div className={styles.formActions}>
            <button className={styles.cancelBtn} onClick={() => setDeleteTarget(null)}>
              Cancel
            </button>
            <button className={styles.deleteConfirmBtn} onClick={handleDelete}>
              <Trash2 size={14} /> Delete Note
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function NoteCard({ note, onPin, onEdit, onDelete }) {
  return (
    <article className={`${styles.card} ${styles[`card_${note.color}`]}`}>
      <div className={styles.cardAccent} />

      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{note.title}</h3>
        <div className={styles.cardActions}>
          <button
            className={`${styles.iconBtn} ${note.pinned ? styles.iconBtnPinned : ''}`}
            onClick={() => onPin(note.id)}
            title={note.pinned ? 'Unpin' : 'Pin note'}
          >
            {note.pinned ? <Pin size={14} /> : <PinOff size={14} />}
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => onEdit(note)}
            title="Edit note"
          >
            <Pencil size={14} />
          </button>
          <button
            className={`${styles.iconBtn} ${styles.iconBtnDelete}`}
            onClick={() => onDelete(note)}
            title="Delete note"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p className={styles.cardContent}>{note.content}</p>

      <div className={styles.cardFooter}>
        <span className={styles.cardDate}>{formatDate(note.date)}</span>
        {note.pinned && (
          <Badge variant="purple" className={styles.pinnedBadge}>
            <Pin size={10} /> Pinned
          </Badge>
        )}
      </div>
    </article>
  );
}
