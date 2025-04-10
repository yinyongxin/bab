import { useContext, useEffect, useState } from 'react';
import {
  Icon2fa,
  IconBellRinging,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './SimpleSideMenu.module.css';
import { useAppSelector } from '@/store';
import LayoutContext from '@/layout/LayoutContext';
import FontIcons from '@/components/FontIcons';
import { Link } from 'react-router-dom';

export default function SimpleSideMenu() {
  const { activeMainLink, activeSubLink } = useContext(LayoutContext);
  const { menus } = useAppSelector((state) => state.auth);
  const subMenus =
    menus.navigationTree.find((item) => item.path === activeMainLink)
      ?.children || [];

  const links = subMenus.map((subMenu) => (
    <Link
      to={`/${activeMainLink}/${subMenu.path}`}
      className={classes.link}
      data-active={subMenu.path === activeSubLink || undefined}
      key={subMenu._id}
    >
      <FontIcons className={classes.linkIcon} name={subMenu.icon} size={20} />
      <span>{subMenu.name}</span>
    </Link>
  ));

  return <nav className={classes.navbar}>{links}</nav>;
}
