import { convertToObject } from '@/utils';
import { Group, Text } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import { iconProps } from './base';
import { Option } from '@/@types';

export const admintorsStatusOptions: Option[] = [
  {
    label: '开启',
    value: 'online',
    icon: <Icon123 />,
    renderContent: (
      <Group gap="xs">
        <Icon123 color="green" {...iconProps} />
        <Text>开启</Text>
      </Group>
    ),
  },
  {
    label: '',
    value: 'b',
    icon: <Icon123 />,
    renderContent: (
      <Group gap="xs">
        <Icon123 color="red" {...iconProps} />
        <Text>关闭</Text>
      </Group>
    ),
  },
];

export const admintorsStatusOptionsObj = convertToObject(
  admintorsStatusOptions,
);
