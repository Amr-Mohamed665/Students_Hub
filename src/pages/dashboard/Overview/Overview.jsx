import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Play, ArrowUpRight, Clock, BookOpen, X, CheckCircle, Zap, Star, BookMarked, Trophy, AlertCircle, RefreshCw, Target } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import StatsRow from '../../../components/organisms/StatsRow/StatsRow';
import ChartCard from '../../../components/molecules/ChartCard/ChartCard';
import Modal from '../../../components/atoms/Modal/Modal';
import { dashboardStats, studyTimeTrend, recentActivity, courses } from '../../../data/mockData';
import Button from '../../../components/atoms/Button/Button';
import styles from './Overview.module.css';

export default function Overview() {
  const { user } = useAuth();
  const activeCourses = courses.slice(0, 3);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const allLogs = [
    ...recentActivity,
    { id: 'act_006', action: 'Completed "JavaScript Closures" quiz', time: '2h ago', type: 'quiz' },
    { id: 'act_007', action: 'Earned "Code Warrior" badge', time: '3h ago', type: 'badge' },
    { id: 'act_008', action: 'Watched CSS Grid layout tutorial', time: '4h ago', type: 'lesson' },
    { id: 'act_009', action: 'Joined "Frontend Study Group" session', time: '5h ago', type: 'study' },
    { id: 'act_010', action: 'Submitted Node.js REST API project', time: '6h ago', type: 'project' },
    { id: 'act_011', action: 'Completed "Async/Await Deep Dive" lesson', time: '8h ago', type: 'lesson' },
    { id: 'act_012', action: 'Earned 120 XP for daily challenge', time: '10h ago', type: 'xp' },
    { id: 'act_013', action: 'Started "AI & Machine Learning" course', time: '12h ago', type: 'course' },
    { id: 'act_014', action: 'Reached Level 5 milestone', time: '1d ago', type: 'badge' },
    { id: 'act_015', action: 'Completed "React Context API" module', time: '1d ago', type: 'lesson' },
    { id: 'act_016', action: 'Scored 95% on CSS Architecture quiz', time: '1d ago', type: 'quiz' },
    { id: 'act_017', action: 'Reviewed 3 peer project submissions', time: '2d ago', type: 'study' },
    { id: 'act_018', action: 'Earned "Quick Learner" badge', time: '2d ago', type: 'badge' },
    { id: 'act_019', action: 'Completed Node.js fundamentals chapter 4', time: '2d ago', type: 'lesson' },
    { id: 'act_020', action: 'Added 5 new tasks to Mission Objectives', time: '3d ago', type: 'project' },
    { id: 'act_021', action: 'Unlocked "7-Day Streak" achievement', time: '3d ago', type: 'badge' },
    { id: 'act_022', action: 'Completed "TypeScript Basics" tutorial', time: '4d ago', type: 'lesson' },
    { id: 'act_023', action: 'Earned 200 XP for completing a course', time: '4d ago', type: 'xp' },
    { id: 'act_024', action: 'Joined live AI/ML webinar session', time: '5d ago', type: 'study' },
    { id: 'act_025', action: 'Submitted "Portfolio Website" for review', time: '5d ago', type: 'project' },
  ];

  const logIconMap = {
    lesson: <BookMarked size={14} />,
    quiz:   <Target size={14} />,
    badge:  <Trophy size={14} />,
    xp:     <Zap size={14} />,
    course: <BookOpen size={14} />,
    project:<CheckCircle size={14} />,
    study:  <Star size={14} />,
  };

  const logColorMap = {
    lesson:  '#7C3AED',
    quiz:    '#3B82F6',
    badge:   '#F59E0B',
    xp:      '#10B981',
    course:  '#06B6D4',
    project: '#8B5CF6',
    study:   '#EC4899',
  };

  return (
    <div className={styles.container}>

      <div className={styles.welcomeBanner}>
        <div>
          <h2 className={styles.welcomeTitle}>Welcome back, {user?.name || 'Amr Mohamed Ali'}! 👋</h2>
          <p className={styles.welcomeSubtitle}>All systems nominal. Ready to resume learning path missions?</p>
        </div>
        <div className={styles.quickLaunch}>
          <Button
            variant="primary"
            icon={<Play size={16} />}
            onClick={() => {
              const active = activeCourses[0] || courses[0];
              if (active && active.videoUrl) {
                window.open(active.videoUrl, '_blank');
              } else {
                alert('Launching active training core simulation...');
              }
            }}
          >
            Resume Active Mission
          </Button>
        </div>
      </div>

      <StatsRow stats={dashboardStats} />

      <div className={styles.mainGrid}>

        <ChartCard
          title="Study Velocity Index"
          subtitle="Hours dedicated per day this solar cycle"
          className={styles.chartCard}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={studyTimeTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-surface-light)',
                  border: 'var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                }}
              />
              <Area type="monotone" dataKey="hours" stroke="#7C3AED" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className={styles.logCard}>
          <div className={styles.logHeader}>
            <h3>Cosmic Logs (Recent Logs)</h3>
            <button className={styles.viewLink} onClick={() => setShowLogsModal(true)}>
              Logs History <ArrowUpRight size={14} />
            </button>
          </div>
          <div className={styles.logsList}>
            {recentActivity.map((act) => (
              <div key={act.id} className={styles.logItem}>
                <div className={styles.logDot} />
                <div className={styles.logContent}>
                  <div className={styles.logAction}>{act.action}</div>
                  <div className={styles.logTime}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.sectionHeader}>
          <h3>Active Missions</h3>
          <Link to="/dashboard/missions" className={styles.sectionHeaderLink}>
            All Courses <BookOpen size={13} style={{ marginLeft: '4px' }} />
          </Link>
        </div>

        <div className={styles.coursesGrid}>
          {activeCourses.map((course) => (
            <div key={course.id} className={styles.courseMiniCard}>
              <div className={styles.courseHeader}>
                <span className={`${styles.difficultyBadge} ${styles[course.difficulty.toLowerCase()]}`}>
                  {course.difficulty}
                </span>
                <span className={styles.durationText}>
                  <Clock size={11} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {course.duration}
                </span>
              </div>

              <h4 className={styles.courseTitle}>{course.title}</h4>
              <p className={styles.courseInstructor}>by {course.instructor}</p>

              <div className={styles.progressContainer}>
                <div className={styles.progressHeader}>
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${course.progress}%` }} />
                </div>
              </div>

              <div className={styles.courseFooter}>
                <span className={styles.xpText}>+{course.xp} XP</span>
                <button
                  className={styles.resumeBtn}
                  onClick={() => {
                    if (course.videoUrl) {
                      window.open(course.videoUrl, '_blank');
                    } else {
                      alert(`Launching ${course.title} simulation...`);
                    }
                  }}
                >
                  Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showLogsModal}
        onClose={() => setShowLogsModal(false)}
        title="Logs History"
        subtitle={`${allLogs.length} activity entries recorded`}
        maxWidth="520px"
      >
        {allLogs.map((log, index) => (
          <div key={log.id} className={styles.logsModalItem}>
            <div
              className={styles.logsModalDot}
              style={{ background: logColorMap[log.type] || '#7C3AED', boxShadow: `0 0 8px ${logColorMap[log.type] || '#7C3AED'}88` }}
            >
              {logIconMap[log.type]}
            </div>
            <div className={styles.logsModalContent}>
              <span className={styles.logsModalAction}>{log.action}</span>
              <span className={styles.logsModalTime}>{log.time}</span>
            </div>
            {index < allLogs.length - 1 && <div className={styles.logsModalLine} />}
          </div>
        ))}
      </Modal>
    </div>
  );
}
