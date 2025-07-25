import { Routes } from '@/@types/routes';
import { lazy } from 'react';

export { protectedRoutes, publicRoutes } from './routes.config';

export const errorRoutes: Routes = [
  {
    key: 'nothingFound',
    path: '/nothingFound',
    component: lazy(() => import('@/pages/nothingFound/index.page')),
  },
];
