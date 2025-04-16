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
const options = [
  {
    _id: 'color',
    name: '颜色',
    unit: '',
    standardsType: 'color',
  },
  {
    _id: '长',
    name: '长',
    unit: 'cm',
    standardsType: 'number',
  },
  {
    _id: '宽',
    name: '宽',
    unit: 'cm',
    standardsType: 'number',
  },
  {
    _id: '高',
    name: '高',
    unit: 'cm',
    standardsType: 'number',
  },
  {
    _id: '尺寸',
    name: '尺寸',
    unit: '',
    standardsType: 'select',
    options: ['S', 'M', 'L'],
  },
  {
    _id: '材质',
    name: '材质',
    unit: '',
    image: '',
    standardsType: 'string',
  },
];
type Itme = (typeof options)[0];
type MapItme = Itme & {
  value?: number | string;
};
const Variation = () => {
  const map = useMap<number, MapItme>([[Date.now(), options[0]]]);
  const inputsRender = (mapKey: number, mapValue: MapItme) => {
    return {
      color: (
        <ColorInput
          size="md"
          value={(mapValue.value as string) || ''}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val });
          }}
        />
      ),
      number: (
        <NumberInput
          size="md"
          value={(mapValue.value as number) || 0}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val });
          }}
          suffix={mapValue.unit}
        />
      ),
      string: (
        <TextInput
          size="md"
          value={(mapValue.value as string) || ''}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val.target.value });
          }}
        />
      ),
      select: (
        <Select
          data={mapValue.options}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val ? val : '' });
          }}
        />
      ),
    }[mapValue.standardsType];
  };

  const output = () => {
    const data = Array.from(map.entries()).map(([key, mapValue]) => {
      return mapValue;
    });

    // 收集各规格的值
    const specifications = data.reduce((accumulator, item) => {
      const index = accumulator.findIndex((spec) => spec[0]._id === item._id);

      if (index >= 0) {
        accumulator[index].push(item); // 将颜色值添加到数组中
      } else {
        accumulator.push([item]); // 创建新的数组并添加颜色值
      }
      return accumulator;
    }, [] as Itme[][]);

    // 递归生成规格组合
    const generateCombinations = (
      data: Itme[][],
      prefix: Itme[] = [],
      index: number = 0,
      result: Itme[][] = [],
    ) => {
      // 当当前索引等于数据长度时，将当前组合添加到结果数组中
      if (index === data.length) {
        result.push(prefix);
        return result; // 返回生成的结果
      }

      const currentSpec = data[index]; // 获取当前规格

      currentSpec.forEach((value) => {
        // 为每个值创建新的组合
        generateCombinations(data, [...prefix, value], index + 1, result); // 递归进入下一规格
      });

      return result; // 返回生成的结果
    };
    const result = generateCombinations(specifications);

    console.log('result', result);
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
            onClick={() => map.delete(key)}
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
  };
  return (
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Group justify="space-between" align="center">
          <Title order={4}>规格</Title>
          <Button leftSection={<IconPlus />} variant="subtle" onClick={add}>
            <Text>添加规格</Text>
          </Button>
          <Button leftSection={<IconPlus />} variant="subtle" onClick={output}>
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
