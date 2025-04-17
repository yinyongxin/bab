import { Card, Group, NumberInput, Pill, Stack, Title } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { StandardsItem } from './types';
import { useEffect, useMemo } from 'react';
import { useMap } from '@mantine/hooks';
import { generateCombinations, getGenerateCombinations } from './fns';
type InventoryProps = {
  form: UseFormReturnType<any>;
};
const Inventory = (props: InventoryProps) => {
  const { form } = props;
  const { inventoryList, variationList } = form.values;
  const map = useMap<string, [StandardsItem[], number]>([]);

  useEffect(() => {
    map.clear();
    // 生成所有组合
    const generateCombinations = getGenerateCombinations(variationList).filter(
      // 过滤掉没有值的组合
      (variation) => !variation.some((item) => !item.value),
    );
    // 生成库存列表
    generateCombinations.forEach((item: StandardsItem[]) => {
      const key = item.map((i) => `${i._id}-${i.value}`).join('-');
      const isHas = map.has(key);
      if (isHas) {
        map.set(key, map.get(key) as [StandardsItem[], number]);
      } else {
        map.set(key, [item, 0]);
      }
    });
  }, [variationList]);
  const rows = (
    <Stack gap="md">
      {Array.from(map.entries()).map(([key, [inventorys, value]]) => (
        <Stack gap="xs" key={key}>
          <NumberInput value={value} />
          <Pill.Group>
            {inventorys.map((item) => (
              <Pill>{item.value}</Pill>
            ))}
          </Pill.Group>
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
