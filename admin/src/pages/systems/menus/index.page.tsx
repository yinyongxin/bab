import Page from '@/components/Page';
import { Grid } from '@mantine/core';
import { useState } from 'react';
import { MenuList } from './MenuList/MenuList';
import { MenusResultDto } from '@/client';

export default () => {
  const [checkedList, setCheckedList] = useState<MenusResultDto[]>([]);

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
      <Grid>
        <Grid.Col span={4}>
          <MenuList
            onChecked={(value) => {
              setCheckedList([value]);
            }}
            checkedList={checkedList}
            level={0}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          {checkedList[0] && (
            <MenuList
              checkedList={checkedList}
              level={1}
              parentData={checkedList[0]}
            />
          )}
        </Grid.Col>
      </Grid>
    </Page>
  );
};
