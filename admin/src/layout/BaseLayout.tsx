import Views from '@/layout/Views';
import { useAppSelector } from '@/store';
import { AppShell } from '@mantine/core';
import HeaderArea from './HeaderArea';
import NavBarContent from './NavBarContent';
import { LayoutTypes } from '@/@types/layout';

export default function BaseLayout() {
  const { desktop, layoutType } = useAppSelector((state) => state.appConfig);
  const showHeader = [
    layoutType === LayoutTypes.Top,
    layoutType === LayoutTypes.TopSide,
  ].some((value) => value);
  const showNavbar = [layoutType !== LayoutTypes.Top].some((value) => value);
  const navbar = showNavbar
    ? {
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: !desktop },
      }
    : undefined;
  const header = showHeader
    ? {
        height: 60,
      }
    : undefined;
  return (
    <>
      <AppShell navbar={navbar} header={header}>
        {showHeader && (
          <AppShell.Header>
            <HeaderArea />
          </AppShell.Header>
        )}
        {showNavbar && (
          <AppShell.Navbar>
            <NavBarContent />
          </AppShell.Navbar>
        )}
        <AppShell.Main bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
          <Views />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
