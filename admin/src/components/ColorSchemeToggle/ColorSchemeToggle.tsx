import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './ColorSchemeToggle.module.css';
import cx from 'clsx';
export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <Tooltip label="切换颜色模式">
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
        }
        size="md"
        variant="subtle"
        aria-label="切换颜色模式"
      >
        <IconSun className={cx(classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
}
