import { useState, useEffect } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import TabGroup from '../../../components/molecules/TabGroup/TabGroup';
import ObjectiveItem from '../../../components/molecules/ObjectiveItem/ObjectiveItem';
import OrbitalDisplay from '../../../components/organisms/OrbitalDisplay/OrbitalDisplay';
import Modal from '../../../components/atoms/Modal/Modal';
import SearchBar from '../../../components/atoms/SearchBar/SearchBar';
import { missionObjectives } from '../../../data/mockData';
import styles from './MissionObjectives.module.css';

export default function MissionObjectives() {
  const [objectives, setObjectives] = useState(() => {
    const stored = localStorage.getItem('students_hub_objectives');
    return stored ? JSON.parse(stored) : missionObjectives;
  });

  useEffect(() => {
    localStorage.setItem('students_hub_objectives', JSON.stringify(objectives));
  }, [objectives]);

  const [activeTab, setActiveTab] = useState('active');
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (tabId) => setActiveTab(tabId);

  const filteredObjectives = objectives.filter((obj) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      obj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (obj.priority && obj.priority.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'completed') return obj.progress >= 100;
    if (activeTab === 'archived') return obj.status === 'archived';
    return obj.progress < 100 && obj.status === 'active';
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editingTask) {
      setObjectives((prev) =>
        prev.map((obj) =>
          obj.id === editingTask.id
            ? {
                ...obj,
                title: newTitle.trim(),
                subtitle: newSubtitle.trim() || 'Custom task',
                priority: newPriority,
              }
            : obj
        )
      );
    } else {
      const newTask = {
        id: `obj_${Date.now()}`,
        title: newTitle.trim(),
        subtitle: newSubtitle.trim() || 'Custom task',
        progress: 0,
        status: 'active',
        priority: newPriority,
        dueDate: null,
      };

      setObjectives((prev) => [newTask, ...prev]);
    }
    closeModal();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewSubtitle(task.subtitle);
    setNewPriority(task.priority || 'medium');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setNewTitle('');
    setNewSubtitle('');
    setNewPriority('medium');
  };

  const handleToggleComplete = (id) => {
    setObjectives((prev) =>
      prev.map((obj) => {
        if (obj.id === id) {
          const newProgress = obj.progress >= 100 ? 0 : 100;
          return { ...obj, progress: newProgress };
        }
        return obj;
      })
    );
  };

  const handleDelete = (id) => {
    setObjectives((prev) => prev.filter((obj) => obj.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This will wipe the workspace cache.')) {
      setObjectives([]);
    }
  };

  return (
    <div className={styles.container}>
      
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
        maxWidth="480px"
      >
        
        <form onSubmit={handleAddTask} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Task Title *</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. Complete React module 5"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <input
              className={styles.formInput}
              type="text"
              placeholder="e.g. Watch and take notes on advanced hooks"
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Priority</label>
            <select
              className={styles.formSelect}
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editingTask ? 'Save Changes' : <><Plus size={14} /> Add Task</>}
            </button>
          </div>
        </form>
      </Modal>

      <div className={styles.layoutGrid}>
        <div className={styles.leftCol}>
          
          <div className={styles.pageHeader}>
            <div className={styles.headerInfo}>
              <p className={styles.subtitle}>Track your educational targets and flight metrics.</p>
            </div>
            <div className={styles.headerBtns}>
              {objectives.length > 0 && (
                <button className={styles.clearBtn} onClick={handleClearAll}>
                  <Trash2 size={15} /> Clear All
                </button>
              )}
              <button className={styles.addTaskBtn} onClick={() => setShowModal(true)}>
                <Plus size={16} /> Add New Task
              </button>
            </div>
          </div>

          <div className={styles.searchRow}>
            <SearchBar
              placeholder="Search tasks by title, description or priority..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              glass
              className={styles.searchBar}
            />
          </div>

          <TabGroup
            tabs={[
              { id: 'active', label: 'Active Goals' },
              { id: 'completed', label: 'Completed' },
              { id: 'archived', label: 'Archived' },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            className={styles.tabs}
          />

          <div className={styles.list}>
            {filteredObjectives.length > 0 ? (
              filteredObjectives.map((obj, index) => (
                <ObjectiveItem
                  key={obj.id}
                  objective={obj}
                  index={index}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className={styles.emptyList}>
                <h3>No Targets in this Sector</h3>
                <p>Missions are successfully finalized or inactive. Add a new task to get started.</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightCol}>
          <OrbitalDisplay />
        </div>
      </div>
    </div>
  );
}
