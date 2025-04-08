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
  Image,
} from '@mantine/core';
import NavbarLinksGroup from '../../NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '@/components/UserButton/UserButton';
import Views from '../../Views';
import appConfig from '@/configs/app.config';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { getFilePath } from '@/utils';

export default function SimpleSideBar() {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
            <Image
              w="30"
              h="30"
              radius="sm"
              alt="Logo"
              src={getFilePath(appConfig.logo)}
            />
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
      <AppShell.Main bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
        <Box>
          <Views />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
