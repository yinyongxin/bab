import { useContext } from 'react';
import classes from './SimpleSideMenu.module.css';
import { useAppSelector } from '@/store';
import LayoutContext from '@/layout/LayoutContext';
import FontIcons from '@/components/FontIcons';
import { Link } from 'react-router-dom';
import { useMantineTheme } from '@mantine/core';

export default function SimpleSideMenu() {
  const { activeMainLink, activeSubLink } = useContext(LayoutContext);
  const { menus } = useAppSelector((state) => state.auth);
  const theme = useMantineTheme();
  const subMenus =
    menus.navigationTree.find((item) => item.path === activeMainLink)
      ?.children || [];
  const isDarkColor =
    theme.primaryColor === 'dark' || theme.primaryColor === 'gray';

  const links = subMenus.map((subMenu) => {
    const active = subMenu.path === activeSubLink;
    return (
      <Link
        to={`/${activeMainLink}/${subMenu.path}`}
        className={classes.link}
        data-active={(!isDarkColor && active) || undefined}
        data-dark-hover={isDarkColor || undefined}
        data-dark-active={(isDarkColor && active) || undefined}
        key={subMenu._id}
      >
        <FontIcons className={classes.linkIcon} name={subMenu.icon} size={20} />
        <span>{subMenu.name}</span>
      </Link>
    );
  });

  return <nav className={classes.navbar}>{links}</nav>;
}
