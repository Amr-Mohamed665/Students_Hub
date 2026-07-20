import { useState } from 'react';
import { courses as initialCourses } from '../../../data/mockData';
import CourseCard from '../../../components/molecules/CourseCard/CourseCard';
import TabGroup from '../../../components/molecules/TabGroup/TabGroup';
import SearchBar from '../../../components/atoms/SearchBar/SearchBar';
import styles from './MissionControl.module.css';

export default function MissionControl() {
  const [courses, setCourses] = useState(initialCourses);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {

    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty = difficultyFilter === 'all' || course.difficulty === difficultyFilter;

    let matchesTab = true;
    if (activeTab === 'in-progress') {
      matchesTab = course.progress > 0 && course.progress < 100;
    } else if (activeTab === 'completed') {
      matchesTab = course.progress >= 100;
    }

    return matchesSearch && matchesDifficulty && matchesTab;
  });

  return (
    <div className={styles.container}>
      <div className={styles.controlHeader}>
        <div>
          <p className={styles.subtitle}>Select educational missions to increase your academy clearance level.</p>
        </div>

        <div className={styles.toolbar}>
          <SearchBar
            placeholder="Search missions..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.search}
            glass
          />
          <select
            className={styles.select}
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <TabGroup
        tabs={[
          { id: 'all', label: 'All Missions' },
          { id: 'in-progress', label: 'In Progress' },
          { id: 'completed', label: 'Completed' },
        ]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className={styles.tabs}
      />

      {filteredCourses.length > 0 ? (
        <div className={styles.grid}>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onStart={(id) => {
                if (course.videoUrl) {
                  window.open(course.videoUrl, '_blank');
                } else {
                  alert(`Initializing simulation environment for Course ${id}...`);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noMissions}>
          <h3>No Operational Missions Detected</h3>
          <p>Adjust your search filters to find available academy simulation programs.</p>
        </div>
      )}
    </div>
  );
}
