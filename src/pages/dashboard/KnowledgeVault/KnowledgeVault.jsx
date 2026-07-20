import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight, X, Trash2 } from 'lucide-react';
import Button from '../../../components/atoms/Button/Button';
import Badge from '../../../components/atoms/Badge/Badge';
import Modal from '../../../components/atoms/Modal/Modal';
import { calendarEvents } from '../../../data/mockData';
import styles from './KnowledgeVault.module.css';

export default function KnowledgeVault() {
  const [schedules, setSchedules] = useState(() => {
    const stored = localStorage.getItem('students_hub_schedules');
    return stored ? JSON.parse(stored) : calendarEvents;
  });

  useEffect(() => {
    localStorage.setItem('students_hub_schedules', JSON.stringify(schedules));
  }, [schedules]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-07-21');
  const [newType, setNewType] = useState('quiz');

  const typeColorMap = {
    quiz: '#7C3AED',
    deadline: '#EF4444',
    workshop: '#3B82F6',
    study: '#10B981',
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEvent = {
      id: `ev_${Date.now()}`,
      title: newTitle.trim(),
      date: newDate,
      type: newType,
      color: typeColorMap[newType] || '#7C3AED',
    };

    setSchedules((prev) => [...prev, newEvent]);
    setNewTitle('');
    setNewDate('2026-07-21');
    setNewType('quiz');
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTitle('');
    setNewDate('2026-07-21');
    setNewType('quiz');
  };

  const handleDeleteSchedule = (id) => {
    setSchedules((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleClearSchedules = () => {
    if (window.confirm('Clear all simulation schedules from the workspace cache?')) {
      setSchedules([]);
    }
  };

  // Generate July 2026 Calendar view dynamically based on schedules state
  const calendarDays = [
    { day: 28, current: false }, { day: 29, current: false }, { day: 30, current: false },
    ...Array.from({ length: 31 }, (_, i) => {
      const dayNum = i + 1;
      const dateStr = `2026-07-${String(dayNum).padStart(2, '0')}`;
      const dayEvents = schedules.filter((ev) => ev.date === dateStr);
      return {
        day: dayNum,
        current: true,
        events: dayEvents,
      };
    }),
    { day: 1, current: false }, { day: 2, current: false }
  ];

  return (
    <div className={styles.container}>
      {/* ── Modal Overlay for Add Entry ── */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title="Add Simulation Schedule"
        maxWidth="480px"
      >
        <form onSubmit={handleAddSchedule} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Schedule Title *</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. React Quiz Revision"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Date *</label>
            <input
              className={styles.formInput}
              type="date"
              min="2026-07-01"
              max="2026-07-31"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Type</label>
            <select
              className={styles.formSelect}
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value="quiz">🟣 Quiz</option>
              <option value="deadline">🔴 Deadline</option>
              <option value="workshop">🔵 Workshop</option>
              <option value="study">🟢 Study Group</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              <Plus size={14} /> Add Entry
            </button>
          </div>
        </form>
      </Modal>

      <div className={styles.vaultHeader}>
        <div>
          <p className={styles.subtitle}>Track key deadlines, study sessions, and academy exams.</p>
        </div>
        <div className={styles.actions}>
          {schedules.length > 0 && (
            <button className={styles.clearBtn} onClick={handleClearSchedules}>
              <Trash2 size={15} /> Clear All
            </button>
          )}
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
            Add Entry
          </Button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.calendarCard}>
          <div className={styles.calendarNav}>
            <h3 className={styles.monthTitle}>July 2026</h3>
            <div className={styles.navBtns}>
              <button className={styles.navBtn} aria-label="Previous Month"><ChevronLeft size={16} /></button>
              <button className={styles.navBtn} aria-label="Next Month"><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className={styles.calendarGrid}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className={styles.dayHeader}>{d}</div>
            ))}

            {calendarDays.map((d, index) => (
              <div
                key={index}
                className={`${styles.dayCell} ${!d.current ? styles.inactiveDay : ''} ${
                  d.events && d.events.length > 0 ? styles.hasEventsDay : ''
                }`}
              >
                <span className={styles.dayNumber}>{d.day}</span>
                {d.events && d.events.map((ev, i) => (
                  <div
                    key={i}
                    className={styles.eventIndicator}
                    style={{ backgroundColor: ev.color }}
                    title={ev.title}
                  >
                    <span className={styles.eventTitleText}>{ev.title}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.detailsCard}>
          <h3 className={styles.detailsTitle}>Simulation Schedule</h3>
          <div className={styles.eventList}>
            {schedules.length === 0 && (
              <div className={styles.emptySchedule}>
                <p>No schedules yet. Add an entry to get started.</p>
              </div>
            )}
            {schedules.map((ev) => (
              <div key={ev.id} className={styles.eventItem}>
                <div className={styles.eventBar} style={{ backgroundColor: ev.color }} />
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <h4 className={styles.eventTitle}>{ev.title}</h4>
                    <div className={styles.eventHeaderRight}>
                      <Badge variant={ev.type === 'deadline' ? 'error' : ev.type === 'quiz' ? 'purple' : 'info'}>
                        {ev.type}
                      </Badge>
                      <button
                        className={styles.scheduleDeleteBtn}
                        onClick={() => handleDeleteSchedule(ev.id)}
                        title="Delete schedule"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.eventMeta}>
                    <span className={styles.metaSpan}>
                      <CalendarIcon size={12} /> {ev.date}
                    </span>
                    <span className={styles.metaSpan}>
                      <Clock size={12} /> 10:00 AM
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
