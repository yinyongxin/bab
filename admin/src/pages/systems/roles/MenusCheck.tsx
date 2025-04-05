import { menusControllerGetAllByFilter } from '@/client';
import FontIcons from '@/components/FontIcons';
import {
  Button,
  Checkbox,
  getTreeExpandedState,
  Group,
  RenderTreeNodePayload,
  Tree,
  TreeNodeData,
  useTree,
} from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
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
const MenusCheck = () => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
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
    }
  };
  useShallowEffect(() => {
    getAllMenus();
  }, []);
  const tree = useTree({
    initialExpandedState: getTreeExpandedState(treeData, '*'),
    initialCheckedState: [],
  });

  return (
    <>
      <Group mb="md">
        <Button onClick={() => tree.checkAllNodes()}>选择全部</Button>
        <Button color='red' onClick={() => tree.uncheckAllNodes()}>清除全部选择</Button>
      </Group>

      <Tree
        tree={tree}
        data={treeData}
        levelOffset={23}
        expandOnClick={false}
        renderNode={renderTreeNode}
      />
    </>
  );
};

export default MenusCheck;
