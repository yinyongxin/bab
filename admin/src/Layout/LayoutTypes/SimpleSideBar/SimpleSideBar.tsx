import {
  AppShell,
  Code,
  Group,
  ScrollArea,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import classes from './SimpleSideBar.module.css';
import NavbarLinksGroup from '../../NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '@/components/UserButton/UserButton';
import Views from '../../Views';
import appConfig from '@/configs/app.config';
import { useDisclosure } from '@mantine/hooks';

export default function SimpleSideBar() {
  const theme = useMantineTheme();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { colorScheme } = useMantineColorScheme();
  const simpleSideBarContent = (
    <nav className={classes.navbar}>
      <header className={classes.header}>
        <Group justify="space-between" gap="md">
          <img width={40} alt="Logo" src={appConfig.logo} />
          <Title order={5} flex={1}>
            {appConfig.name}
          </Title>
          <Code fw={700}>{appConfig.version}</Code>
        </Group>
      </header>

      <ScrollArea className={classes.links}>
        <main className={classes.linksInner}>
          <NavbarLinksGroup />
        </main>
      </ScrollArea>

      <footer className={classes.footer}>
        <UserButton />
      </footer>
    </nav>
  );

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Navbar>{simpleSideBarContent}</AppShell.Navbar>
      <AppShell.Main
        bg={
          colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
        }
      >
        <Views />
      </AppShell.Main>
    </AppShell>
  );
}
