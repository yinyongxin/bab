import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Group,
  Tooltip,
  rem,
} from '@mantine/core';
import LogoArea from '../LogoArea';
import { UserButton } from '@/layout/UserButton/UserButton';
import { useAppSelector } from '@/store';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { LayoutTypes } from '@/@types/layout';
import MegaMenu from './MegaMenu/MegaMenu';
import SimpleMenu from './SimpleMenu/SimpleMenu';
import { IconMinimize, IconMaximize, IconSearch } from '@tabler/icons-react';
import { useFullscreen } from '@mantine/hooks';
import { spotlight } from '@mantine/spotlight';
const HeaderContent = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { layoutType } = useAppSelector((state) => state.appConfig);
  const { toggle, fullscreen } = useFullscreen();
  const getCenter = () => {
    if (layoutType === LayoutTypes.Top) {
      return <MegaMenu />;
    } else if (layoutType === LayoutTypes.TopSide) {
      return <SimpleMenu />;
    }
    return null;
  };
  return (
    <Group h="100%" gap="xl">
      <LogoArea />
      <Box flex={1} h="100%">
        {getCenter()}
      </Box>
      <Group
        justify="flex-end"
        mr="md"
        gap={0}
        h="100%"
        align="center"
        w={rem(300)}
      >
        <Group gap="xs" mr="sm">
          <Tooltip key="fullscreen" label="搜索 ⌘K">
            <ActionIcon
              size="md"
              key="spotlight"
              onClick={spotlight.open}
              variant="subtle"
            >
              <IconSearch />
            </ActionIcon>
          </Tooltip>
          <Tooltip key="fullscreen" label={fullscreen ? '取消全屏' : '全屏'}>
            <ActionIcon
              size="md"
              key="fullscreen"
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
