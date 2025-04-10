import { LayoutTypes } from '@/@types/layout';
import { UserButton } from '@/layout/UserButton/UserButton';
import { setAppConfig, useAppDispatch, useAppSelector } from '@/store';
import { getFilePath } from '@/utils';
import {
  AppShell,
  ScrollArea,
  UnstyledButton,
  Group,
  rem,
  Avatar,
  Text,
  Center,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { lazy } from 'react';
import LogoArea from '../LogoArea';

const sideBars = {
  [LayoutTypes.SimpleSideBar]: lazy(
    () => import('../NavbarLinksGroup/NavbarLinksGroup'),
  ),
  [LayoutTypes.DeckedSideBar]: lazy(
    () => import('../DeckedSideBar/DeckedSideBar'),
  ),
  [LayoutTypes.Top]: lazy(() => import('../NavbarLinksGroup/NavbarLinksGroup')),
  [LayoutTypes.TopSide]: lazy(() => import('./SimpleSideMenu/SimpleSideMenu')),
};
const NavBarContent = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { layoutType, desktop } = useAppSelector((state) => state.appConfig);
  if (layoutType === LayoutTypes.Top) {
    return null;
  }
  const Content = sideBars[layoutType];
  const dispatch = useAppDispatch();
  const toggleDesktop = () => {
    dispatch(
      setAppConfig({
        desktop: !desktop,
      }),
    );
  };
  const foldAreaShow =
    layoutType === LayoutTypes.SimpleSideBar ||
    layoutType === LayoutTypes.DeckedSideBar;
  const foldArea = foldAreaShow && (
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
            transform: desktop ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Center>
    </UnstyledButton>
  );

  return (
    <>
      {layoutType === LayoutTypes.SimpleSideBar && (
        <AppShell.Section
          h={60}
          style={{
            borderBottom: '1px solid var(--mantine-color-default-border)',
          }}
        >
          <LogoArea />
        </AppShell.Section>
      )}
      {layoutType !== LayoutTypes.DeckedSideBar ? (
        <AppShell.Section grow component={ScrollArea}>
          <Content />
        </AppShell.Section>
      ) : (
        <Content />
      )}

      {layoutType === LayoutTypes.SimpleSideBar && (
        <AppShell.Section
          style={{
            borderTop: '1px solid var(--mantine-color-default-border)',
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
      )}
      {foldArea}
    </>
  );
};

export default NavBarContent;
