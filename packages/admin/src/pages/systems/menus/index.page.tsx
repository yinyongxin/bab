import Page from '@/components/Page/Page';
import { Grid } from '@mantine/core';
import { useState } from 'react';
import { MenuList } from './MenuList/MenuList';
import { MenuTypeEnum, MenusResultDto } from '@/client';

export default () => {
  const [checked, setChecked] = useState<
    Partial<Record<MenuTypeEnum, MenusResultDto>>
  >({
    [MenuTypeEnum.DIRECTORY]: undefined,
    [MenuTypeEnum.PAGE]: undefined,
  });

  return (
    <Page
      style={{
        height: '100%',
      }}
    >
      <Grid>
        <Grid.Col span={4}>
          <MenuList
            menuType={MenuTypeEnum.DIRECTORY}
            currentChecked={checked[MenuTypeEnum.DIRECTORY]}
            onChecked={(value) => {
              setChecked({
                ...checked,
                [MenuTypeEnum.DIRECTORY]: value,
              });
            }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          {checked[MenuTypeEnum.DIRECTORY] && (
            <MenuList
              menuType={MenuTypeEnum.PAGE}
              currentChecked={checked[MenuTypeEnum.PAGE]}
              parentData={checked[MenuTypeEnum.DIRECTORY]}
              onChecked={(value) => {
                setChecked({
                  ...checked,
                  [MenuTypeEnum.PAGE]: value,
                });
              }}
            />
          )}
        </Grid.Col>
        <Grid.Col span={4}>
          {checked[MenuTypeEnum.PAGE] && (
            <MenuList
              menuType={MenuTypeEnum.FUNCTION_AREA}
              currentChecked={checked[MenuTypeEnum.FUNCTION_AREA]}
              parentData={checked[MenuTypeEnum.PAGE]}
            />
          )}
        </Grid.Col>
      </Grid>
    </Page>
  );
};
