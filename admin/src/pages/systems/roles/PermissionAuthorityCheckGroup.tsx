import { Checkbox, CheckboxGroupProps, Group } from '@mantine/core';
import { RolesResultDto } from '@/client';

const data: {
  label: string;
  value: RolesResultDto['permissionAuthority'][0];
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

type PermissionAuthorityCheckGroupProps = {
  checkboxGroupProps?: Omit<CheckboxGroupProps, 'children'>;
};
function PermissionAuthorityCheckGroup(
  props: PermissionAuthorityCheckGroupProps,
) {
  const { checkboxGroupProps } = props;
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
      <Checkbox.Group {...checkboxGroupProps}>
        <Group gap="xs">{cards}</Group>
      </Checkbox.Group>
    </>
  );
}

export default PermissionAuthorityCheckGroup;
