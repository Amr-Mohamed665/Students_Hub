// src/pages/Profile/ProfilePage.jsx
import { useMemo, useState } from "react";
import styles from "./ProfilePage.module.css";
import {
  currentStudent,
  studentStats,
  enrolledCourses,
  achievements,
  activityFeed,
  portfolioProjects,
  notificationDefaults,
} from "./profileData";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "courses", label: "Courses" },
  { key: "achievements", label: "Achievements" },
  { key: "activity", label: "Activity" },
  { key: "portfolio", label: "Portfolio" },
  { key: "settings", label: "Settings" },
];

const ACTIVITY_ICONS = {
  submission: "📤",
  badge: "🏅",
  forum: "💬",
  grade: "📈",
  enrollment: "📚",
};

function InitialsFallback({ name }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return <div className={styles.avatarFallback}>{initials}</div>;
}

function StatCard({ label, value, trend }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statTrend}>{trend}</span>
    </div>
  );
}

function CourseProgressCard({ course }) {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseCardHeader}>
        <h4>{course.title}</h4>
        <span className={styles.courseInstructor}>{course.instructor}</span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${course.progress}%`, backgroundColor: course.color }}
        />
      </div>
      <div className={styles.courseFooter}>
        <span className={styles.progressPercent}>{course.progress}% complete</span>
        <span className={styles.courseDeadline}>{course.nextDeadline}</span>
      </div>
    </div>
  );
}

function BadgeTile({ badge }) {
  return (
    <div className={`${styles.badgeTile} ${badge.earned ? "" : styles.badgeLocked}`}>
      <span className={styles.badgeIcon}>{badge.icon}</span>
      <div>
        <p className={styles.badgeTitle}>{badge.title}</p>
        <p className={styles.badgeDescription}>{badge.description}</p>
      </div>
      {!badge.earned && <span className={styles.badgeLockNote}>Not yet earned</span>}
    </div>
  );
}

function ActivityRow({ entry }) {
  return (
    <li className={styles.activityRow}>
      <span className={styles.activityIcon}>{ACTIVITY_ICONS[entry.type] ?? "•"}</span>
      <div className={styles.activityBody}>
        <p>{entry.text}</p>
        <span className={styles.activityTimestamp}>{entry.timestamp}</span>
      </div>
    </li>
  );
}

function PortfolioCard({ project }) {
  return (
    <div className={styles.portfolioCard}>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <div className={styles.tagRow}>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.tagPill}>
            {tag}
          </span>
        ))}
      </div>
      <a
        className={styles.portfolioLink}
        href={`https://${project.link}`}
        target="_blank"
        rel="noreferrer"
      >
        View project ↗
      </a>
    </div>
  );
}

function SettingsToggle({ label, description, isEnabled, onToggle }) {
  return (
    <div className={styles.settingsRow}>
      <div>
        <p className={styles.settingsRowLabel}>{label}</p>
        <p className={styles.settingsRowDescription}>{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        onClick={onToggle}
        className={`${styles.toggleSwitch} ${isEnabled ? styles.toggleOn : ""}`}
      >
        <span className={styles.toggleKnob} />
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [avatarFailedToLoad, setAvatarFailedToLoad] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState(notificationDefaults);

  const earnedBadgeCount = useMemo(
    () => achievements.filter((badge) => badge.earned).length,
    []
  );

  const handleNotificationToggle = (settingKey) => {
    setNotificationSettings((previousSettings) => ({
      ...previousSettings,
      [settingKey]: !previousSettings[settingKey],
    }));
  };

  return (
    <div className={styles.pageWrapper}>
      <section
        className={styles.coverBanner}
        style={{ backgroundImage: currentStudent.coverColor }}
      >
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            {avatarFailedToLoad ? (
              <InitialsFallback name={currentStudent.fullName} />
            ) : (
              <img
                src={currentStudent.avatarUrl}
                alt={currentStudent.fullName}
                className={styles.avatarImage}
                onError={() => setAvatarFailedToLoad(true)}
              />
            )}
          </div>

          <div className={styles.identityBlock}>
            <h1 className={styles.fullName}>{currentStudent.fullName}</h1>
            <p className={styles.handle}>{currentStudent.handle}</p>
            <p className={styles.roleLine}>
              {currentStudent.role} · {currentStudent.university}
            </p>
          </div>

          <button type="button" className={styles.primaryButton}>
            Edit Profile
          </button>
        </div>
      </section>

      <nav className={styles.tabBar} aria-label="Profile sections">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`${styles.tabButton} ${
              activeTab === tab.key ? styles.tabButtonActive : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className={styles.contentArea}>
        {activeTab === "overview" && (
          <div className={styles.overviewGrid}>
            <div className={styles.statsRow}>
              {studentStats.map((stat) => (
                <StatCard key={stat.id} {...stat} />
              ))}
            </div>

            <div className={styles.bioCard}>
              <h3>About</h3>
              <p>{currentStudent.bio}</p>
              <div className={styles.tagRow}>
                {currentStudent.skills.map((skill) => (
                  <span key={skill} className={styles.tagPill}>
                    {skill}
                  </span>
                ))}
              </div>
              <ul className={styles.socialList}>
                <li>GitHub · {currentStudent.socials.github}</li>
                <li>LinkedIn · {currentStudent.socials.linkedin}</li>
                <li>Portfolio · {currentStudent.socials.portfolio}</li>
              </ul>
            </div>

            <div className={styles.miniAchievements}>
              <div className={styles.miniAchievementsHeader}>
                <h3>Achievements</h3>
                <span>{earnedBadgeCount}/{achievements.length} earned</span>
              </div>
              <div className={styles.miniBadgeRow}>
                {achievements.slice(0, 4).map((badge) => (
                  <span
                    key={badge.id}
                    className={`${styles.miniBadge} ${badge.earned ? "" : styles.badgeLocked}`}
                    title={badge.title}
                  >
                    {badge.icon}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className={styles.linkButton}
                onClick={() => setActiveTab("achievements")}
              >
                View all achievements →
              </button>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className={styles.courseGrid}>
            {enrolledCourses.map((course) => (
              <CourseProgressCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className={styles.badgeGrid}>
            {achievements.map((badge) => (
              <BadgeTile key={badge.id} badge={badge} />
            ))}
          </div>
        )}

        {activeTab === "activity" && (
          <ul className={styles.activityList}>
            {activityFeed.map((entry) => (
              <ActivityRow key={entry.id} entry={entry} />
            ))}
          </ul>
        )}

        {activeTab === "portfolio" && (
          <div className={styles.portfolioGrid}>
            {portfolioProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className={styles.settingsCard}>
            <h3>Notification Preferences</h3>
            <SettingsToggle
              label="Weekly email digest"
              description="A short summary of grades, deadlines, and forum activity."
              isEnabled={notificationSettings.emailDigest}
              onToggle={() => handleNotificationToggle("emailDigest")}
            />
            <SettingsToggle
              label="Assignment reminders"
              description="Get notified 48 hours before a submission deadline."
              isEnabled={notificationSettings.assignmentReminders}
              onToggle={() => handleNotificationToggle("assignmentReminders")}
            />
            <SettingsToggle
              label="Forum mentions"
              description="Notify me when someone replies to my forum posts."
              isEnabled={notificationSettings.forumMentions}
              onToggle={() => handleNotificationToggle("forumMentions")}
            />
            <SettingsToggle
              label="Product updates"
              description="Occasional news about new Students Hub features."
              isEnabled={notificationSettings.productUpdates}
              onToggle={() => handleNotificationToggle("productUpdates")}
            />
          </div>
        )}
      </main>
    </div>
  );
}
