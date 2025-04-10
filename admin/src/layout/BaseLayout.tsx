import Views from '@/layout/Views';
import { useAppSelector } from '@/store';
import { AppShell } from '@mantine/core';
import HeaderContent from './HeaderContent/HeaderContent';
import NavBarContent from './NavBarContent';
import { LayoutTypes } from '@/@types/layout';
import { useEffect, useState } from 'react';
import LayoutContext from './LayoutContext';
import { useLocation } from 'react-router-dom';

export default function BaseLayout() {
  const { desktop, layoutType } = useAppSelector((state) => state.appConfig);
  const [activeSubLink, setActiveSubLink] = useState('');
  const [activeMainLink, setActiveMainLink] = useState('');
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMainLink = currentPath[1];
    const currentSubLink = currentPath[2];
    setActiveMainLink(currentMainLink);
    setActiveSubLink(currentSubLink);
  }, [location.pathname]);

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
    <LayoutContext.Provider
      value={{
        activeSubLink,
        setActiveSubLink,
        activeMainLink,
        setActiveMainLink,
      }}
    >
      <AppShell navbar={navbar} header={header}>
        {showHeader && (
          <AppShell.Header>
            <HeaderContent />
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
    </LayoutContext.Provider>
  );
}
