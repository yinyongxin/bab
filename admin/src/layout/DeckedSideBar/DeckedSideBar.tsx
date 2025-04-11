import { useContext, useEffect, useMemo, useState } from 'react';
import {
  UnstyledButton,
  Tooltip,
  Title,
  Box,
  rem,
  Center,
  Image,
  Avatar,
} from '@mantine/core';
import classes from './DeckedSideBar.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store';
import FontIcons from '@/components/FontIcons';
import { UserButton } from '@/layout/UserButton/UserButton';
import { getFilePath } from '@/utils';
import LayoutContext from '../LayoutContext';
import useAppConfig from '@/store/hook/useAppConfig';

export default function DeckedSideBar() {
  const [appConfig] = useAppConfig();
  const { activeMainLink, setActiveMainLink, activeSubLink } =
    useContext(LayoutContext);
  const [title, setTitle] = useState('');
  const { menus, user } = useAppSelector((state) => state.auth);
  const { navigationTree = [] } = menus;
  const subLinkList = useMemo(() => {
    const subMenus = (
      navigationTree.find((linkItem) => linkItem.path === activeMainLink)
        ?.children || []
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
              {subMenuItem.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }, [activeMainLink, activeSubLink, title]);

  useEffect(() => {
    const title =
      navigationTree.find((item) => item.path === activeMainLink)?.name || '';
    setTitle(title);
  }, [activeMainLink]);

  const handleMainLinkClick = (mainLink?: string, title?: string) => {
    if (mainLink && title) {
      setActiveMainLink(mainLink);
      setTitle(title);
    }
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
            {navigationTree.map((link, index) => {
              const active = link.path === activeMainLink;

              return (
                <Tooltip
                  key={index}
                  label={link.name}
                  position="right"
                  withArrow
                  transitionProps={{ duration: 0 }}
                >
                  <UnstyledButton
                    onClick={() => handleMainLinkClick(link.path, link.name)}
                    className={classes.mainLink}
                    data-active={active || undefined}
                  >
                    <FontIcons name={link.icon} style={{ fontSize: rem(18) }} />
                  </UnstyledButton>
                </Tooltip>
              );
            })}
          </Box>

          <UserButton>
            <Box pb="md" w="100%">
              <Center>
                <UnstyledButton>
                  <Avatar src={user.avatar} radius="md" />
                </UnstyledButton>
              </Center>
            </Box>
          </UserButton>
        </div>
        {subLinkList}
      </div>
    </nav>
  );
}
