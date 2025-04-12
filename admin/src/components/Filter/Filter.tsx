import {
  ActionIcon,
  Button,
  Group,
  Popover,
  Space,
  UnstyledButton,
} from '@mantine/core';
import { IconCheck, IconFilter, IconX } from '@tabler/icons-react';
import { FormEvent, ReactNode, useState } from 'react';
type FilterProps = {
  target?: ReactNode;
  children?: ReactNode;
  onCancel?: () => void | boolean;
  onConfirm?: (e: FormEvent<HTMLFormElement>, close: () => void) => void;
};
const Filter = (props: FilterProps) => {
  const { target, children, onConfirm, onCancel } = props;
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={320}
      shadow="md"
      position="bottom-end"
      withOverlay
      overlayProps={{ blur: '8px' }}
    >
      <Popover.Target>
        {target ? (
          <UnstyledButton onClick={() => setOpened((o) => !o)}>
            {target}
          </UnstyledButton>
        ) : (
          <ActionIcon
            variant="light"
            size="input-sm"
            onClick={() => setOpened((o) => !o)}
          >
            <IconFilter />
          </ActionIcon>
        )}
      </Popover.Target>
      <Popover.Dropdown>
        <form onSubmit={(e) => onConfirm?.(e, () => setOpened(false))}>
          <Group>
            <Button
              type="submit"
              leftSection={<IconCheck size={16} />}
              flex={4}
              onClick={() => {
                setOpened(false);
              }}
              variant="light"
            >
              确定
            </Button>
            <Button
              leftSection={<IconX size={16} />}
              flex={2}
              onClick={() => {
                onCancel?.();
                setOpened(false);
              }}
              color="red"
              variant="light"
            >
              取消
            </Button>
          </Group>
          <Space h="md" />
          {children}
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Filter;
