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
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
} from '@tabler/icons-react';
import useAuth from '@/utils/hooks/useAuth';
export function UserButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const { signOut } = useAuth();
  return (
    <Menu shadow="md" width={200} position="right-end">
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Harriette Spoonlicker
              </Text>

              <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
              </Text>
            </div>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
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
          {computedColorScheme}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>用户</Menu.Label>
        <Menu.Item leftSection={<IconUser size={14} />}>个人信息</Menu.Item>
        <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
          退出登录
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
