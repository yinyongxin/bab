import {
  IconChevronRight,
  IconLogout,
  IconMoon,
  IconSun,
  IconUser,
} from '@tabler/icons-react';
import {
  Avatar,
  Group,
  Text,
  Menu,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import classes from './UserButton.module.css';
import { IconSearch } from '@tabler/icons-react';
import useAuth from '@/utils/hooks/useAuth';
import { useAppSelector } from '@/store';
import { getFilePath } from '@/utils';
import { spotlight } from '@mantine/spotlight';

type UserButtonProps = {
  onlyShowAvatar?: boolean;
};
export function UserButton(props: UserButtonProps) {
  const { onlyShowAvatar = false } = props;
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const user = useAppSelector((state) => state.auth.user);

  // const actions: SpotlightActionData[] = [
  //   {
  //     id: 'home',
  //     label: 'Home',
  //     description: 'Get to home page',
  //     onClick: () => console.log('Home'),
  //     leftSection: <IconHome size={24} stroke={1.5} />,
  //   },
  //   {
  //     id: 'dashboard',
  //     label: 'Dashboard',
  //     description: 'Get full information about current system status',
  //     onClick: () => console.log('Dashboard'),
  //     leftSection: <IconDashboard size={24} stroke={1.5} />,
  //   },
  //   {
  //     id: 'documentation',
  //     label: 'Documentation',
  //     description: 'Visit documentation to lean more about all features',
  //     onClick: () => console.log('Documentation'),
  //     leftSection: <IconFileText size={24} stroke={1.5} />,
  //   },
  // ];

  const { signOut } = useAuth();
  return (
    <>
      <Menu shadow="md" width={200} position="right-end">
        <Menu.Target>
          <UnstyledButton className={classes.user}>
            <Group>
              <Avatar src={getFilePath(user.avatar)} radius="xl" />
              {!onlyShowAvatar && (
                <>
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user.username}
                    </Text>
                    <Text c="dimmed" size="xs">
                      {user.email}
                    </Text>
                  </div>

                  <IconChevronRight size={14} stroke={1.5} />
                </>
              )}
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>功能</Menu.Label>
          {/* <Menu.Item leftSection={<IconSettings size={14} />}>
            Settings
          </Menu.Item>
          <Menu.Item leftSection={<IconMessageCircle size={14} />}>
            Messages
          </Menu.Item>
          <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item> */}
          <Menu.Item
            leftSection={
              computedColorScheme === 'dark' ? (
                <IconSun size={14} stroke={1.5} />
              ) : (
                <IconMoon size={14} stroke={1.5} />
              )
            }
            onClick={() =>
              setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
            }
          >
            {computedColorScheme === 'light' ? '深色模式' : '浅色模式'}
          </Menu.Item>
          <Menu.Item
            leftSection={<IconSearch size={14} />}
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘K
              </Text>
            }
            onClick={spotlight.open}
          >
            搜索
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>用户</Menu.Label>
          <Menu.Item leftSection={<IconUser size={14} />}>个人信息</Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconLogout size={14} />}
            onClick={signOut}
          >
            退出登录
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
