import {
  menusControllerGetAllByFilter,
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
  Stack,
  Tree,
  TreeNodeData,
  useTree,
} from '@mantine/core';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconBuildingBank,
  IconCashBanknote,
  IconCheck,
  IconChevronDown,
  IconCoin,
  IconCreditCard,
  IconExclamationCircle,
  IconListCheck,
  IconListDetails,
  IconReceipt,
  IconReceiptRefund,
  IconReceiptTax,
  IconRepeat,
  IconReport,
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
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        indeterminate={indeterminate}
        onClick={() =>
          !checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value)
        }
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <FontIcons name={node.nodeProps?.icon || ''} style={{ fontSize: 18 }} />
        <span>{node.label}</span>

        {hasChildren && (
          <IconChevronDown
            size={14}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </Group>
    </Group>
  );
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
      setTreeData(
        getAllMenusRes.data
          .filter((item) => !item.parent)
          .map((item) => {
            return {
              nodeProps: item,
              label: item.name,
              value: item._id,
              children: getAllMenusRes.data
                .filter(({ parent }) => parent === item._id)
                .map((child) => {
                  return {
                    nodeProps: child,
                    label: child.name,
                    value: child._id,
                  };
                }),
            };
          }),
      );
      if (roleData) {
        tree.setCheckedState(roleData?.menus || []);
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

  const tree = useTree({
    initialExpandedState: getTreeExpandedState(treeData, '*'),
    initialCheckedState: [],
  });

  return (
    <Stack gap="md">
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

      <Tree
        tree={tree}
        data={treeData}
        levelOffset={23}
        expandOnClick={false}
        renderNode={renderTreeNode}
      />
    </Stack>
  );
};

export default MenusCheck;
