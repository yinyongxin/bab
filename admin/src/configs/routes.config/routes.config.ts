import { ComponentType, lazy } from 'react';
import authRoute from './authRoute';
import type { Routes } from '@/@types/routes';

export const publicRoutes: Routes = [...authRoute];
export const errorRoutes: Routes = [
  {
    key: 'nothingFound',
    path: '/nothingFound',
    component: lazy(() => import('@/pages/nothingFoundBackground/index.page')),
    authority: [],
  },
];

const modules = import.meta.glob<{
  // default: ComponentType<JSX.Element>;
  default: ComponentType<Record<string, unknown>>;
}>('../../pages/**/index.page.tsx', {
  // import: 'default',
});

console.log('modules', modules);
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
    component: lazy(modules['../../pages/systems/managers/index.page.tsx']),
    authority: [],
  },
  {
    key: 'roles',
    path: '/systems/roles',
    component: lazy(modules['../../pages/systems/roles/index.page.tsx']),
    authority: [],
  },
  {
    key: 'menus',
    path: '/systems/menus',
    component: lazy(modules['../../pages/systems/menus/index.page.tsx']),
    authority: [],
  },
];
