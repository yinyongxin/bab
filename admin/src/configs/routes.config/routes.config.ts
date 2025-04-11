import { ComponentType, lazy } from 'react';
import authRoute from './authRoute';
import type { Routes } from '@/@types/routes';

export const publicRoutes: Routes = [...authRoute];

const modules = import.meta.glob<{
  // default: ComponentType<JSX.Element>;
  default: ComponentType<Record<string, unknown>>;
}>('../../pages/**/*.page.tsx', {
  // import: 'default',
});

console.log('modules', modules);
export const protectedRoutes = [
  {
    key: 'managers',
    path: '/systems/managers',
    component: lazy(modules['../../pages/systems/managers/managers.page.tsx']),
  },
  {
    key: 'roles',
    path: '/systems/roles',
    component: lazy(modules['../../pages/systems/roles/index.page.tsx']),
  },
  {
    key: 'menus',
    path: '/systems/menus',
    component: lazy(modules['../../pages/systems/menus/index.page.tsx']),
  },
  {
    key: 'files',
    path: '/systems/files',
    component: lazy(modules['../../pages/systems/files/index.page.tsx']),
  },
];
