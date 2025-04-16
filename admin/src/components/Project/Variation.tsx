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
    image: '',
    standardsType: 'color',
    defaultValue: '',
  },
  {
    _id: '长',
    name: '长',
    unit: 'cm',
    image: '',
    standardsType: 'number',
    defaultValue: 0,
  },
  {
    _id: '宽',
    name: '宽',
    unit: 'cm',
    image: '',
    standardsType: 'number',
    defaultValue: 0,
  },
  {
    _id: '高',
    name: '高',
    unit: 'cm',
    image: '',
    standardsType: 'number',
  },
  {
    _id: '大小',
    name: '大小',
    unit: '',
    image: '',
    standardsType: 'number',
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
          value={mapValue.value as string}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val });
          }}
        />
      ),
      number: (
        <NumberInput
          size="md"
          value={mapValue.value}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val });
          }}
          suffix={mapValue.unit}
        />
      ),
      string: (
        <TextInput
          size="md"
          value={mapValue.value}
          onChange={(val) => {
            map.set(mapKey, { ...mapValue, value: val.target.value });
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
                value: option?.defaultValue,
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
