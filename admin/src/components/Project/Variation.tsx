import {
  Button,
  Card,
  Title,
  Text,
  Group,
  ActionIcon,
  Table,
  Select,
  NumberInput,
  ColorInput,
  TextInput,
} from '@mantine/core';
import { useMap } from '@mantine/hooks';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { StandardsItem, StandardsTypeEnum } from './types';
import { UseFormReturnType } from '@mantine/form';

const options: StandardsItem[] = [
  {
    _id: 'color',
    name: '颜色',
    unit: '',
    standardsType: StandardsTypeEnum.COLOR,
    value: '',
  },
  {
    _id: '长',
    name: '长',
    unit: 'cm',
    standardsType: StandardsTypeEnum.NUMBER,
    value: 0,
  },
  {
    _id: '宽',
    name: '宽',
    unit: 'cm',
    standardsType: StandardsTypeEnum.NUMBER,
    value: 0,
  },
  {
    _id: '高',
    name: '高',
    unit: 'cm',
    standardsType: StandardsTypeEnum.NUMBER,
    value: 0,
  },
  {
    _id: '尺寸',
    name: '尺寸',
    unit: '',
    standardsType: StandardsTypeEnum.SELECT,
    options: ['S', 'M', 'L'],
    value: '',
  },
  {
    _id: '材质',
    name: '材质',
    unit: '',
    standardsType: StandardsTypeEnum.SELECT,
    value: '',
  },
];
type VariationProps = {
  form: UseFormReturnType<any>;
};
const Variation = (props: VariationProps) => {
  const { form } = props;
  const ref = useRef({
    isInited: false,
  });
  const value = (form.values.variationList || []) as StandardsItem[][];
  const map = useMap<number, StandardsItem>([]);

  useEffect(() => {
    if (ref.current.isInited) {
      return;
    }
    if (value.length === 0) {
      return;
    }
    value.flat().forEach((item, index) => {
      map.set(index, item);
    });
    ref.current.isInited = true;
  }, [value]);

  const getSpecifications = () => {
    const data = Array.from(map.entries()).map(([_key, mapValue]) => {
      return mapValue;
    });

    // 收集各规格的值
    return data.reduce((accumulator, item) => {
      const index = accumulator.findIndex((spec) => spec[0]._id === item._id);

      if (index >= 0) {
        accumulator[index].push(item); // 将颜色值添加到数组中
      } else {
        accumulator.push([item]); // 创建新的数组并添加颜色值
      }
      return accumulator;
    }, [] as StandardsItem[][]);
  };
  const onChange = form.getInputProps('variationList').onChange;

  const inputsRender = (mapKey: number, mapValue: StandardsItem) => {
    return {
      [StandardsTypeEnum.COLOR]: (
        <ColorInput
          size="md"
          value={(mapValue.value as string) || ''}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val });
            const specifications = getSpecifications();
            onChange?.(specifications);
          }}
        />
      ),
      [StandardsTypeEnum.NUMBER]: (
        <NumberInput
          size="md"
          value={(mapValue.value as number) || 0}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val });
            const specifications = getSpecifications();
            onChange?.(specifications);
          }}
          suffix={mapValue.unit}
        />
      ),
      [StandardsTypeEnum.TEXT]: (
        <TextInput
          size="md"
          value={(mapValue.value as string) || ''}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val.target.value });
            const specifications = getSpecifications();
            onChange?.(specifications);
          }}
        />
      ),
      [StandardsTypeEnum.SELECT]: (
        <Select
          value={(mapValue.value as string) || ''}
          data={mapValue.options}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val ? val : '' });
            const specifications = getSpecifications();
            onChange?.(specifications);
          }}
        />
      ),
    }[mapValue.standardsType];
  };

  const rows = Array.from(map.entries()).map(([key, mapValue]) => (
    <Table.Tr key={key}>
      <Table.Td>
        <Select
          size="md"
          data={options.map((option) => {
            return {
              value: option._id,
              label: option.name,
            };
          })}
          value={map.get(key)?._id}
          onChange={(val) => {
            const option = options.find((option) => option._id === val);
            if (option) {
              map.set(key, {
                ...option,
              });
              const specifications = getSpecifications();
              onChange?.(specifications);
            }
          }}
        ></Select>
      </Table.Td>
      <Table.Td>
        <>{inputsRender(key, mapValue)}</>
      </Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon
            size="input-md"
            variant="light"
            onClick={() => {
              map.delete(key);
              const specifications = getSpecifications();
              onChange?.(specifications);
            }}
            color="red"
          >
            <IconTrash stroke={1.5} size={18} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  const add = () => {
    map.set(Date.now(), options[0]);
    const specifications = getSpecifications();
    onChange?.(specifications);
  };
  return (
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Group justify="space-between" align="center">
          <Title order={4}>规格</Title>
          <Button leftSection={<IconPlus />} variant="subtle" onClick={add}>
            <Text>添加规格</Text>
          </Button>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Table layout="fixed" withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>规格类型</Table.Th>
              <Table.Th>规格值</Table.Th>
              <Table.Th w={50} />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card.Section>
    </Card>
  );
};

export default Variation;
