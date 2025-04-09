import { Box, Group, Text } from '@mantine/core';
import LogoArea from '../LogoArea';
import { UserButton } from '@/components/UserButton/UserButton';

const HeaderArea = () => {
  return (
    <Group h="100%">
      <LogoArea />
      <Box flex={1}></Box>
      <Group pr="md">
        <UserButton>
          <Text>aasdasd</Text>
        </UserButton>
      </Group>
    </Group>
  );
};

export default HeaderArea;
