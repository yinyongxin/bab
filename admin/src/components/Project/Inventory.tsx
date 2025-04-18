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
import { UseFormReturnType } from '@mantine/form';
import { StandardsItem, StandardsTypeEnum } from './types';
type InventoryProps = {
  form: UseFormReturnType<any>;
};
const Inventory = (props: InventoryProps) => {
  const { form } = props;
  const inventoryList: {
    variations: StandardsItem[];
    value: number;
  }[] = form.values.inventoryList;

  const rows = (
    <Stack gap="md">
      {inventoryList.map(({ variations, value }, index) => (
        <Stack gap="xs" key={index}>
          <NumberInput
            value={value}
            onChange={() => {
              const newValue = value + 1;
              // form.setFieldValue(`inventoryList.${index}`, {
              //   variations,
              //   value: newValue,
              // });
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
  return (
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Title order={4}>库存</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        {rows}
      </Card.Section>
    </Card>
  );
};
export default Inventory;
