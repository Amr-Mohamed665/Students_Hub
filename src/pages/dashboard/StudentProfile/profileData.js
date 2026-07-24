// src/pages/Profile/profileData.js
// Placeholder data source. Swap these exports for real API calls
// (e.g. fetch('/api/students/:id')) once the backend endpoints are ready.

export const currentStudent = {
  id: "stu_10293",
  fullName: "Youssef El-Sayed",
  handle: "@youssef.codes",
  role: "Computer Engineering, Year 3",
  university: "Cairo University",
  location: "Cairo, Egypt",
  avatarUrl: "https://i.pravatar.cc/160?img=13",
  coverColor: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  joinedOn: "September 2023",
  bio:
    "Backend-leaning full-stack student who likes turning messy course notes into working apps. Currently obsessed with distributed systems and bad puns about them.",
  skills: ["React", "Node.js", "PostgreSQL", "Docker", "System Design", "Figma"],
  socials: {
    github: "github.com/youssef-elsayed",
    linkedin: "linkedin.com/in/youssef-elsayed",
    portfolio: "youssef.dev",
  },
};

export const studentStats = [
  { id: "gpa", label: "Current GPA", value: "3.78", trend: "+0.12" },
  { id: "courses", label: "Active Courses", value: "6", trend: "2 ending soon" },
  { id: "streak", label: "Study Streak", value: "23 days", trend: "personal best" },
  { id: "rank", label: "Cohort Rank", value: "#14", trend: "of 210" },
];

export const enrolledCourses = [
  {
    id: "crs_1",
    title: "Advanced Database Systems",
    instructor: "Dr. Mona Farid",
    progress: 82,
    color: "#4f46e5",
    nextDeadline: "Indexing Project — due in 3 days",
  },
  {
    id: "crs_2",
    title: "Operating Systems",
    instructor: "Dr. Karim Adel",
    progress: 64,
    color: "#0ea5e9",
    nextDeadline: "Scheduler Lab — due in 5 days",
  },
  {
    id: "crs_3",
    title: "Human-Computer Interaction",
    instructor: "Eng. Salma Nabil",
    progress: 95,
    color: "#f59e0b",
    nextDeadline: "Final Prototype — due in 1 day",
  },
  {
    id: "crs_4",
    title: "Distributed Systems",
    instructor: "Dr. Tarek Hassan",
    progress: 41,
    color: "#10b981",
    nextDeadline: "Reading Quiz — due in 6 days",
  },
];

export const achievements = [
  { id: "bdg_1", title: "Early Bird", description: "Submitted 10 assignments before deadline", icon: "🌅", earned: true },
  { id: "bdg_2", title: "Study Streak", description: "Logged in 21 days in a row", icon: "🔥", earned: true },
  { id: "bdg_3", title: "Peer Helper", description: "Answered 50 questions on the forum", icon: "🤝", earned: true },
  { id: "bdg_4", title: "Top of Cohort", description: "Ranked in the top 5% for a semester", icon: "🏆", earned: false },
  { id: "bdg_5", title: "Bug Hunter", description: "Reported 5 verified platform bugs", icon: "🐛", earned: true },
  { id: "bdg_6", title: "Course Marathon", description: "Completed 3 courses in one semester", icon: "🎯", earned: false },
];

export const activityFeed = [
  { id: "act_1", type: "submission", text: "Submitted the ER-diagram assignment for Advanced Database Systems", timestamp: "2 hours ago" },
  { id: "act_2", type: "badge", text: "Unlocked the \u201cBug Hunter\u201d badge", timestamp: "Yesterday" },
  { id: "act_3", type: "forum", text: "Answered a question in the Operating Systems discussion board", timestamp: "2 days ago" },
  { id: "act_4", type: "grade", text: "Received a grade of 94/100 on the HCI wireframing project", timestamp: "4 days ago" },
  { id: "act_5", type: "enrollment", text: "Enrolled in Distributed Systems", timestamp: "1 week ago" },
];

export const portfolioProjects = [
  {
    id: "prj_1",
    title: "CampusEats",
    description: "A campus food-ordering platform built with React and Express, used by 300+ students.",
    tags: ["React", "Node.js", "MongoDB"],
    link: "github.com/youssef-elsayed/campus-eats",
  },
  {
    id: "prj_2",
    title: "QuizForge",
    description: "Auto-generates practice quizzes from lecture slides using a simple NLP pipeline.",
    tags: ["Python", "FastAPI", "NLP"],
    link: "github.com/youssef-elsayed/quiz-forge",
  },
  {
    id: "prj_3",
    title: "Students Hub Mobile",
    description: "A React Native companion app for browsing course materials offline.",
    tags: ["React Native", "SQLite"],
    link: "github.com/youssef-elsayed/students-hub-mobile",
  },
];

export const notificationDefaults = {
  emailDigest: true,
  assignmentReminders: true,
  forumMentions: false,
  productUpdates: true,
};
