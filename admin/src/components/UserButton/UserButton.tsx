import {
  IconLogout,
  IconMoon,
  IconSettings,
  IconSun,
  IconUser,
  IconSearch,
} from '@tabler/icons-react';
import {
  Text,
  Menu,
  useComputedColorScheme,
  useMantineColorScheme,
  Drawer,
  MenuProps,
} from '@mantine/core';
import useAuth from '@/utils/hooks/useAuth';
import { spotlight } from '@mantine/spotlight';
import { useDisclosure } from '@mantine/hooks';
import AppConfigSettings from '../AppConfigSettings/AppConfigSettings';

type UserButtonProps = {
  children?: React.ReactNode;
} & MenuProps;
export function UserButton(props: UserButtonProps) {
  const { children, ...menuProps } = props;
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const [drawerOpened, drawerOpenedAction] = useDisclosure(false);

  const { signOut } = useAuth();
  return (
    <>
      <Menu shadow="md" width={200} position="right-end" {...menuProps}>
        <Menu.Target>{children}</Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>功能</Menu.Label>
          <Menu.Item
            leftSection={<IconSettings size={14} />}
            onClick={drawerOpenedAction.open}
          >
            设置
          </Menu.Item>
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
      <Drawer
        title="应用设置"
        position="right"
        opened={drawerOpened}
        onClose={drawerOpenedAction.close}
      >
        <AppConfigSettings />
      </Drawer>
    </>
  );
}
