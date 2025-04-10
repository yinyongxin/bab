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
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { TreeMenuDataDto } from '@/client';

interface LinksGroupProps extends TreeMenuDataDto {
  initiallyOpened?: boolean;
}

export function LinksGroup({
  icon,
  name,
  path,
  initiallyOpened,
  children,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(children);
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

  const items = (hasLinks ? children : []).map((link) => (
    <Link
      key={link._id}
      to={`/${path}/${link.path}`}
      className={classes.link}
      data-active={link.path === activeSubLink || undefined}
    >
      {link.name}
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
            <ThemeIcon variant="light" size={32}>
              <FontIcons name={icon || ''} style={{ fontSize: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{name}</Box>
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
  return navigationTree.map((item) => <LinksGroup {...item} key={item._id} />);
};

export default NavbarLinksGroup;
