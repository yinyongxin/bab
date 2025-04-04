import type { NavigationTree } from '@/@types/navigation';
import FontIcons from '@/components/FontIcons';
import { rem } from '@mantine/core';

const navigationConfig: NavigationTree[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    title: '仪表板',
    translateKey: '',
    icon: <FontIcons name="dashboard" style={{ fontSize: rem(18) }} />,
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
    title: '系统管理',
    translateKey: '',
    icon: <FontIcons name="settings" style={{ fontSize: rem(18) }} />,
    authority: [],
    subMenu: [
      {
        key: 'managers',
        path: 'managers',
        title: '人员管理',
        translateKey: '',
        authority: [],
      },
      {
        key: 'roles',
        path: 'roles',
        title: '角色管理',
        translateKey: '',
        authority: [],
      },
      {
        key: 'menus',
        path: 'menus',
        title: '菜单管理',
        translateKey: '',
        authority: [],
      },
    ],
  },
];

export default navigationConfig;
