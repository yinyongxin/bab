import {
  Anchor,
  Card,
  DefaultMantineColor,
  Group,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import classes from './ActionsGrid.module.css';
import { ElementType, MouseEventHandler } from 'react';

type ActionsGridProps = {
  title?: string;
  subTitle?: string;
  cols?: number;
  serverList?: {
    title: string;
    icon: ElementType;
    color: DefaultMantineColor;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }[];
};
export function ActionsGrid(props: ActionsGridProps) {
  const { title, subTitle, serverList = [], cols = 3 } = props;
  const theme = useMantineTheme();

  const items = serverList.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={item.onClick}
    >
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Stack gap="md">
        {(title || subTitle) && (
          <Group justify="space-between">
            {title && <Text className={classes.title}>{title}</Text>}
            {subTitle && (
              <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                {subTitle}
              </Anchor>
            )}
          </Group>
        )}
        <SimpleGrid cols={cols}>{items}</SimpleGrid>
      </Stack>
    </Card>
  );
}
