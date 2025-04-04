import Page from '@/components/Page';
import { Box, Flex } from '@mantine/core';
import { useState } from 'react';
import { MainMenuList } from './MainMenuList';
import { SubMenuList } from './SubMenuList';
import { MenusResultDto } from '@/client';

export default () => {
  const [parentData, setParentData] = useState<MenusResultDto>();

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
          <MainMenuList setParentData={setParentData} parentData={parentData} />
        </Box>
        <Box flex={2}>
          <SubMenuList parentData={parentData} />
        </Box>
      </Flex>
    </Page>
  );
};
