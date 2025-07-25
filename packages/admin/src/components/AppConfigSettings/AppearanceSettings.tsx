import {
  setDefaultRadius,
  setPrimaryColor,
  useAppDispatch,
  useAppSelector,
} from '@/store';
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
  Divider,
  Slider,
  Space,
} from '@mantine/core';
import { IconBrightnessAuto, IconMoon, IconSun } from '@tabler/icons-react';
import { sizeMarks } from './constants';

const AppearanceSettings = () => {
  const { defaultRadius } = useAppSelector((state) => state.appTheme);
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
                <IconMoon size={38} />
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
      <Divider />
      <Title order={5}>主题颜色</Title>
      <Grid>
        {colors.map((color) => {
          return (
            <Grid.Col span={2} key={color}>
              <Stack align="center" w="100%">
                <Paper
                  w="100%"
                  withBorder
                  className={
                    theme.primaryColor === color ? 'outline-check' : undefined
                  }
                  onClick={() => dispatch(setPrimaryColor(color))}
                >
                  <Center h="50">
                    <ColorSwatch color={theme.colors[color][5]} />
                  </Center>
                </Paper>
                <Title order={6}>{color}</Title>
              </Stack>
            </Grid.Col>
          );
        })}
      </Grid>
      <Divider />
      <Title order={5}>默认圆角</Title>
      <Slider
        label={(val) => sizeMarks.find((mark) => mark.value === val)!.label}
        step={25}
        defaultValue={
          sizeMarks.find((item) => item.label === defaultRadius)?.value
        }
        onChange={(val) => {
          const newRadius = sizeMarks.find((item) => item.value === val)!.label;
          dispatch(setDefaultRadius(newRadius));
        }}
        value={sizeMarks.find((item) => item.label === defaultRadius)?.value}
        marks={sizeMarks}
      />
      <Space h="xl" />
    </Stack>
  );
};

export default AppearanceSettings;
