import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Title,
} from '@mantine/core';

const LayoutSetting = () => {
  const conent = (
    <Stack h={'100%'} gap="xs">
      {/* <Group flex={1} w="100%"> */}
      <Flex flex={1} gap="xs">
        <Paper
          bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-8))"
          flex={1}
        ></Paper>
        <Paper
          bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-8))"
          flex={1}
        ></Paper>
      </Flex>
      <Paper
        bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-8))"
        flex={1}
      ></Paper>
      {/* </Group> */}
    </Stack>
  );
  const bothSide = (
    <Grid.Col span={6}>
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <Paper h="100%" radius="sm" style={{ overflow: 'hidden' }}>
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
              ></Grid.Col>
              <Grid.Col
                span={2}
                bg="light-dark(var(--mantine-primary-color-3), var(--mantine-primary-color-7))"
              ></Grid.Col>
              <Grid.Col
                span={9}
                bg="light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))"
                p="xs"
              >
                {conent}
              </Grid.Col>
            </Grid>
          </Paper>
        </AspectRatio>
        <Center>
          <Title order={6}>侧边双栏</Title>
        </Center>
      </Stack>
    </Grid.Col>
  );
  const singleSide = (
    <Grid.Col span={6}>
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <Paper h="100%" radius="sm" style={{ overflow: 'hidden' }}>
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
              ></Grid.Col>
              <Grid.Col
                span={9}
                bg="light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))"
                p="xs"
              >
                {conent}
              </Grid.Col>
            </Grid>
          </Paper>
        </AspectRatio>
        <Center>
          <Title order={6}>侧边单栏</Title>
        </Center>
      </Stack>
    </Grid.Col>
  );
  const topSingleSide = (
    <Grid.Col span={6}>
      <Stack>
        <AspectRatio ratio={16 / 9}>
          <Paper h="100%" radius="sm" style={{ overflow: 'hidden' }}>
            <Stack h="100%" gap="0">
              <Box
                flex={2}
                w="100%"
                bg="light-dark(var(--mantine-primary-color-5), var(--mantine-primary-color-5))"
              ></Box>
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
                ></Grid.Col>
                <Grid.Col
                  span={9}
                  bg="light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))"
                  p="xs"
                >
                  {conent}
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        </AspectRatio>
        <Center>
          <Title order={6}>侧边单栏</Title>
        </Center>
      </Stack>
    </Grid.Col>
  );
  return (
    <Stack>
      <Grid>
        {bothSide}
        {singleSide}
        {topSingleSide}
      </Grid>
    </Stack>
  );
};

export default LayoutSetting;
