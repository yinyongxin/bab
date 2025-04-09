import { LayoutTypes } from '@/@types/layout';
import Views from '@/layout/Views';
import { setAppConfig, useAppDispatch, useAppSelector } from '@/store';
import {
  AppShell,
  Avatar,
  Center,
  Group,
  UnstyledButton,
  Text,
  ScrollArea,
  rem,
} from '@mantine/core';
import { lazy, useMemo } from 'react';
import HeaderArea from './HeaderArea';
import { IconChevronRight } from '@tabler/icons-react';
import LogoArea from './LogoArea';
import { UserButton } from '@/components/UserButton/UserButton';
import { getFilePath } from '@/utils';
const sideBars = {
  [LayoutTypes.SimpleSideBar]: lazy(
    () => import('./NavbarLinksGroup/NavbarLinksGroup'),
  ),
  [LayoutTypes.DeckedSideBar]: lazy(
    () => import('./LayoutTypes/DeckedSideBar/DeckedSideBar'),
  ),
};
export default function BaseLayout() {
  const appConfig = useAppSelector((state) => state.appConfig);
  const { user } = useAppSelector((state) => state.auth);
  const { layoutType, desktop } = appConfig;
  const dispatch = useAppDispatch();
  const toggleDesktop = () => {
    dispatch(
      setAppConfig({
        desktop: !appConfig.desktop,
      }),
    );
  };

  const SideBar = useMemo(() => {
    const Content = sideBars[layoutType];
    if (layoutType === LayoutTypes.SimpleSideBar) {
      return () => (
        <>
          <AppShell.Section
            h={60}
            style={{
              borderBottom: '1px solid var(--mantine-color-gray-2)',
            }}
          >
            <LogoArea />
          </AppShell.Section>
          <AppShell.Section grow my="md" component={ScrollArea}>
            <Content />
          </AppShell.Section>
          <AppShell.Section
            style={{
              borderTop: '1px solid var(--mantine-color-gray-2)',
            }}
          >
            <UserButton>
              <UnstyledButton w="100%" px="md">
                <Group h={rem(60)} justify="space-between" align="center">
                  <Avatar src={getFilePath(user.avatar)} radius="md" />
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user.username}
                    </Text>
                    <Text c="dimmed" size="xs">
                      {user.email}
                    </Text>
                  </div>

                  <IconChevronRight size={14} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </UserButton>
          </AppShell.Section>
        </>
      );
    }
    return Content;
  }, [layoutType, desktop, user]);

  return (
    <>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: 'md',
          collapsed: { desktop: !desktop },
        }}
        header={{
          height: 60,
        }}
      >
        <AppShell.Header>
          <AppShell.Header>
            <HeaderArea />
          </AppShell.Header>
        </AppShell.Header>
        <AppShell.Navbar>
          <SideBar />
          <UnstyledButton
            w="xl"
            pos="absolute"
            h="100%"
            right="0"
            style={{
              transform: 'translateX(100%)',
            }}
            onClick={toggleDesktop}
          >
            <Center>
              <IconChevronRight
                style={{
                  transform: appConfig.desktop
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
                }}
              />
            </Center>
          </UnstyledButton>
        </AppShell.Navbar>
        <AppShell.Main bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
          <Views />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
