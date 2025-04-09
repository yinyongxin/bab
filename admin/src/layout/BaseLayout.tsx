import Views from '@/layout/Views';
import { useAppSelector } from '@/store';
import { AppShell } from '@mantine/core';
import HeaderArea from './HeaderArea';
import NavBarContent from './NavBarContent';

export default function BaseLayout() {
  const { desktop } = useAppSelector((state) => state.appConfig);

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
          <NavBarContent />
        </AppShell.Navbar>
        <AppShell.Main bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
          <Views />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
