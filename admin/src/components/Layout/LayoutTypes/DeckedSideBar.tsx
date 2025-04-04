import { useEffect, useState } from 'react';
import {
  UnstyledButton,
  Tooltip,
  Title,
  ActionIcon,
  Box,
  useMantineTheme,
  useMantineColorScheme,
  rem,
} from '@mantine/core';
import classes from './DeckedSideBar.module.css';
import navigationConfig from '@/configs/navigation.config';
import { Link, useLocation } from 'react-router-dom';
import Views from '@/components/Layout/Views';
import { useTranslation } from 'react-i18next';
import AuthorityCheck from '@/route/AuthorityCheck';
import { useAppSelector } from '@/store';
import { IconLogout } from '@tabler/icons-react';
import useAuth from '@/utils/hooks/useAuth';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import FontIcons from '@/components/FontIcons';

function DeckedSideBarContent() {
  const { signOut } = useAuth();
  const [activeMainLink, setActiveMainLink] = useState('');
  const [activeSubLink, setActiveSubLink] = useState('');
  const [title, setTitle] = useState('');
  const location = useLocation();
  const { t } = useTranslation();
  const userAuthority = useAppSelector((state) => state.auth.user.role);

  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMainLink = currentPath[1];
    const currentSubLink = currentPath[2];

    setActiveMainLink(currentMainLink);
    setActiveSubLink(currentSubLink);
    setTitle(currentMainLink.toUpperCase());
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
          <div>
            <img
              className={classes.logo}
              alt={'Mantine Logo'}
              src={'/logo/logo-light-full.svg'}
            />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {navigationConfig.map((link, index) => (
              <AuthorityCheck
                userAuthority={userAuthority ? userAuthority : []}
                authority={link.authority}
                key={index}
              >
                <Tooltip
                  label={link.translateKey ? t(link.translateKey) : link.title}
                  position="right"
                  withArrow
                  transitionProps={{ duration: 0 }}
                  key={index}
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
                    <FontIcons name={link.icon} style={{ fontSize: rem(18) }} />
                  </UnstyledButton>
                </Tooltip>
              </AuthorityCheck>
            ))}
          </div>
          <ActionIcon
            size={42}
            variant="subtle"
            color="red"
            aria-label="ActionIcon with size as a number"
            mb="xs"
            onClick={signOut}
          >
            <IconLogout />
          </ActionIcon>
          <ColorSchemeToggle />
        </div>
        <div className={classes.main}>
          <div>
            <div className={classes.stickyTitle}>
              <Title order={4} className={classes.title}>
                {title.toUpperCase()}
              </Title>
            </div>
            <div>
              {navigationConfig.map((link, index) => (
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
                      <AuthorityCheck
                        userAuthority={userAuthority ? userAuthority : []}
                        authority={submenuItem.authority}
                        key={subIndex}
                      >
                        <Link
                          to={`${link.path}/${submenuItem.path}`}
                          className={classes.link}
                          data-active={
                            `${submenuItem.path}` === activeSubLink || undefined
                          }
                          key={subIndex}
                        >
                          {submenuItem.translateKey
                            ? t(submenuItem.translateKey)
                            : submenuItem.title}
                        </Link>
                      </AuthorityCheck>
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
    <Box
      bg={colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flex: '1 1 auto',
        height: '100vh',
      }}
    >
      <DeckedSideBarContent />
      <Box
        style={{
          padding: '1rem',
          flex: 1,
          overflow: 'auto',
        }}
      >
        <Views />
      </Box>
    </Box>
  );
}
