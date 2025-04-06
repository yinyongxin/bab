import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  IconEdit,
  IconGripVertical,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import cx from 'clsx';
import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Text,
  Title,
} from '@mantine/core';
import {
  useDidUpdate,
  useDisclosure,
  useListState,
  useShallowEffect,
} from '@mantine/hooks';
import classes from './SubMenuList.module.css';
import {
  MenusResultDto,
  menusControllerDeleteByIds,
  menusControllerGetAllByFilter,
  menusControllerUpdateOne,
} from '@/client';
import { useState } from 'react';
import UpdataSubMenu from './UpdataSubMenu';
import { modals } from '@mantine/modals';
type SubMenuListProps = {
  parentData?: MenusResultDto;
};
export function SubMenuList(props: SubMenuListProps) {
  const { parentData } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [state, handlers] = useListState<MenusResultDto>([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const getData = async () => {
    const menuRes = await menusControllerGetAllByFilter({
      body: {
        parent: parentData?._id,
      },
    });

    if (!menuRes.error && menuRes.data) {
      handlers.setState(menuRes.data);
    }
  };

  useShallowEffect(() => {
    if (parentData) {
      getData();
    }
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
      })
      .filter(Boolean);
    if (sortChangeList.length) {
      await Promise.all(sortChangeList);
    }
  };

  useDidUpdate(() => {
    updateSort();
  }, [state.map((item) => item.sort).join('-')]);

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
          <div
            {...provided.dragHandleProps}
            className={classes.dragHandle}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          <Flex direction="column" w="120">
            <Title order={6}>{item.name}</Title>
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
          新增页面
        </Button>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            handlers.reorder({
              from: source.index,
              to: destination?.index || 0,
            });
            updateSort();
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
        }}
        title={title}
        centered
      >
        <UpdataSubMenu
          sort={state[state.length - 1]?.sort + 1 || 0}
          id={id}
          parentData={parentData}
          onSuccess={() => {
            close();
            if (id) {
              setId('');
            }
            getData();
          }}
        />
      </Modal>
    </>
  );
}
