import { useEffect, useState } from 'react';
import { Button, Group } from '@mantine/core';
import FontIcons from '@/components/FontIcons';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

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
      <Button
        key={link._id}
        leftSection={<FontIcons name={link.icon} size={18} />}
        // variant={active === link._id ? 'fill' : 'transparent'}
        onClick={() => setActive(link._id)}
      >
        {link.name}
      </Button>
    );
  });

  return (
    <Group align="center" gap={'sm'} h={'100%'}>
      {items}
    </Group>
  );
}
