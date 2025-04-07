import { useEffect, useState } from 'react';
import {
  UnstyledButton,
  Tooltip,
  Title,
  Box,
  useMantineTheme,
  useMantineColorScheme,
  rem,
  Center,
  AppShell,
} from '@mantine/core';
import classes from './DeckedSideBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import Views from '@/Layout/Views';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';
import FontIcons from '@/components/FontIcons';
import { UserButton } from '@/components/UserButton/UserButton';
import appConfig from '@/configs/app.config';

function DeckedSideBarContent() {
  const [activeMainLink, setActiveMainLink] = useState('');
  const [activeSubLink, setActiveSubLink] = useState('');
  const [title, setTitle] = useState('');
  const location = useLocation();
  const { t } = useTranslation();
  const { navigationTree = [] } = useAppSelector((state) => state.auth.menus);

  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMainLink = currentPath[1];
    const currentSubLink = currentPath[2];
    setActiveMainLink(currentMainLink);
    setActiveSubLink(currentSubLink);
    setTitle(
      navigationTree.find((item) => item.path === `/${currentMainLink}`)
        ?.title || '',
    );
  }, [location.pathname]);

  const handleMainLinkClick = (
    mainLink: string,
    title: string,
    translateKey: string,
  ) => {
    setActiveMainLink(mainLink.split('/')[1]);
    setTitle(translateKey ? t(translateKey) : title);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <Center className={classes.logo}>
            <img
              className={classes.logoImage}
              alt="Mantine Logo"
              src={appConfig.logo}
            />
          </Center>
          <Box style={{ overflowY: 'auto', flex: 1 }} py="md">
            {navigationTree.map((link, index) => (
              <Tooltip
                key={index}
                label={link.translateKey ? t(link.translateKey) : link.title}
                position="right"
                withArrow
                transitionProps={{ duration: 0 }}
              >
                <UnstyledButton
                  onClick={() =>
                    handleMainLinkClick(
                      link.path,
                      link.title,
                      link.translateKey,
                    )
                  }
                  className={classes.mainLink}
                  data-active={
                    link.path.split('/')[1] === activeMainLink || undefined
                  }
                >
                  <FontIcons
                    name={link.icon || ''}
                    style={{ fontSize: rem(18) }}
                  />
                </UnstyledButton>
              </Tooltip>
            ))}
          </Box>
          <UserButton onlyShowAvatar />
        </div>
        <div className={classes.main}>
          <div>
            <div className={classes.stickyTitle}>
              <Title order={4} className={classes.title}>
                {title}
              </Title>
            </div>
            <div>
              {navigationTree.map((link, index) => (
                <div
                  key={index}
                  style={{
                    display:
                      link.path.split('/')[1] === activeMainLink
                        ? 'block'
                        : 'none',
                  }}
                >
                  {link.subMenu?.map((submenuItem, subIndex) => {
                    return (
                      <Link
                        to={`${link.path}${submenuItem.path}`}
                        className={classes.link}
                        data-active={
                          `${submenuItem.path.split('/')[1]}` ===
                            activeSubLink || undefined
                        }
                        key={subIndex}
                      >
                        {submenuItem.translateKey
                          ? t(submenuItem.translateKey)
                          : submenuItem.title}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function DeckedSideBar() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <AppShell navbar={{ width: 300, breakpoint: 'sm' }} padding="xl">
      <AppShell.Navbar>
        <DeckedSideBarContent />
      </AppShell.Navbar>
      <AppShell.Main
        bg={
          colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
        }
      >
        <Views />
      </AppShell.Main>
    </AppShell>
  );
}
