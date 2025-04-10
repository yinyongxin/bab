import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './MegaMenu.module.css';
import { useAppSelector } from '@/store';
import { Link, useLocation } from 'react-router-dom';
import { TreeMenuDataDto } from '@/client';
import FontIcons from '@/components/FontIcons';
import path from 'path';
import { useState, useEffect } from 'react';

export default function MegaMenu() {
  const { navigationTree } = useAppSelector((state) => state.auth.menus);
  const theme = useMantineTheme();
  const [activeSubLink, setActiveSubLink] = useState('');
  const [activeMainLink, setActiveMainLink] = useState('');
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMainLink = currentPath[1];
    const currentSubLink = currentPath[2];
    setActiveMainLink(currentMainLink);
    setActiveSubLink(currentSubLink);
  }, [location.pathname]);

  const getLinks = (navigation: TreeMenuDataDto) => {
    const { children } = navigation;
    return children.map((item) => {
      const active = activeSubLink === item.path;
      console.log('activeSubLink', activeSubLink);
      console.log(' item.path', item.path);
      console.log('active', active);
      return (
        <Link
          to={`/${navigation.path}/${item.path}`}
          className={classes.subLink}
          key={item.name}
          data-active={active || undefined}
        >
          <Group wrap="nowrap" align="flex-start">
            <ThemeIcon size={36} variant="default" radius="md">
              <FontIcons
                size={22}
                color={theme.colors.gray[5]}
                name={item.icon}
              />
            </ThemeIcon>
            <div>
              <Title order={6} lineClamp={1}>
                {item.name}
              </Title>
              <Text size="xs" c="dimmed" lineClamp={1}>
                {item.description}
              </Text>
            </div>
          </Group>
        </Link>
      );
    });
  };

  const mainLinks = navigationTree.map((navigation) => {
    const { children } = navigation;
    const active = activeMainLink === navigation.path;
    const hasChildren = children.length > 0;
    if (hasChildren) {
      return (
        <HoverCard
          width={600}
          position="bottom"
          radius="md"
          shadow="md"
          withinPortal
        >
          <HoverCard.Target>
            <Link to={navigation.path || '/'} className={classes.link}>
              <Group
                align="center"
                gap="xs"
                c={active ? 'var(--mantine-primary-color-5)' : undefined}
              >
                <FontIcons name={navigation.icon} size={18}></FontIcons>
                <Title order={5} mr={5}>
                  {navigation.name}
                </Title>
                <IconChevronDown size={16} />
              </Group>
            </Link>
          </HoverCard.Target>

          <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
            <Group justify="space-between">
              <Title order={5}>{navigation.name}</Title>
              <Anchor href="#" fz="xs">
                {/* View all */}
              </Anchor>
            </Group>

            <Divider my="sm" />

            <SimpleGrid cols={2} spacing="md">
              {getLinks(navigation)}
            </SimpleGrid>

            <div className={classes.dropdownFooter}>
              <Text size="xs" c="dimmed">
                {navigation.description}
              </Text>
            </div>
          </HoverCard.Dropdown>
        </HoverCard>
      );
    }

    return (
      <Link to={navigation.path || '/'} className={classes.link}>
        {navigation.name}
      </Link>
    );
  });

  return (
    <>
      <div className={classes.header}>
        <Group h="100%" gap={0}>
          {mainLinks}
        </Group>
      </div>
    </>
  );
}
