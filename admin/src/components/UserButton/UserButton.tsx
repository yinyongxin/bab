import {
  IconChevronRight,
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
  IconUser,
  IconSearch,
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

  const { signOut } = useAuth();
  return (
    <>
      <Menu shadow="md" width={200} position="right-end">
        <Menu.Target>
          <UnstyledButton className={classes.user}>
            <Group>
              <Avatar src={getFilePath(user.avatar)} radius="md" />
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
          <Menu.Item leftSection={<IconSettings size={14} />}>设置</Menu.Item>
          {/* <Menu.Item leftSection={<IconMessageCircle size={14} />}>
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
