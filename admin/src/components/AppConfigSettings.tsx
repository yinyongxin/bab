import { Stack } from '@mantine/core';
import FloatingTabs from './FloatingTabs';

const AppConfigSettings = () => {
  return (
    <Stack>
      <FloatingTabs
        options={[
          {
            label: '布局配置',
            value: 'layout',
          },
          {
            label: '颜色配置',
            value: 'color',
          },
        ]}
      />
      <h1>App Config Settings</h1>
    </Stack>
  );
};

export default AppConfigSettings;
