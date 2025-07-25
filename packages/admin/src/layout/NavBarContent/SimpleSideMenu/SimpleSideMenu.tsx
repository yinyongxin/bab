import { useContext } from 'react';
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
  const links = subMenus.map((subMenu) => {
    const active = subMenu.path === activeSubLink;
    return (
      <Link
        to={`/${activeMainLink}/${subMenu.path}`}
        className={classes.link}
        data-active={active|| undefined}
        key={subMenu._id}
      >
        <FontIcons className={classes.linkIcon} name={subMenu.icon} size={20} />
        <span>{subMenu.name}</span>
      </Link>
    );
  });

  return <nav className={classes.navbar}>{links}</nav>;
}
