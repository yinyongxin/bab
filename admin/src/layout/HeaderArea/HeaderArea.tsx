import { Avatar, Box, Center, Group, rem } from '@mantine/core';
import LogoArea from '../LogoArea';
import { UserButton } from '@/components/UserButton/UserButton';
import { useAppSelector } from '@/store';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { LayoutTypes } from '@/@types/layout';
import MegaMenu from './MegaMenu/MegaMenu';

const HeaderArea = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { layoutType } = useAppSelector((state) => state.appConfig);
  const getCenter = () => {
    if (layoutType === LayoutTypes.Top) {
      return <MegaMenu />;
    }
  };
  return (
    <Group h="100%">
      <LogoArea />
      <Box flex={1} h="100%">
        {getCenter()}
      </Box>
      <Group justify="flex-end" pr="md" h="100%" align="center" w={rem(300)}>
        <ColorSchemeToggle />
        <UserButton position="bottom-end">
          <Center h="100%">
            <Avatar src={user.avatar} radius="md" />
          </Center>
        </UserButton>
      </Group>
    </Group>
  );
};

export default HeaderArea;
