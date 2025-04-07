import {
  AppShell,
  Box,
  Center,
  Code,
  Divider,
  Group,
  ScrollArea,
  Title,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import NavbarLinksGroup from '../../NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '@/components/UserButton/UserButton';
import Views from '../../Views';
import appConfig from '@/configs/app.config';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';

export default function SimpleSideBar() {
  const theme = useMantineTheme();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: !desktopOpened },
      }}
      padding="xl"
    >
      <AppShell.Navbar>
        <AppShell.Section>
          <Group justify="space-between" gap="md" p="md">
            <img width={40} alt="Logo" src={appConfig.logo} />
            <Title order={5} flex={1}>
              {appConfig.name}
            </Title>
            <Code fw={700}>{appConfig.version}</Code>
          </Group>
        </AppShell.Section>
        <Divider />
        <AppShell.Section grow my="md" component={ScrollArea}>
          <NavbarLinksGroup />
        </AppShell.Section>
        <Divider />
        <AppShell.Section>
          <UserButton />
        </AppShell.Section>
        <UnstyledButton
          w="xl"
          pos="absolute"
          h="100%"
          right="0"
          style={{
            transform: 'translateX(100%)',
          }}
          onClick={toggleDesktop}
        >
          <Center>
            <IconChevronRight
              style={{
                transform: desktopOpened ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </Center>
        </UnstyledButton>
      </AppShell.Navbar>
      <AppShell.Main
        bg={
          colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]
        }
      >
        <Box>
          <Views />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
