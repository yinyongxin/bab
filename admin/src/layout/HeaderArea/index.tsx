import { Avatar, Box, Center, Group, Text } from '@mantine/core';
import LogoArea from '../LogoArea';
import { UserButton } from '@/components/UserButton/UserButton';
import { useAppSelector } from '@/store';

const HeaderArea = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Group h="100%">
      <LogoArea />
      <Box flex={1}></Box>
      <Group pr="md" h="100%" align="center">
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
