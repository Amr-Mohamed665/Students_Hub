import { createBrowserRouter, Navigate } from 'react-router-dom';

import DashboardLayout from './components/layouts/DashboardLayout/DashboardLayout';

import SplashScreen from './pages/public/SplashScreen/SplashScreen';
import LandingPage from './pages/public/LandingPage/LandingPage';
import ChooseRole from './pages/public/ChooseRole/ChooseRole';

import Overview from './pages/dashboard/Overview/Overview';
import MissionControl from './pages/dashboard/MissionControl/MissionControl';
import KnowledgeVault from './pages/dashboard/KnowledgeVault/KnowledgeVault';
import GalaxyLibrary from './pages/dashboard/GalaxyLibrary/GalaxyLibrary';
import MissionObjectives from './pages/dashboard/MissionObjectives/MissionObjectives';
import PerformanceObservatory from './pages/dashboard/PerformanceObservatory/PerformanceObservatory';
import AIStudyCoach from './pages/dashboard/AIStudyCoach/AIStudyCoach';
import StudentProfile from './pages/dashboard/StudentProfile/StudentProfile';
import NotificationCenter from './pages/dashboard/NotificationCenter/NotificationCenter';
import CommandCenter from './pages/dashboard/CommandCenter/CommandCenter';
import Notes from './pages/dashboard/Notes/Notes';

function RequireAuth({ children }) {
  return children;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/splash',
    element: <SplashScreen />,
  },
  {
    path: '/choose-role',
    element: <RequireAuth><ChooseRole /></RequireAuth>,
  },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: 'missions',
        element: <MissionControl />,
      },
      {
        path: 'vault',
        element: <KnowledgeVault />,
      },
      {
        path: 'library',
        element: <GalaxyLibrary />,
      },
      {
        path: 'objectives',
        element: <MissionObjectives />,
      },
      {
        path: 'analytics',
        element: <PerformanceObservatory />,
      },
      {
        path: 'coach',
        element: <AIStudyCoach />,
      },
      {
        path: 'profile',
        element: <StudentProfile />,
      },
      {
        path: 'notifications',
        element: <NotificationCenter />,
      },
      {
        path: 'command',
        element: <CommandCenter />,
      },
      {
        path: 'notes',
        element: <Notes />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
