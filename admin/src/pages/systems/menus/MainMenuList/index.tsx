import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  IconEdit,
  IconGripVertical,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import cx from 'clsx';
import { ActionIcon, Button, Flex, Text } from '@mantine/core';
import { useListState, useShallowEffect } from '@mantine/hooks';
import classes from './MainMenuList.module.css';
import { MenusResultDto, menusControllerGetAllByFilter } from '@/client';
import { useState } from 'react';
import FontIcons from '@/components/FontIcons';

export function MainMenuList() {
  const [state, handlers] = useListState<MenusResultDto>([]);
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
            <ActionIcon variant="transparent">
              <IconEdit size="18" />
            </ActionIcon>
            <ActionIcon variant="transparent" color="red">
              <IconTrash size="18" />
            </ActionIcon>
          </Flex>
        </Flex>
      )}
    </Draggable>
  ));

  return (
    <Flex direction="column" gap="md">
      <Button fullWidth leftSection={<IconPlus />}>
        新增
      </Button>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
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
  );
}
