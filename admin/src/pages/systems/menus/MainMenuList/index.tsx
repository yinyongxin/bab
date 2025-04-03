import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  IconEdit,
  IconGripVertical,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import cx from 'clsx';
import { ActionIcon, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure, useListState, useShallowEffect } from '@mantine/hooks';
import classes from './MainMenuList.module.css';
import {
  MenusResultDto,
  menusControllerDeleteByIds,
  menusControllerGetAllByFilter,
} from '@/client';
import { useEffect, useState } from 'react';
import FontIcons from '@/components/FontIcons';
import UpdataMainMenu from './UpdataMainMenu';
import { modals } from '@mantine/modals';

export function MainMenuList() {
  const [opened, { open, close }] = useDisclosure(false);
  const [state, handlers] = useListState<MenusResultDto>([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const getData = async () => {
    const menuRes = await menusControllerGetAllByFilter({
      body: {
        parent: '',
      },
    });
    if (menuRes.data) {
      handlers.setState(menuRes.data);
    }
  };

  useShallowEffect(() => {
    getData();
  }, []);

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
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          <FontIcons name={item.icon} style={{ fontSize: 48 }} />
          <Flex direction="column" flex={1}>
            <Text>{item.name}</Text>
            <Text c="dimmed" size="sm" lineClamp={1}>
              {item.description}
            </Text>
          </Flex>
          <Flex align="center">
            <ActionIcon
              variant="transparent"
              onClick={() => {
                setTitle('新增菜单');
                setId(item._id);
                open();
              }}
            >
              <IconEdit size="18" />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              color="red"
              onClick={() => deleteById(item._id)}
            >
              <IconTrash size="18" />
            </ActionIcon>
          </Flex>
        </Flex>
      )}
    </Draggable>
  ));

  return (
    <>
      <Flex direction="column" gap="md">
        <Button
          fullWidth
          leftSection={<IconPlus />}
          onClick={() => {
            setTitle('新增菜单');
            open();
          }}
        >
          新增
        </Button>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            console.log(destination, source);
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
        <UpdataMainMenu
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
