import { TreeMenuDataDto, menusControllerGetTreeData } from '@/client';
import Page from '@/components/Page';
import { Box, Flex, Grid, Paper } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useState } from 'react';
import MainMenu from './MainMenus';

export default () => {
  const [data, setDate] = useState<TreeMenuDataDto[]>();
  const [current, setCurrent] = useState<string>();
  const getData = async () => {
    const menuRes = await menusControllerGetTreeData();
    setCurrent(menuRes.data?.[0]._id);
    setDate(menuRes.data);
  };
  useShallowEffect(() => {
    getData();
  }, []);
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
        <Box w={300}>
          {data?.map((item) => {
            return <MainMenu data={item} key={item._id} />;
          })}
        </Box>
        {data
          ?.find((item) => item._id === current)
          ?.children.map((item) => {
            return item.name;
          })}
      </Flex>
    </Page>
  );
};
