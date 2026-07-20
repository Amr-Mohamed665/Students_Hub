export const mockUser = {
  id: 'usr_001',
  name: 'Amr Mohamed Ali',
  email: 'amr.mohamed@example.com',
  avatar: null, 
  role: 'student',
  title: 'Frontend Developer | Lifelong Learner',
  location: 'Cairo, Egypt',
  bio: 'Loves building beautiful web apps and exploring AI tools.',
  level: 5,
  totalXP: 850,
  currentXP: 680,
  nextLevelXP: 1000,
  badges: 12,
  certificates: 4,
  joinedDate: '2025-09-15',
  streak: 14,
};

export const sidebarNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { id: 'courses', label: 'Courses', icon: 'BookOpen', path: '/dashboard/missions' },
  { id: 'tasks', label: 'Tasks', icon: 'CheckSquare', path: '/dashboard/objectives' },
  { id: 'calendar', label: 'Calendar', icon: 'Calendar', path: '/dashboard/vault' },
  { id: 'resources', label: 'Resources', icon: 'FolderOpen', path: '/dashboard/library' },
  { id: 'aicoach', label: 'AI Coach', icon: 'Bot', path: '/dashboard/coach' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', path: '/dashboard/analytics' },
  { id: 'inbox', label: 'Inbox', icon: 'Mail', path: '/dashboard/notifications' },
  { id: 'achievements', label: 'Profile', icon: 'User', path: '/dashboard/profile' },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/dashboard/command' },
];

export const dashboardStats = [
  { id: 'courses', label: 'Courses', value: '5', subtitle: 'In Progress', trend: '+2', trendUp: true, icon: 'BookOpen' },
  { id: 'tasks', label: 'Tasks Completed', value: '18', subtitle: 'This Week', trend: '+23%', trendUp: true, icon: 'CheckCircle' },
  { id: 'xp', label: 'XP Earned', value: '850', subtitle: 'Total', trend: '+11%', trendUp: true, icon: 'Zap' },
  { id: 'streak', label: 'Day Streak', value: '14', subtitle: 'Keep Going!', trend: '+3', trendUp: true, icon: 'Flame' },
];

export const performanceStats = [
  { id: 'studyTime', label: 'Study Time', value: '24h 30m', trend: '+12%', trendUp: true, icon: 'Clock' },
  { id: 'courses', label: 'Courses', value: '5', subtitle: 'In Progress', trend: '+23%', trendUp: true, icon: 'BookOpen' },
  { id: 'tasksCompleted', label: 'Tasks Completed', value: '18', trend: '+23%', trendUp: true, icon: 'CheckCircle' },
  { id: 'xpEarned', label: 'XP Earned', value: '850', trend: '+11%', trendUp: true, icon: 'Zap' },
  { id: 'accuracy', label: 'Accuracy', value: '92%', trend: '+4%', trendUp: true, icon: 'Target' },
];

export const studyTimeTrend = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.0 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4.0 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 5.0 },
  { day: 'Sun', hours: 4.5 },
];

export const lessonsCompleted = [
  { week: 'W1', lessons: 5 },
  { week: 'W2', lessons: 8 },
  { week: 'W3', lessons: 6 },
  { week: 'W4', lessons: 12 },
  { week: 'W5', lessons: 9 },
  { week: 'W6', lessons: 15 },
  { week: 'W7', lessons: 11 },
  { week: 'W8', lessons: 14 },
];

export const skillRadarData = [
  { subject: 'React', score: 85 },
  { subject: 'JavaScript', score: 90 },
  { subject: 'CSS', score: 75 },
  { subject: 'Node.js', score: 65 },
  { subject: 'TypeScript', score: 70 },
  { subject: 'Python', score: 55 },
];

export const missionObjectives = [
  {
    id: 'obj_001',
    title: 'Complete 3 Courses',
    subtitle: 'Frontend Development Path',
    progress: 75,
    status: 'active',
    icon: 'GraduationCap',
  },
  {
    id: 'obj_002',
    title: 'Build 5 Projects',
    subtitle: 'Improve practical skills',
    progress: 60,
    status: 'active',
    icon: 'Code',
  },
  {
    id: 'obj_003',
    title: 'Solve 100 DSA Problems',
    subtitle: 'Data Structures & Algorithms',
    progress: 45,
    status: 'active',
    icon: 'Brain',
  },
  {
    id: 'obj_004',
    title: 'Learn AI Fundamentals',
    subtitle: 'Machine Learning Basics',
    progress: 30,
    status: 'active',
    icon: 'Sparkles',
  },
  {
    id: 'obj_005',
    title: 'Read 12 Books',
    subtitle: 'Technical & soft skills',
    progress: 20,
    status: 'active',
    icon: 'BookOpen',
  },
];

export const libraryCategories = [
  { id: 'react', name: 'React', resources: 135, color: '#F97316', planet: 'react' },
  { id: 'javascript', name: 'JavaScript', resources: 95, color: '#EAB308', planet: 'javascript' },
  { id: 'css', name: 'CSS', resources: 80, color: '#3B82F6', planet: 'css' },
  { id: 'nextjs', name: 'Next.js', resources: 70, color: '#6366F1', planet: 'nextjs' },
  { id: 'typescript', name: 'TypeScript', resources: 65, color: '#0EA5E9', planet: 'typescript' },
  { id: 'aiml', name: 'AI / ML', resources: 50, color: '#A855F7', planet: 'aiml' },
];

export const libraryResources = {
  react: [
    { id: 'r_001', title: 'React 19 — What\'s New', type: 'article', duration: '8 min read', level: 'Intermediate', icon: 'FileText', url: 'https://react.dev/blog/2024/12/05/react-19' },
    { id: 'r_002', title: 'Mastering useEffect & Cleanup', type: 'video', duration: '22 min', level: 'Advanced', icon: 'Play', url: 'https://react.dev/reference/react/useEffect' },
    { id: 'r_003', title: 'React Server Components Deep Dive', type: 'video', duration: '45 min', level: 'Advanced', icon: 'Play', url: 'https://react.dev/reference/rsc/server-components' },
    { id: 'r_004', title: 'State Management Patterns', type: 'article', duration: '12 min read', level: 'Intermediate', icon: 'FileText', url: 'https://react.dev/learn/sharing-state-between-components' },
    { id: 'r_005', title: 'React Testing Library Guide', type: 'guide', duration: '30 min read', level: 'Intermediate', icon: 'BookOpen', url: 'https://testing-library.com/docs/react-testing-library/intro/' },
    { id: 'r_006', title: 'Performance Optimization in React', type: 'video', duration: '35 min', level: 'Advanced', icon: 'Play', url: 'https://react.dev/reference/react/memo' },
  ],
  javascript: [
    { id: 'r_007', title: 'Modern JavaScript ES2025', type: 'article', duration: '10 min read', level: 'Beginner', icon: 'FileText', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
    { id: 'r_008', title: 'Async/Await Mastery', type: 'video', duration: '28 min', level: 'Intermediate', icon: 'Play', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises' },
    { id: 'r_009', title: 'Closures & Scope Explained', type: 'video', duration: '18 min', level: 'Intermediate', icon: 'Play', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures' },
    { id: 'r_010', title: 'JavaScript Design Patterns', type: 'guide', duration: '45 min read', level: 'Advanced', icon: 'BookOpen', url: 'https://www.patterns.dev/posts/classic-design-patterns/' },
    { id: 'r_011', title: 'Prototype Chain & OOP', type: 'article', duration: '15 min read', level: 'Intermediate', icon: 'FileText', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain' },
    { id: 'r_012', title: 'Array Methods Cheat Sheet', type: 'guide', duration: '5 min read', level: 'Beginner', icon: 'BookOpen', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array' },
  ],
  css: [
    { id: 'r_013', title: 'CSS Grid Complete Guide', type: 'guide', duration: '20 min read', level: 'Beginner', icon: 'BookOpen', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
    { id: 'r_014', title: 'Advanced CSS Animations', type: 'video', duration: '40 min', level: 'Advanced', icon: 'Play', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations' },
    { id: 'r_015', title: 'CSS Variables & Theming', type: 'article', duration: '8 min read', level: 'Intermediate', icon: 'FileText', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties' },
    { id: 'r_016', title: 'Flexbox Mastery', type: 'video', duration: '25 min', level: 'Beginner', icon: 'Play', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
    { id: 'r_017', title: 'CSS Architecture (BEM, SMACSS)', type: 'article', duration: '14 min read', level: 'Intermediate', icon: 'FileText', url: 'https://en.bem.info/methodology/key-concepts/' },
  ],
  nextjs: [
    { id: 'r_018', title: 'Next.js 14 App Router', type: 'video', duration: '55 min', level: 'Intermediate', icon: 'Play', url: 'https://nextjs.org/docs' },
    { id: 'r_019', title: 'Server Actions & Forms', type: 'article', duration: '10 min read', level: 'Intermediate', icon: 'FileText', url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations' },
    { id: 'r_020', title: 'Next.js Deployment on Vercel', type: 'guide', duration: '15 min read', level: 'Beginner', icon: 'BookOpen', url: 'https://vercel.com/docs/deployments/overview' },
    { id: 'r_021', title: 'API Routes & Middleware', type: 'video', duration: '30 min', level: 'Advanced', icon: 'Play', url: 'https://nextjs.org/docs/app/building-your-application/routing/middleware' },
  ],
  typescript: [
    { id: 'r_022', title: 'TypeScript for React Devs', type: 'guide', duration: '25 min read', level: 'Intermediate', icon: 'BookOpen', url: 'https://react.dev/learn/typescript' },
    { id: 'r_023', title: 'Advanced Generics & Utility Types', type: 'video', duration: '38 min', level: 'Advanced', icon: 'Play', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html' },
    { id: 'r_024', title: 'TypeScript Strict Mode Guide', type: 'article', duration: '12 min read', level: 'Intermediate', icon: 'FileText', url: 'https://www.typescriptlang.org/tsconfig#strict' },
    { id: 'r_025', title: 'Type Guards & Narrowing', type: 'video', duration: '22 min', level: 'Advanced', icon: 'Play', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html' },
  ],
  aiml: [
    { id: 'r_026', title: 'Intro to Machine Learning', type: 'guide', duration: '30 min read', level: 'Beginner', icon: 'BookOpen', url: 'https://developers.google.com/machine-learning/crash-course' },
    { id: 'r_027', title: 'Neural Networks Explained', type: 'video', duration: '48 min', level: 'Intermediate', icon: 'Play', url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
    { id: 'r_028', title: 'Prompt Engineering for Developers', type: 'article', duration: '10 min read', level: 'Beginner', icon: 'FileText', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
    { id: 'r_029', title: 'Building with OpenAI API', type: 'video', duration: '35 min', level: 'Intermediate', icon: 'Play', url: 'https://platform.openai.com/docs/overview' },
    { id: 'r_030', title: 'Fine-Tuning LLMs', type: 'guide', duration: '40 min read', level: 'Advanced', icon: 'BookOpen', url: 'https://platform.openai.com/docs/guides/fine-tuning' },
  ],
};

export const notifications = [
  {
    id: 'notif_001',
    type: 'course',
    title: 'New Course Available',
    description: '"Advanced React 19" is now available.',
    time: '1h ago',
    read: false,
    icon: 'BookOpen',
    color: '#3B82F6',
  },
  {
    id: 'notif_002',
    type: 'achievement',
    title: 'New Achievement Unlocked',
    description: 'You earned "Consistent Learner" badge.',
    time: '3h ago',
    read: false,
    icon: 'Trophy',
    color: '#F59E0B',
  },
  {
    id: 'notif_003',
    type: 'assignment',
    title: 'Assignment Due Soon',
    description: 'React Components assignment is due tomorrow.',
    time: '4h ago',
    read: false,
    icon: 'AlertTriangle',
    color: '#EF4444',
  },
  {
    id: 'notif_004',
    type: 'update',
    title: 'Course Update',
    description: '"JavaScript Basics" has been updated.',
    time: '1d ago',
    read: true,
    icon: 'RefreshCw',
    color: '#7C3AED',
  },
  {
    id: 'notif_005',
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled maintenance on May 15, 2 AM.',
    time: '2d ago',
    read: true,
    icon: 'Settings',
    color: '#64748B',
  },
];

export const courses = [
  {
    id: 'course_001',
    title: 'Advanced React 19',
    instructor: 'Sarah Johnson',
    progress: 72,
    totalLessons: 24,
    completedLessons: 17,
    category: 'Frontend',
    difficulty: 'Advanced',
    duration: '12h 30m',
    xp: 500,
    videoUrl: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA',
  },
  {
    id: 'course_002',
    title: 'JavaScript Mastery',
    instructor: 'Ahmed Hassan',
    progress: 45,
    totalLessons: 30,
    completedLessons: 14,
    category: 'Programming',
    difficulty: 'Intermediate',
    duration: '18h 45m',
    xp: 650,
    videoUrl: 'https://www.youtube.com/watch?v=Bv_5Zv5c-Ts',
  },
  {
    id: 'course_003',
    title: 'CSS Architecture',
    instructor: 'Emily Chen',
    progress: 88,
    totalLessons: 16,
    completedLessons: 14,
    category: 'Frontend',
    difficulty: 'Intermediate',
    duration: '8h 15m',
    xp: 350,
    videoUrl: 'https://www.youtube.com/watch?v=_kqN4hl9bGc',
  },
  {
    id: 'course_004',
    title: 'Node.js Fundamentals',
    instructor: 'Michael Brown',
    progress: 30,
    totalLessons: 20,
    completedLessons: 6,
    category: 'Backend',
    difficulty: 'Beginner',
    duration: '14h',
    xp: 450,
    videoUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
  },
  {
    id: 'course_005',
    title: 'AI & Machine Learning',
    instructor: 'Dr. Lisa Park',
    progress: 15,
    totalLessons: 28,
    completedLessons: 4,
    category: 'AI/ML',
    difficulty: 'Advanced',
    duration: '22h',
    xp: 800,
    videoUrl: 'https://www.youtube.com/watch?v=jGwO_UgTS7I',
  },
];

export const recentActivity = [
  { id: 'act_001', action: 'Completed lesson "React Hooks Deep Dive"', time: '30 min ago', type: 'lesson' },
  { id: 'act_002', action: 'Earned 50 XP for quiz completion', time: '1h ago', type: 'xp' },
  { id: 'act_003', action: 'Started "Advanced React 19" course', time: '2h ago', type: 'course' },
  { id: 'act_004', action: 'Submitted project "Portfolio Website"', time: '5h ago', type: 'project' },
  { id: 'act_005', action: 'Achieved "7-Day Streak" badge', time: '1d ago', type: 'badge' },
];

export const achievements = [
  { id: 'badge_001', name: 'First Steps', description: 'Complete your first lesson', earned: true, icon: 'Footprints', date: '2025-09-16' },
  { id: 'badge_002', name: 'Quick Learner', description: 'Complete 10 lessons in a week', earned: true, icon: 'Zap', date: '2025-09-23' },
  { id: 'badge_003', name: 'Code Warrior', description: 'Complete 5 coding challenges', earned: true, icon: 'Sword', date: '2025-10-01' },
  { id: 'badge_004', name: 'Consistent Learner', description: 'Maintain a 7-day streak', earned: true, icon: 'Flame', date: '2025-10-08' },
  { id: 'badge_005', name: 'Knowledge Seeker', description: 'Complete 3 courses', earned: false, icon: 'Search', date: null },
  { id: 'badge_006', name: 'Problem Solver', description: 'Solve 50 DSA problems', earned: false, icon: 'Puzzle', date: null },
];

export const certificates = [
  { id: 'cert_001', title: 'React Fundamentals', issuer: 'Students Hub', date: '2025-10-15', credential: 'LRN-RF-2025-001' },
  { id: 'cert_002', title: 'JavaScript Essentials', issuer: 'Students Hub', date: '2025-11-20', credential: 'LRN-JE-2025-002' },
  { id: 'cert_003', title: 'CSS Mastery', issuer: 'Students Hub', date: '2026-01-10', credential: 'LRN-CM-2026-003' },
  { id: 'cert_004', title: 'Web Development Bootcamp', issuer: 'Students Hub', date: '2026-03-05', credential: 'LRN-WDB-2026-004' },
];

export const coachMessages = [
  {
    id: 'msg_001',
    sender: 'ai',
    text: "Hello Amr! 👋 I'm your AI Study Coach. I can help you with your learning journey, answer questions about your courses, or suggest study strategies. What would you like to work on today?",
    time: '10:00 AM',
  },
  {
    id: 'msg_002',
    sender: 'user',
    text: 'Can you help me understand React hooks better?',
    time: '10:02 AM',
  },
  {
    id: 'msg_003',
    sender: 'ai',
    text: "Of course! React Hooks are functions that let you use state and lifecycle features in functional components. Let's start with the most common ones:\n\n**useState** — Manages local state\n**useEffect** — Handles side effects\n**useContext** — Accesses context values\n**useRef** — Creates persistent references\n\nWould you like me to explain any of these in detail with examples?",
    time: '10:02 AM',
  },
];

export const coachSuggestions = [
  'Explain useEffect cleanup',
  'Quiz me on React concepts',
  'Suggest a study plan',
  'Review my progress',
];

export const calendarEvents = [
  { id: 'ev_001', title: 'React Quiz', date: '2026-07-21', type: 'quiz', color: '#7C3AED' },
  { id: 'ev_002', title: 'Project Deadline', date: '2026-07-23', type: 'deadline', color: '#EF4444' },
  { id: 'ev_003', title: 'AI Workshop', date: '2026-07-25', type: 'workshop', color: '#3B82F6' },
  { id: 'ev_004', title: 'Study Group', date: '2026-07-26', type: 'study', color: '#10B981' },
];

export const commandCenterSettings = [
  { id: 'general', label: 'General', icon: 'Settings', description: 'App preferences and language' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', description: 'Manage notification preferences' },
  { id: 'privacy', label: 'Privacy', icon: 'Shield', description: 'Privacy and security settings' },
  { id: 'appearance', label: 'Appearance', icon: 'Palette', description: 'Theme and display options' },
  { id: 'integrations', label: 'Integrations', icon: 'Plug', description: 'Connected apps and services' },
  { id: 'data', label: 'Data & Storage', icon: 'Database', description: 'Manage your data and exports' },
];

export const landingFeatures = [
  {
    id: 'feat_001',
    title: 'AI-Powered Learning',
    description: 'Personalized study paths powered by advanced AI that adapts to your learning style.',
    icon: 'Brain',
  },
  {
    id: 'feat_002',
    title: 'Galaxy Library',
    description: 'Access hundreds of curated resources across React, JavaScript, CSS, and more.',
    icon: 'Library',
  },
  {
    id: 'feat_003',
    title: 'Mission Tracking',
    description: 'Set goals, track objectives, and celebrate milestones on your learning journey.',
    icon: 'Target',
  },
  {
    id: 'feat_004',
    title: 'Performance Analytics',
    description: 'Deep insights into your study patterns, progress, and skill development.',
    icon: 'BarChart3',
  },
];

export const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Access courses, track progress, earn badges, and get AI-powered study assistance.',
    icon: 'GraduationCap',
  },
  {
    id: 'instructor',
    title: 'Instructor',
    description: 'Create courses, manage students, track analytics, and build learning paths.',
    icon: 'Users',
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Manage the platform, users, content, and system-wide settings.',
    icon: 'Shield',
  },
];
