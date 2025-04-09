import { useEffect, useMemo, useState } from 'react';
import {
  UnstyledButton,
  Tooltip,
  Title,
  Box,
  rem,
  Center,
  AppShell,
  Image,
} from '@mantine/core';
import classes from './DeckedSideBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';
import FontIcons from '@/components/FontIcons';
import { UserButton } from '@/components/UserButton/UserButton';
import appConfig from '@/configs/app.config';
import { getFilePath } from '@/utils';

export function DeckedSideBarContent() {
  const [activeMainLink, setActiveMainLink] = useState('');
  const [activeSubLink, setActiveSubLink] = useState('');
  const [title, setTitle] = useState('');
  const location = useLocation();
  const { t } = useTranslation();
  const { navigationTree = [] } = useAppSelector((state) => state.auth.menus);

  const subLinkList = useMemo(() => {
    const subMenus = (
      navigationTree.find((linkItem) => linkItem.path === activeMainLink)
        ?.subMenu || []
    ).filter((subLinkItem) => !subLinkItem.isHide);
    return (
      <div className={classes.main}>
        <div>
          <div className={classes.stickyTitle}>
            <Title order={4} className={classes.title}>
              {title}
            </Title>
          </div>
          {subMenus.map((subMenuItem, subIndex) => (
            <Link
              to={`/${activeMainLink}/${subMenuItem.path}`}
              className={classes.link}
              data-active={subMenuItem.path === activeSubLink || undefined}
              key={subIndex}
            >
              {subMenuItem.translateKey
                ? t(subMenuItem.translateKey)
                : subMenuItem.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }, [activeMainLink, activeSubLink, title]);

  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMainLink = currentPath[1];
    const currentSubLink = currentPath[2];
    setActiveMainLink(currentMainLink);
    setActiveSubLink(currentSubLink);
    setTitle(
      navigationTree.find((item) => item.path === currentMainLink)?.title || '',
    );
  }, [location.pathname]);

  const handleMainLinkClick = (
    mainLink: string,
    title: string,
    translateKey: string,
  ) => {
    setActiveMainLink(mainLink);
    setTitle(translateKey ? t(translateKey) : title);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <Center className={classes.logo}>
            <Image
              radius="sm"
              w="40"
              h="40"
              alt="Logo"
              src={getFilePath(appConfig.logo)}
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
                  data-active={link.path === activeMainLink || undefined}
                >
                  <FontIcons name={link.icon} style={{ fontSize: rem(18) }} />
                </UnstyledButton>
              </Tooltip>
            ))}
          </Box>
          <UserButton onlyShowAvatar />
        </div>
        {subLinkList}
      </div>
    </nav>
  );
}

const DeckedSideBar = () => {
  return (
    <AppShell.Navbar>
      <DeckedSideBarContent />
    </AppShell.Navbar>
  );
};
export default DeckedSideBar;
