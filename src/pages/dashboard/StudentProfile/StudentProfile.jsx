import { useState, useEffect } from 'react';
import { Award, Shield, CheckCircle, Calendar, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import ProfileHeader from '../../../components/organisms/ProfileHeader/ProfileHeader';
import TabGroup from '../../../components/molecules/TabGroup/TabGroup';
import Badge from '../../../components/atoms/Badge/Badge';
import ProgressBar from '../../../components/atoms/ProgressBar/ProgressBar';
import EditProfileModal from './EditProfileModal';
import { achievements, certificates } from '../../../data/mockData';
import styles from './StudentProfile.module.css';

export default function StudentProfile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('about');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressVal(68);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>

      <ProfileHeader user={user} onEdit={() => setIsEditOpen(true)} />

      <TabGroup
        tabs={[
          { id: 'about', label: 'About' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'stats', label: 'Stats' },
          { id: 'certificates', label: 'Certificates' },
          { id: 'journey', label: 'Journey' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="flat"
        className={styles.tabs}
      />

      <div className={styles.tabContent}>
        {activeTab === 'about' && (
          <div className={styles.aboutGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Academy Registration Details</h3>
              <div className={styles.infoList}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Clearance Role</span>
                  <span className={styles.infoValue} style={{ textTransform: 'capitalize' }}>{user?.role}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Enrolled Sector</span>
                  <span className={styles.infoValue}>{user?.learningTrack || 'Frontend Development'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Joined Academy Date</span>
                  <span className={styles.infoValue}>{user?.joinedDate || '2025-09-15'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Phone Number</span>
                  <span className={styles.infoValue}>{user?.phone || '+20 100 123 4567'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Status Clearance</span>
                  <span className={styles.infoValue}>Active Duty</span>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Learning Progress</h3>
              <div className={styles.progressSection}>
                <div className={styles.progressHeaderRow}>
                  <span className={styles.progressLabel}>Track Completion</span>
                  <span className={styles.progressPercentage}>{progressVal}%</span>
                </div>
                <ProgressBar
                  value={progressVal}
                  max={100}
                  showValue={false}
                  variant="purple"
                  size="lg"
                />
                <p className={styles.progressHint}>
                  Track your learning modules completions to unlock advanced simulators and sectors.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Mission Preferences</h3>
              <p className={styles.prefText}>
                Primary focus is on modern Javascript stacks, including React 19, typescript, and styling architectures.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
                {user?.skills && Array.isArray(user.skills) ? (
                  user.skills.map((skill, idx) => {
                    const variants = ['purple', 'info', 'cyan', 'success'];
                    const variant = variants[idx % variants.length];
                    return <Badge key={skill} variant={variant}>{skill}</Badge>;
                  })
                ) : (
                  <>
                    <Badge variant="purple">React</Badge>
                    <Badge variant="info">TypeScript</Badge>
                    <Badge variant="cyan">CSS</Badge>
                    <Badge variant="success">AI Tools</Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className={styles.achievementsGrid}>
            {achievements.map((ach) => (
              <div key={ach.id} className={`${styles.achCard} ${!ach.earned ? styles.lockedAch : ''}`}>
                <div className={styles.achHeader}>
                  <div className={styles.achIconBox}>
                    <Award size={22} />
                  </div>
                  {ach.earned ? (
                    <Badge variant="success">Unlocked</Badge>
                  ) : (
                    <Badge variant="default">Locked</Badge>
                  )}
                </div>
                <h4 className={styles.achName}>{ach.name}</h4>
                <p className={styles.achDesc}>{ach.description}</p>
                {ach.earned && <div className={styles.achDate}>Earned: {ach.date}</div>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className={styles.aboutGrid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Activity Indicators</h3>
              <div className={styles.infoList}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Daily Streak Timeline</span>
                  <span className={styles.infoValue}>{user?.streak} Days</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Exercises Solved</span>
                  <span className={styles.infoValue}>142 Problems</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Time Spent In Simulation</span>
                  <span className={styles.infoValue}>184 Hours</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className={styles.certsGrid}>
            {certificates.map((cert) => (
              <div key={cert.id} className={styles.certCard}>
                <div className={styles.certIcon}>
                  <Shield size={28} />
                </div>
                <div className={styles.certContent}>
                  <div className={styles.certHeader}>
                    <h4 className={styles.certTitle}>{cert.title}</h4>
                    <span className={styles.certDate}>{cert.date}</span>
                  </div>
                  <p className={styles.certIssuer}>Issued by: {cert.issuer}</p>
                  <div className={styles.certFooter}>
                    <span className={styles.certId}>ID: {cert.credential}</span>
                    <button className={styles.verifyBtn} onClick={() => alert(`Redirecting to verify credentials ID: ${cert.credential}...`)}>
                      Verify Credentials <LinkIcon size={12} style={{ marginLeft: '4px' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'journey' && (
          <div className={styles.journeyTimeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>October 2025</div>
                <h4 className={styles.timelineTitle}>First Project Completed</h4>
                <p className={styles.timelineDesc}>Developed static academy landing dashboard interface.</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>September 2025</div>
                <h4 className={styles.timelineTitle}>Enrolled in Space Academy</h4>
                <p className={styles.timelineDesc}>Academy clearance protocols completed. Commenced learning tracks.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
        onSave={updateUser}
      />
    </div>
  );
}
