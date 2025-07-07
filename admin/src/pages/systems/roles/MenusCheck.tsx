import {
  menusControllerGetAllByFilter,
  MenusResultDto,
  rolesControllerUpdateOne,
  RolesResultDto,
} from '@/client';
import { ActionsGrid } from '@/components/ActionsGrid/ActionsGrid';
import FontIcons from '@/components/FontIcons';
import {
  Button,
  Checkbox,
  getTreeExpandedState,
  Group,
  RenderTreeNodePayload,
  ScrollArea,
  Stack,
  Tree,
  TreeNodeData,
  useTree,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconChevronDown,
  IconExclamationCircle,
  IconListCheck,
  IconListDetails,
} from '@tabler/icons-react';
import { useState } from 'react';

const renderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  return (
    <Group gap="xs" my="xs" {...elementProps}>
      <Group gap={5}>
        <Stack gap="xs">
          <Group>
            <Checkbox.Indicator
              checked={checked}
              indeterminate={indeterminate}
              onClick={() =>
                !checked
                  ? tree.checkNode(node.value)
                  : tree.uncheckNode(node.value)
              }
            />
            <Group gap="xs" onClick={() => tree.toggleExpanded(node.value)}>
              <FontIcons
                name={node.nodeProps?.icon || ''}
                style={{ fontSize: 18 }}
              />
              <span>{node.label}</span>

              {hasChildren && (
                <IconChevronDown
                  size={14}
                  style={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              )}
            </Group>
          </Group>
        </Stack>
      </Group>
    </Group>
  );
};

const buildMenusCheckTree = (
  list: MenusResultDto[],
  parent?: string,
): TreeNodeData[] => {
  return list
    .filter((itemAuthMenu) => itemAuthMenu.parent === parent)
    .map((menu) => ({
      nodeProps: menu,
      label: menu.name,
      value: menu._id,
      children: buildMenusCheckTree(list, menu._id),
    }));
};
type MenusCheckProps = {
  roleData?: RolesResultDto;
  onSuccess?: (menus: string[]) => void;
};
const MenusCheck = (props: MenusCheckProps) => {
  const { roleData, onSuccess } = props;
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [saving, savingAition] = useDisclosure(false);

  const getAllMenus = async () => {
    const getAllMenusRes = await menusControllerGetAllByFilter({
      body: {},
    });
    if (getAllMenusRes.data) {
      const newTreeData = buildMenusCheckTree(getAllMenusRes.data, '');
      setTreeData(newTreeData);
      if (roleData) {
        tree.setCheckedState(roleData?.menus || []);
        tree.setExpandedState(getTreeExpandedState(newTreeData, '*'));
      }
    }
  };
  useShallowEffect(() => {
    getAllMenus();
  }, []);

  const updateRoleMenus = async () => {
    if (!roleData) {
      return;
    }
    try {
      savingAition.open();

      const menus = tree.getCheckedNodes().map((item) => item.value);
      const updataRes = await rolesControllerUpdateOne({
        query: {
          id: roleData._id,
        },
        body: {
          menus,
        },
      });
      if (updataRes?.error) {
        notifications.show({
          color: 'red',
          title: '提示',
          message: '更新失败',
          icon: <IconExclamationCircle />,
        });
        return;
      }
      onSuccess?.(menus);
      notifications.show({
        color: 'green',
        title: '提示',
        message: '更新成功',
        icon: <IconCheck />,
      });
    } finally {
      savingAition.close();
    }
  };

  const tree = useTree();

  return (
    <Stack gap="md" flex={1}>
      <ScrollArea flex={1}>
        <Tree
          flex={1}
          tree={tree}
          data={treeData}
          expandOnClick={false}
          renderNode={renderTreeNode}
        />
      </ScrollArea>
      <ActionsGrid
        serverList={[
          {
            title: '选择全部',
            icon: IconListCheck,
            color: 'violet',
            onClick: () => tree.checkAllNodes(),
          },
          {
            title: '取消全部选择',
            icon: IconListDetails,
            color: 'red',
            onClick: () => tree.uncheckAllNodes(),
          },
        ]}
      />
      <Button
        fullWidth
        color="green"
        size="md"
        loading={saving}
        onClick={() => {
          updateRoleMenus();
        }}
      >
        保存
      </Button>
    </Stack>
  );
};

export default MenusCheck;
