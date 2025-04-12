import { SexEnum } from '@/client';
import { Option } from '@/@types';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';

const iconProps = {
  stroke: 1.5,
  opacity: 0.6,
  size: 18,
};

export const sexIcons: Record<SexEnum, React.ReactNode> = {
  Male: <IconGenderMale color="blue" {...iconProps} />,
  Female: <IconGenderFemale color="red" {...iconProps} />,
};

export const sexOptions: Option<SexEnum>[] = [
  {
    label: '男',
    value: 'Male',
    icon: sexIcons.Male,
    renderContent: (
      <Group gap="xs">
        {sexIcons.Male}
        <Text>男</Text>
      </Group>
    ),
  },
  {
    label: '女',
    value: 'Female',
    icon: sexIcons.Female,
    renderContent: (
      <Group gap="xs">
        {sexIcons.Female}
        <Text>女</Text>
      </Group>
    ),
  },
];

export const sexOptionsObj = sexOptions.reduce(
  (acc, cur) => {
    acc[cur.value] = cur;
    return acc;
  },
  {} as Record<SexEnum, Option<SexEnum>>,
);
