import type { NavigationTree } from '@/@types/navigation';
import { IconDashboard, IconUser } from '@tabler/icons-react';

const navigationConfig: NavigationTree[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    translateKey: '',
    icon: IconDashboard,
    authority: [],
    subMenu: [
      {
        key: 'files',
        path: 'files',
        title: 'Files',
        translateKey: '',
        authority: [],
      },
      {
        key: 'pages',
        path: 'pages',
        title: 'Pages',
        translateKey: '',
        authority: [],
      },
    ],
  },
  {
    key: 'users',
    path: '/users',
    title: 'Users',
    translateKey: '',
    icon: IconUser,
    authority: [],
    subMenu: [
      {
        key: 'manage',
        path: 'manage',
        title: 'Manage',
        translateKey: '',
        authority: [],
      },
    ],
  },
];

export default navigationConfig;
