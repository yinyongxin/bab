import { useState } from 'react';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import {
  Box,
  Collapse,
  Group,
  rem,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import classes from './NavbarLinksGroup.module.css';
import FontIcons from '@/components/FontIcons';
import { NavigationTree } from '@/@types/navigation';
import { Link } from 'react-router-dom';

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
  const items = (hasLinks ? subMenu : []).map((link) => (
    <Link key={link.key} to={`${path}${link.path}`} className={classes.link}>
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
