import { Stack } from '@mantine/core';
import FloatingTabs from '../FloatingTabs';
import LayoutSetting from './LayoutSetting';

const AppConfigSettings = () => {
  return (
    <Stack>
      <FloatingTabs
        options={[
          {
            label: '布局配置',
            value: 'layout',
            content: <LayoutSetting />,
          },
          {
            label: '颜色配置',
            value: 'color',
            content: 'color',
          },
        ]}
      />
    </Stack>
  );
};

export default AppConfigSettings;
