import { useEffect, useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import {
  Box,
  Collapse,
  Group,
  rem,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import classes from './NavbarLinksGroup.module.css';
import FontIcons from '@/components/FontIcons';
import { NavigationTree } from '@/@types/navigation';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';

interface LinksGroupProps extends NavigationTree {
  initiallyOpened?: boolean;
}

export function LinksGroup({
  icon,
  title,
  path,
  initiallyOpened,
  subMenu,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(subMenu);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [activeSubLink, setActiveSubLink] = useState('');
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMainLink = currentPath[1];
    const currentSubLink = currentPath[2];
    setOpened(currentMainLink === path);
    setActiveSubLink(currentSubLink);
  }, [location.pathname]);

  const items = (hasLinks ? subMenu : []).map((link) => (
    <Link
      key={link.key}
      to={`/${path}/${link.path}`}
      className={classes.link}
      data-active={link.path === activeSubLink || undefined}
    >
      {link.title}
    </Link>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <FontIcons name={icon || ''} style={{ fontSize: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{title}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const NavbarLinksGroup = () => {
  const { navigationTree = [] } = useAppSelector((state) => state.auth.menus);
  return navigationTree.map((item) => <LinksGroup {...item} key={item.key} />);
};

export default NavbarLinksGroup;
