import { useContext } from 'react';
import { Group, Title, UnstyledButton } from '@mantine/core';
import FontIcons from '@/components/FontIcons';
import { useAppSelector } from '@/store';
import classes from './SimpleMenu.module.css';
import LayoutContext from '@/layout/LayoutContext';

export default function SimpleMenu() {
  const { navigationTree } = useAppSelector((state) => state.auth.menus);
  // const [active, setActive] = useState(false);
  const { activeMainLink, setActiveMainLink } = useContext(LayoutContext);

  const items = navigationTree.map((link) => {
    return (
      <UnstyledButton
        key={link._id}
        className={classes.link}
        onClick={() => {
          setActiveMainLink(link.path || '');
        }}
        data-active={link.path === activeMainLink || undefined}
      >
        <Group gap="xs" px="md" py="xs">
          <FontIcons name={link.icon} size={18} />
          <Title order={6}>{link.name}</Title>
        </Group>
      </UnstyledButton>
    );
  });

  return (
    <Group align="center" gap="sm" h="100%">
      {items}
    </Group>
  );
}
