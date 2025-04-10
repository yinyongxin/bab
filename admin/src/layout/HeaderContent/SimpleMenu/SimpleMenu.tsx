import { useEffect, useState } from 'react';
import { Button, Group, Title, UnstyledButton } from '@mantine/core';
import FontIcons from '@/components/FontIcons';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';
import classes from './SimpleMenu.module.css';

export default function SimpleMenu() {
  const { navigationTree } = useAppSelector((state) => state.auth.menus);
  const [active, setActive] = useState(navigationTree[0]._id);
  const [activeMainLink, setActiveMainLink] = useState('');
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname.split('/');
    const currentMainLink = currentPath[1];
    setActiveMainLink(currentMainLink);
  }, [location.pathname]);

  const items = navigationTree.map((link) => {
    return (
      <UnstyledButton
        key={link._id}
        className={classes.link}
        onClick={() => setActive(link._id)}
        data-active={link._id === active || undefined}
        component={Link}
        to={`/${link.path}`}
      >
        <Group gap={'xs'}>
          <FontIcons name={link.icon} size={18} />
          <Title order={6}>{link.name}</Title>
        </Group>
      </UnstyledButton>
    );
  });

  return (
    <Group align="center" gap={'sm'} h={'100%'}>
      {items}
    </Group>
  );
}
