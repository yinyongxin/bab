import Page from '@/components/Page';
import { Box, Flex } from '@mantine/core';
import { useState } from 'react';
import { MainMenuList } from './MainMenuList';

export default () => {
  const [current, setCurrent] = useState<string>();

  return (
    <Page
      style={{
        height: '100%',
      }}
      title="菜单管理"
      contentProps={{
        p: 0,
        bg: 'transparent',
      }}
    >
      <Flex h="100%" gap="xl">
        <Box flex={1}>
          <MainMenuList />
        </Box>
        <Box flex={2}>
        <MainMenuList />
        </Box>
      </Flex>
    </Page>
  );
};
