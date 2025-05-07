import {
  Badge,
  Card,
  ColorSwatch,
  Grid,
  Group,
  NumberInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { TimePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import {
  ModeEnum,
  ProjectType,
  StandardsItem,
  StandardsTypeEnum,
} from './types';
const daysOfWeek = [
  { label: '星期一', value: 1 },
  { label: '星期二', value: 2 },
  { label: '星期三', value: 3 },
  { label: '星期四', value: 4 },
  { label: '星期五', value: 5 },
  { label: '星期六', value: 6 },
  { label: '星期日', value: 7 },
];

type InventoryProps = {
  form: UseFormReturnType<ProjectType>;
};
const Inventory = (props: InventoryProps) => {
  const { form } = props;
  const inventoryList: {
    variations: StandardsItem[];
    value: number;
  }[] = form.values.inventoryList;
  const { mode } = form.values;
  const {
    timeRange: { start, end },
    weekRange,
  } = form.values;
  const isTimeRange = mode === ModeEnum.TIMERANGE;
  const isQuantity = mode === ModeEnum.QUANTITY;

  const rows = isQuantity && (
    <Stack gap="md">
      {inventoryList.map(({ variations, value }, index) => (
        <Stack gap="xs" key={index}>
          <NumberInput
            min={0}
            value={value}
            onChange={(val) => {
              form.setFieldValue(`inventoryList.${index}`, {
                variations,
                value: val,
              });
            }}
          />

          <Group>
            {variations.map((item) => {
              const isColor = item.standardsType === StandardsTypeEnum.COLOR;
              if (isColor) {
                return <ColorSwatch color={item.value} />;
              }
              return (
                <Badge size="lg" w="auto" variant="light" key={item._id}>
                  <Group gap="sm">
                    <Text c="dimmed" size="sm">
                      {item.name}
                    </Text>
                    <Group gap="2">
                      <Text>{item.value}</Text>
                      {item.unit && <Text>{item.unit}</Text>}
                    </Group>
                  </Group>
                </Badge>
              );
            })}
          </Group>
        </Stack>
      ))}
    </Stack>
  );
  const titleRender = () => {
    if (isTimeRange) {
      return <Title order={4}>时间范围</Title>;
    }
    if (isQuantity) {
      return <Title order={4}>库存数量</Title>;
    }
  };

  const timeRangeRender = () => {
    return (
      isTimeRange && (
        <Stack gap="md">
          <TimePicker value={start} label="每天开始时间" withDropdown />
          <TimePicker value={end} label="每天结束时间" withDropdown />
          <Text size="sm">每周可用时间</Text>
          <Grid>
            {daysOfWeek.map((item) => (
              <Grid.Col span={4} key={item.value}>
                <Badge
                  size="lg"
                  variant={weekRange.includes(item.value) ? 'filled' : 'light'}
                >
                  {item.label}
                </Badge>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      )
    );
  };
  return (
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Title order={4}>{titleRender()}</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        {timeRangeRender()}
        {rows}
      </Card.Section>
    </Card>
  );
};
export default Inventory;
