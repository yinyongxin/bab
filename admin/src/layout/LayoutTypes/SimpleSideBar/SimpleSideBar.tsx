import {
  AppShell,
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
import appConfig from '@/configs/app.config';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { getFilePath } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store';
import { setAppConfig } from '@/store/slices/appConfig';
export default function SimpleSideBar() {
  const appConfig = useAppSelector((state) => state.appConfig);
  const dispatch = useAppDispatch();
  const toggleDesktop = () => {
    dispatch(
      setAppConfig({
        desktop: !appConfig.desktop,
      }),
    );
  };
  return (
    <>
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
              transform: appConfig.desktop ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Center>
      </UnstyledButton>
    </>
  );
}
