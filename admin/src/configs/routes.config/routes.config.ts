import { lazy } from 'react';
import authRoute from './authRoute';
import type { Routes } from '@/@types/routes';

export const publicRoutes: Routes = [...authRoute];

export const protectedRoutes = [
  {
    key: 'dashboard',
    path: '/dashboard',
    component: lazy(() => import('@/pages/examples/Dashboard')),
    authority: [],
  },

  {
    key: 'pages',
    path: '/dashboard/pages',
    component: lazy(() => import('@/pages/examples/Pages')),
    authority: [],
  },
  {
    key: 'files',
    path: '/dashboard/files',
    component: lazy(() => import('@/pages/examples/Files')),
    authority: [],
  },
  {
    key: 'users',
    path: '/users',
    component: lazy(() => import('@/pages/examples/Users')),
    authority: [],
  },
  {
    key: 'manage',
    path: '/users/manage',
    component: lazy(() => import('@/pages/examples/Manage')),
    authority: [],
  },
  {
    key: 'managers',
    path: '/systems/managers',
    component: lazy(() => import('@/pages/systems/managers')),
    authority: [],
  },
  {
    key: 'roles',
    path: '/systems/roles',
    component: lazy(() => import('@/pages/systems/roles')),
    authority: [],
  },
];
