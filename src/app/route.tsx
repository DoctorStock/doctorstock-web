import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/pages/login/ui/Page';
import AppShell from './layout/AppShell';
import Home from '@/pages/home/ui/Page';
import Status from '@/pages/status/ui/Page';
import Purchase from '@/pages/purchase/ui/Page';
import Usage from '@/pages/usage/ui/Page';
import History from '@/pages/history/ui/Page';
import Analysis from '@/pages/analysis/ui/Page';
import Board from '@/pages/board/ui/Page';
import Settings from '@/pages/settings/ui/Page';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: '/home', element: <Home /> },
      { path: '/status', element: <Status /> },
      { path: '/purchase', element: <Purchase /> },
      { path: '/usage', element: <Usage /> },
      { path: '/history', element: <History /> },
      { path: '/analysis', element: <Analysis /> },
      { path: '/board', element: <Board /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
]);
