import { useEffect, useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './LayoutTypes/SimpleSideBar.module.css';
import { useNavigate } from 'react-router-dom';
import FontIcons from '../FontIcons';

interface LinksGroupProps {
  icon: string;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const navigate = useNavigate();
  const [active, setActive] = useState('');

  useEffect(() => {
    const currentPath = location.pathname;
    setActive(currentPath);
  }, [location.pathname]);

  const items = (hasLinks ? links : []).map((link) => {
    return (
      <Text<'a'>
        component="a"
        data-active={link.link === active ? 'true' : undefined}
        className={classes.link}
        href={link.link}
        key={link.label}
        onClick={(event) => {
          navigate(link.link);
          event.preventDefault();
        }}
      >
        {link.label}
      </Text>
    );
  });

  return (
    <div style={{ marginBottom: '0.8rem' }}>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={5}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ThemeIcon variant="light" size={30}>
              <FontIcons name={icon} style={{ fontSize: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </div>
  );
}
