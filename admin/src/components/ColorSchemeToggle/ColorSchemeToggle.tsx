import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './ColorSchemeToggle.module.css';
import cx from 'clsx';
export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Tooltip label="切换颜色模式">
      <ActionIcon
        onClick={() =>
          setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
        }
        size="md"
        variant="subtle"
        aria-label="切换颜色模式"
      >
        <IconSun className={cx(classes.light)} size={26} />
        <IconMoon className={cx(classes.dark)} size={24} />
      </ActionIcon>
    </Tooltip>
  );
}
