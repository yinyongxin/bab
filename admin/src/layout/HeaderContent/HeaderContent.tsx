import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Group,
  Tooltip,
  rem,
  Text,
  Button,
} from '@mantine/core';
import LogoArea from '../LogoArea';
import { UserButton } from '@/layout/UserButton/UserButton';
import { useAppSelector } from '@/store';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { LayoutTypes } from '@/@types/layout';
import MegaMenu from './MegaMenu/MegaMenu';
import SimpleMenu from './SimpleMenu/SimpleMenu';
import {
  IconMinimize,
  IconMaximize,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react';
import { useFullscreen } from '@mantine/hooks';
import { spotlight } from '@mantine/spotlight';
import { useContext, useMemo } from 'react';
import LayoutContext from '../LayoutContext';
const HeaderContent = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { layoutType } = useAppSelector((state) => state.appConfig);
  const { openAppSettings } = useContext(LayoutContext);
  const { toggle, fullscreen } = useFullscreen();
  const center = useMemo(() => {
    if (layoutType === LayoutTypes.Top) {
      return <MegaMenu />;
    } else if (layoutType === LayoutTypes.TopSide) {
      return <SimpleMenu />;
    }
    return null;
  }, [layoutType]);
  return (
    <Group h="100%" gap="xl">
      <LogoArea />
      <Box flex={1} h="100%">
        {center}
      </Box>
      <Group
        justify="flex-end"
        mr="md"
        gap={0}
        h="100%"
        align="center"
        w={rem(300)}
      >
        <Group flex={1} gap="xs" mr="sm">
          <Button
            flex={1}
            styles={{ inner: { width: '100%' }, label: { width: '100%' } }}
            variant="light"
            px="sm"
            onClick={spotlight.open}
          >
            <Group w="100%" justify="space-between">
              <IconSearch size="16" />
              <Text size="xs">⌘ K</Text>
            </Group>
          </Button>
          <Tooltip label="设置">
            <ActionIcon
              size="md"
              onClick={() => {
                openAppSettings();
              }}
              variant="subtle"
            >
              <IconSettings />
            </ActionIcon>
          </Tooltip>
          <Tooltip label={fullscreen ? '取消全屏' : '全屏'}>
            <ActionIcon
              size="md"
              onClick={() => {
                toggle();
              }}
              variant="subtle"
            >
              {fullscreen ? <IconMinimize /> : <IconMaximize />}
            </ActionIcon>
          </Tooltip>
          <ColorSchemeToggle />
        </Group>
        <UserButton position="bottom-end">
          <Center h="100%">
            <Avatar src={user.avatar} size="md" radius="md" />
          </Center>
        </UserButton>
      </Group>
    </Group>
  );
};

export default HeaderContent;
