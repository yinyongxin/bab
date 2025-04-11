import { LayoutTypes } from '@/@types/layout';
import { useAppDispatch, useAppSelector } from '@/store';
import useAppConfig from '@/store/hook/useAppConfig';
import { setAppConfig } from '@/store/slices/appConfig';
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Paper,
  Slider,
  Stack,
  Title,
} from '@mantine/core';
import React from 'react';
const CustomizePaper = (props: {
  checked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const { checked, onClick, children } = props;
  return (
    <Paper
      h="100%"
      onClick={onClick}
      style={{
        overflow: 'hidden',
        ...(checked && {
          outlineOffset: 4,
          outline: '4px solid var(--mantine-primary-color-filled)',
        }),
      }}
    >
      {children}
    </Paper>
  );
};

const LayoutSetting = () => {
  const [appConfig, updateAppConfig] = useAppConfig();

  const { layoutType } = appConfig;
  const dispatch = useAppDispatch();
  const conent = (
    <Stack h="100%" gap="xs">
      <Flex flex={1} gap="xs">
        <Paper
          bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-8))"
          flex={1}
        />
        <Paper
          bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-8))"
          flex={1}
        />
      </Flex>
      <Paper
        bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-8))"
        flex={1}
      />
    </Stack>
  );
  const typeObj: Record<LayoutTypes, React.ReactNode> = {
    [LayoutTypes.SimpleSideBar]: (
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <CustomizePaper
            checked={layoutType === LayoutTypes.SimpleSideBar}
            onClick={() => {
              dispatch(setAppConfig({ layoutType: LayoutTypes.SimpleSideBar }));
            }}
          >
            <Grid
              h="100%"
              gutter="0"
              styles={{
                inner: {
                  height: '100%',
                },
              }}
            >
              <Grid.Col
                span={3}
                bg="light-dark(var(--mantine-primary-color-5), var(--mantine-primary-color-5))"
              />
              <Grid.Col
                span={9}
                bg="light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))"
                p="xs"
              >
                {conent}
              </Grid.Col>
            </Grid>
          </CustomizePaper>
        </AspectRatio>
        <Center>
          <Title order={6}>侧边单栏</Title>
        </Center>
      </Stack>
    ),
    [LayoutTypes.DeckedSideBar]: (
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <CustomizePaper
            checked={layoutType === LayoutTypes.DeckedSideBar}
            onClick={() => {
              dispatch(setAppConfig({ layoutType: LayoutTypes.DeckedSideBar }));
            }}
          >
            <Grid
              h="100%"
              gutter="0"
              styles={{
                inner: {
                  height: '100%',
                },
              }}
            >
              <Grid.Col
                span={1}
                bg="light-dark(var(--mantine-primary-color-5), var(--mantine-primary-color-5))"
              />
              <Grid.Col
                span={2}
                bg="light-dark(var(--mantine-primary-color-3), var(--mantine-primary-color-7))"
              />
              <Grid.Col
                span={9}
                bg="light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))"
                p="xs"
              >
                {conent}
              </Grid.Col>
            </Grid>
          </CustomizePaper>
        </AspectRatio>
        <Center>
          <Title order={6}>侧边双栏</Title>
        </Center>
      </Stack>
    ),
    [LayoutTypes.TopSide]: (
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <CustomizePaper
            checked={layoutType === LayoutTypes.TopSide}
            onClick={() => {
              dispatch(setAppConfig({ layoutType: LayoutTypes.TopSide }));
            }}
          >
            <Stack h="100%" gap="0">
              <Box
                flex={2}
                w="100%"
                bg="light-dark(var(--mantine-primary-color-5), var(--mantine-primary-color-5))"
              />
              <Grid
                flex={10}
                gutter="0"
                styles={{
                  inner: {
                    height: '100%',
                  },
                }}
              >
                <Grid.Col
                  span={3}
                  bg="light-dark(var(--mantine-primary-color-3), var(--mantine-primary-color-7))"
                />
                <Grid.Col
                  span={9}
                  bg="light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))"
                  p="xs"
                >
                  {conent}
                </Grid.Col>
              </Grid>
            </Stack>
          </CustomizePaper>
        </AspectRatio>
        <Center>
          <Title order={6}>顶部&侧栏</Title>
        </Center>
      </Stack>
    ),
    [LayoutTypes.Top]: (
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <CustomizePaper
            checked={layoutType === LayoutTypes.Top}
            onClick={() => {
              dispatch(setAppConfig({ layoutType: LayoutTypes.Top }));
            }}
          >
            <Stack h="100%" gap="0">
              <Box
                flex={2}
                w="100%"
                bg="light-dark(var(--mantine-primary-color-5), var(--mantine-primary-color-5))"
              />
              <Grid
                flex={10}
                gutter="0"
                styles={{
                  inner: {
                    height: '100%',
                  },
                }}
              >
                <Grid.Col
                  span={12}
                  bg="light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))"
                  p="xs"
                >
                  {conent}
                </Grid.Col>
              </Grid>
            </Stack>
          </CustomizePaper>
        </AspectRatio>
        <Center>
          <Title order={6}>顶部</Title>
        </Center>
      </Stack>
    ),
  };

  return (
    <Stack>
      <Grid>
        {Object.keys(typeObj).map((item) => (
          <Grid.Col span={6} key={item}>
            {typeObj[item as unknown as LayoutTypes]}
          </Grid.Col>
        ))}
      </Grid>
      <Divider />
      <Title order={5}>内容宽度</Title>
      <Slider
        my="md"
        value={appConfig.contentWidth}
        onChange={(value) => {
          updateAppConfig({
            contentWidth: value,
          });
        }}
        size="md"
        labelAlwaysOn
        label={(val) => val / 2 + 50 + '%'}
        labelTransitionProps={{ duration: 0 }}
        marks={[
          { value: 0, label: '50%' },
          { value: 100, label: '100%' },
        ]}
      />
    </Stack>
  );
};

export default LayoutSetting;
