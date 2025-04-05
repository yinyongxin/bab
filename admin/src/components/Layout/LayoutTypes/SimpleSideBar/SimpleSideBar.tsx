import {
  Box,
  Code,
  Group,
  ScrollArea,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import classes from './SimpleSideBar.module.css';
import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '@/components/UserButton/UserButton';
import { useAppSelector } from '@/store';
import Views from '../../Views';
import appConfig from '@/configs/app.config';
function SimpleSideBarContent() {
  const { navigationTree = [] } = useAppSelector((state) => state.auth.menus);
  const links = navigationTree.map((item) => (
    <LinksGroup {...item} key={item.key} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between" gap="md">
          <img width={40} alt="Logo" src={appConfig.logo} />
          <Title order={5} flex={1}>
            {appConfig.name}
          </Title>
          <Code fw={700}>{appConfig.version}</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}

export default () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <Box
      bg={colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flex: '1 1 auto',
        height: '100vh',
      }}
    >
      <SimpleSideBarContent />
      <Box
        style={{
          padding: '1rem',
          flex: 1,
          overflow: 'auto',
        }}
      >
        <Views />
      </Box>
    </Box>
  );
};
