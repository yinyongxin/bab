import type { NavigationTree } from '@/@types/navigation';
import { IconDashboard, IconSettings, IconUser } from '@tabler/icons-react';

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
    key: 'systems',
    path: '/systems',
    title: 'Systems',
    translateKey: '系统管理',
    icon: IconSettings,
    authority: [],
    subMenu: [
      {
        key: 'managers',
        path: 'managers',
        title: 'Managers',
        translateKey: '人员管理',
        authority: [],
      },
      {
        key: 'roles',
        path: 'roles',
        title: 'Roles',
        translateKey: '角色管理',
        authority: [],
      },
      {
        key: 'menus',
        path: 'manage',
        title: 'Menus',
        translateKey: '菜单管理',
        authority: [],
      },
    ],
  },
];

export default navigationConfig;
