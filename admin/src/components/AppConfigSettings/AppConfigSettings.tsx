import { ScrollArea, SegmentedControl, Stack } from '@mantine/core';
import ColorSettings from './ColorSettings';
import LayoutSetting from './LayoutSetting';
import { useState } from 'react';

const AppConfigSettings = () => {
  const [value, setValue] = useState('layout');
  const options = [
    {
      label: '布局',
      value: 'layout',
      content: <LayoutSetting />,
    },
    {
      label: '颜色',
      value: 'color',
      content: <ColorSettings />,
    },
    {
      label: '其他',
      value: 'other',
      content: <ColorSettings />,
    },
  ];
  return (
    <Stack>
      <SegmentedControl
        pos="sticky"
        size="md"
        top={0}
        fullWidth
        value={value}
        onChange={setValue}
        data={options.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
      />
      {options.find((option) => option.value === value)?.content}
    </Stack>
  );
};

export default AppConfigSettings;
