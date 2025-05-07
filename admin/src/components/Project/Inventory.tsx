import {
  Badge,
  Card,
  ColorSwatch,
  Group,
  NumberInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { TimeGrid, TimePicker, getTimeRange } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { ModeEnum, StandardsItem, StandardsTypeEnum } from './types';

type InventoryProps = {
  form: UseFormReturnType<any>;
};
const Inventory = (props: InventoryProps) => {
  const { form } = props;
  const inventoryList: {
    variations: StandardsItem[];
    value: number;
  }[] = form.values.inventoryList;
  const { mode } = form.values;
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
  return (
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Title order={4}>{titleRender()}</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        {isTimeRange && (
          <Stack gap="md">
            <TimePicker label="开始时间" withDropdown />
            <TimePicker label="结束时间" withDropdown />
          </Stack>
        )}
        {rows}
      </Card.Section>
    </Card>
  );
};
export default Inventory;
