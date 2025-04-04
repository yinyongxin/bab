import { useState } from 'react';
import { Checkbox, Group } from '@mantine/core';
import { MenusResultDto } from '@/client';
import { init } from 'i18next';

const data: {
  label: string;
  value: string;
  description: string;
  color: string;
}[] = [
  {
    label: '增加',
    value: 'Create',
    description: '拥有页面的创建权限',
    color: 'green',
  },
  {
    value: 'Delete',
    description: '拥有页面的删除权限',
    label: '删除',
    color: 'red',
  },
  {
    value: 'Update',
    description: '拥有页面的删除权限',
    label: '更新',
    color: 'orange',
  },
  {
    value: 'Query',
    description: '拥有页面的删除权限',
    label: '查询',
    color: 'blue',
  },
];

type PageAuthorityCheckGroupProps = {
  initialValue?: MenusResultDto['pageAuthority'];
};
function PageAuthorityCheckGroup(props: PageAuthorityCheckGroupProps) {
  const { initialValue = [] } = props;
  const [value, setValue] =
    useState<MenusResultDto['pageAuthority']>(initialValue);

  const cards = data.map((item) => (
    <Checkbox
      label={item.label}
      value={item.value}
      key={item.value}
      c={item.color}
      color={item.color}
    />
  ));

  return (
    <>
      <Checkbox.Group
        value={value}
        onChange={(nuwValue) =>
          setValue(nuwValue as MenusResultDto['pageAuthority'])
        }
      >
        <Group gap="xs">{cards}</Group>
      </Checkbox.Group>
    </>
  );
}

export default PageAuthorityCheckGroup;
