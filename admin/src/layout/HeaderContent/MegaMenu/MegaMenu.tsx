import { IconChevronDown } from '@tabler/icons-react';
import {
  Anchor,
  Box,
  Divider,
  Group,
  HoverCard,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import classes from './MegaMenu.module.css';
import { useAppSelector } from '@/store';
import { Link, useLocation } from 'react-router-dom';
import { TreeMenuDataDto } from '@/client';
import FontIcons from '@/components/FontIcons';
import { useState, useEffect, useContext } from 'react';
import LayoutContext from '@/layout/LayoutContext';

export default function MegaMenu() {
  const { navigationTree } = useAppSelector((state) => state.auth.menus);
  const theme = useMantineTheme();
  const { activeSubLink, activeMainLink } = useContext(LayoutContext);

  const getLinks = (navigation: TreeMenuDataDto) => {
    const { children } = navigation;
    return children.map((item) => {
      const active = activeSubLink === item.path;
      return (
        <Link
          to={`/${navigation.path}/${item.path}`}
          className={classes.subLink}
          key={item._id}
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
          key={navigation._id}
          width={600}
          position="bottom"
          radius="md"
          shadow="md"
          withinPortal
        >
          <HoverCard.Target>
            <Box className={classes.link}>
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
            </Box>
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
