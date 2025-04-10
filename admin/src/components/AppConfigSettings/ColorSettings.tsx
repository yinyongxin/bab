import { setPrimaryColor, useAppDispatch } from '@/store';
import {
  Center,
  ColorSwatch,
  Grid,
  Paper,
  Stack,
  Title,
  useMantineColorScheme,
  useMantineTheme,
  DefaultMantineColor,
} from '@mantine/core';
import { IconBrightnessAuto, IconSun } from '@tabler/icons-react';
import { V } from 'vitest/dist/chunks/reporters.d.CqBhtcTq';

const ColorSettings = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const colors = Object.keys(theme.colors) as DefaultMantineColor[];
  return (
    <Stack>
      <Title order={5}>主题模式</Title>
      <Grid>
        <Grid.Col span={4}>
          <Stack align="center" w="100%">
            <Paper
              w="100%"
              withBorder
              className={colorScheme === 'light' ? 'outline-check' : undefined}
              onClick={() => setColorScheme('light')}
            >
              <Center h="80">
                <IconSun size={38} />
              </Center>
            </Paper>
            <Title order={6}>浅色模式</Title>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack align="center" w="100%">
            <Paper
              w="100%"
              withBorder
              className={colorScheme === 'dark' ? 'outline-check' : undefined}
              onClick={() => setColorScheme('dark')}
            >
              <Center h="80">
                <IconSun size={38} />
              </Center>
            </Paper>
            <Title order={6}>浅色模式</Title>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack align="center" w="100%">
            <Paper
              w="100%"
              withBorder
              className={colorScheme === 'auto' ? 'outline-check' : undefined}
              onClick={() => setColorScheme('auto')}
            >
              <Center h="80">
                <IconBrightnessAuto size={38} />
              </Center>
            </Paper>
            <Title order={6}>跟随系统</Title>
          </Stack>
        </Grid.Col>
      </Grid>
      <Title order={5}>主题颜色</Title>
      <Grid>
        {colors.map((color) => {
          return (
            <Grid.Col span={3} key={color}>
              <Stack align="center" w="100%">
                <Paper
                  w="100%"
                  withBorder
                  className={
                    theme.primaryColor === color ? 'outline-check' : undefined
                  }
                  onClick={() => dispatch(setPrimaryColor(color))}
                >
                  <Center h="80">
                    <ColorSwatch color={theme.colors[color][5]} />
                  </Center>
                </Paper>
                <Title order={6}>{color}</Title>
              </Stack>
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default ColorSettings;
