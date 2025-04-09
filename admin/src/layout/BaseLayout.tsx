import { LayoutTypes } from '@/@types/layout';
import Views from '@/layout/Views';
import { useAppSelector } from '@/store';
import { AppShell } from '@mantine/core';
import { lazy, useMemo } from 'react';
const sideBars = {
  [LayoutTypes.SimpleSideBar]: lazy(
    () => import('./LayoutTypes/SimpleSideBar/SimpleSideBar'),
  ),
  [LayoutTypes.DeckedSideBar]: lazy(
    () => import('./LayoutTypes/DeckedSideBar/DeckedSideBar'),
  ),
};
export default function BaseLayout() {
  const appConfig = useAppSelector((state) => state.appConfig);
  const { layoutType, desktop } = appConfig;

  const SideBar = useMemo(() => {
    return sideBars[layoutType];
  }, [layoutType, desktop]);

  return (
    <>
      <AppShell
        navbar={{
          width: 300,
          breakpoint: 'md',
          collapsed: { desktop: !desktop },
        }}
      >
        <AppShell.Navbar>
          <SideBar />
        </AppShell.Navbar>
        <AppShell.Main bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
          <Views />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
