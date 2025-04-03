import { TreeMenuDataDto } from '@/client';
import FontIcons from '@/components/FontIcons';
import { ActionIcon, Box, Card, Flex, Group, Title } from '@mantine/core';
import { IconChevronRight, IconEdit, IconTrash } from '@tabler/icons-react';

type MainMenuProps = {
  data: TreeMenuDataDto;
  checked?: boolean;
};

const MainMenu = (props: MainMenuProps) => {
  const { data, checked = true } = props;
  return (
    <Box pos="relative">
      {checked && (
        <Box
          pos="absolute"
          right={-24}
          top="50%"
          h={24}
          style={{
            transform: 'translateY(-50%)',
          }}
        >
          <IconChevronRight />
        </Box>
      )}
      <Card radius="md" style={{ cursor: 'pointer' }} bg="primary">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="sm">
            <FontIcons name={data.icon || ''} style={{ fontSize: 18 }} />
            <Title order={6}>{data.name}</Title>
          </Flex>
          <div>
            <ActionIcon variant="transparent">
              <IconEdit size="18" />
            </ActionIcon>
            <ActionIcon variant="transparent" color="red">
              <IconTrash size="18" />
            </ActionIcon>
          </div>
        </Flex>
      </Card>
    </Box>
  );
};
export default MainMenu;
