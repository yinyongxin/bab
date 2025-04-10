import Views from '@/layout/Views';
import { useAppSelector } from '@/store';
import { AppShell, Drawer, ScrollArea } from '@mantine/core';
import HeaderContent from './HeaderContent/HeaderContent';
import NavBarContent from './NavBarContent';
import { LayoutTypes } from '@/@types/layout';
import { useEffect, useMemo, useState } from 'react';
import LayoutContext from './LayoutContext';
import { useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import AppConfigSettings from '@/components/AppConfigSettings/AppConfigSettings';

export default function BaseLayout() {
  const { desktop, layoutType } = useAppSelector((state) => state.appConfig);
  const [activeSubLink, setActiveSubLink] = useState('');
  const [activeMainLink, setActiveMainLink] = useState('');
  const [appSettingsOpened, setAppSettingsAction] = useDisclosure(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMainLink = currentPath[1];
    if (activeMainLink !== currentMainLink) {
      setActiveMainLink(currentMainLink);
    }
    const currentSubLink = currentPath[2];
    setActiveSubLink(currentSubLink);
  }, [location.pathname]);

  const appHeader = useMemo(() => {
    const showHeader = [
      layoutType === LayoutTypes.Top,
      layoutType === LayoutTypes.TopSide,
    ].some((value) => value);
    if (showHeader) {
      return {
        content: (
          <AppShell.Header>
            <HeaderContent />
          </AppShell.Header>
        ),
        option: {
          height: 60,
        },
      };
    }
  }, [layoutType]);

  const appNavBar = useMemo(() => {
    const showNavbar = [layoutType !== LayoutTypes.Top].some((value) => value);
    if (showNavbar) {
      return {
        content: (
          <AppShell.Navbar>
            <NavBarContent />
          </AppShell.Navbar>
        ),
        option: {
          width: 300,
          breakpoint: 'md',
          collapsed: { desktop: !desktop },
        },
      };
    }
  }, [layoutType]);

  return (
    <LayoutContext.Provider
      value={{
        activeSubLink,
        setActiveSubLink,
        activeMainLink,
        setActiveMainLink,
        openAppSettings: setAppSettingsAction.open,
      }}
    >
      <AppShell navbar={appNavBar?.option} header={appHeader?.option}>
        {appHeader?.content}
        {appNavBar?.content}
        <AppShell.Main bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
          <Views />
        </AppShell.Main>
      </AppShell>
      <Drawer
        title="应用设置"
        position="right"
        opened={appSettingsOpened}
        onClose={setAppSettingsAction.close}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <AppConfigSettings />
      </Drawer>
    </LayoutContext.Provider>
  );
}
