import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  IconEdit,
  IconGripVertical,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import cx from 'clsx';
import { ActionIcon, Button, Flex, Modal, Text, Title } from '@mantine/core';
import {
  useDidUpdate,
  useDisclosure,
  useListState,
  useShallowEffect,
} from '@mantine/hooks';
import classes from './MenuList.module.css';
import {
  MenuTypeEnum,
  MenusResultDto,
  menusControllerDeleteByIds,
  menusControllerGetAllByFilter,
  menusControllerUpdateOne,
} from '@/client';
import { useState } from 'react';
import FontIcons from '@/components/FontIcons';
import { modals } from '@mantine/modals';
import UpdataMenu from '../UpdataMenu';
type MenuListProps = {
  parentData?: MenusResultDto;
  currentChecked?: MenusResultDto;
  onChecked?: (data: MenusResultDto) => void;
  menuType: MenuTypeEnum;
};
export function MenuList(props: MenuListProps) {
  const { currentChecked, onChecked, parentData, menuType } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [state, handlers] = useListState<MenusResultDto>([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const getData = async () => {
    const menuRes = await menusControllerGetAllByFilter({
      body: {
        parent: parentData?._id || '',
      },
    });
    if (menuRes.data) {
      handlers.setState(menuRes.data);
      onChecked?.(menuRes.data[0]);
    }
  };

  useShallowEffect(() => {
    getData();
  }, [parentData]);

  const deleteById = async (id: string) => {
    modals.openConfirmModal({
      title: '确认删除当前角色？',
      centered: true,
      children: <Text size="sm">请注意，删除角色后，将无法恢复。</Text>,
      labels: { confirm: '删除', cancel: '取消' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await menusControllerDeleteByIds({
          body: {
            ids: [id],
          },
        });
        getData();
      },
    });
  };

  const items = state.map((item, index) => (
    <Draggable key={item._id} index={index} draggableId={item._id}>
      {(provided, snapshot) => (
        <Flex
          gap="sm"
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
            [classes.itemChecked]: currentChecked?._id === item._id,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={() => {
            onChecked?.(item);
          }}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          <FontIcons name={item?.icon || ''} style={{ fontSize: 40 }} />
          <Flex direction="column" flex={1}>
            <Title order={6} lineClamp={1}>
              {item.name}
            </Title>
            <Text c="dimmed" size="sm" lineClamp={1}>
              {item.description}
            </Text>
          </Flex>
          <Flex align="center">
            <ActionIcon
              size="xl"
              variant="transparent"
              onClick={(e) => {
                e.stopPropagation();
                setTitle('新增菜单');
                setId(item._id);
                open();
              }}
            >
              <IconEdit size="70%" />
            </ActionIcon>
            <ActionIcon
              size="xl"
              variant="transparent"
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                deleteById(item._id);
              }}
            >
              <IconTrash size="70%" />
            </ActionIcon>
          </Flex>
        </Flex>
      )}
    </Draggable>
  ));

  const updateSort = async () => {
    const sortChangeList = state
      .map(async (item, index) => {
        if (item.sort !== index) {
          handlers.setItem(index, { ...item, sort: index });
          return menusControllerUpdateOne({
            body: {
              sort: index,
            },
            query: {
              id: item._id,
            },
          });
        }
        return undefined;
      })
      .filter(Boolean);
    if (sortChangeList.length) {
      await Promise.all(sortChangeList);
    }
  };

  useDidUpdate(() => {
    updateSort();
  }, [state.map((item) => item.sort).join('-')]);

  return (
    <>
      <Flex direction="column" gap="md">
        <Button
          fullWidth
          leftSection={<IconPlus />}
          onClick={() => {
            setTitle('新增');
            open();
          }}
        >
          新增
        </Button>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            handlers.reorder({
              from: source.index,
              to: destination?.index || 0,
            });
          }}
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Flex>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          if (id) {
            setId('');
          }
        }}
        title={title}
        centered
      >
        <UpdataMenu
          menuType={menuType}
          parentData={parentData}
          sort={state[state.length - 1]?.sort + 1 || 0}
          id={id}
          onSuccess={() => {
            close();
            getData();
          }}
        />
      </Modal>
    </>
  );
}
