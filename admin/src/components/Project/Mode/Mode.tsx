import { Card, Group, Radio, Title, Text, Grid } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import classes from './Mode.module.css';
import { ModeEnum } from '../types';
const data = [
  {
    name: '数量',
    description: '表示产品的库存数量',
    value: ModeEnum.QUANTITY,
  },
  {
    name: '时间范围',
    description: '表示产品服务的时间范围',
    value: ModeEnum.TIMERANGE,
  },
];

type ModeProps = {
  form: UseFormReturnType<any>;
};
const Mode = (props: ModeProps) => {
  const { form } = props;
  const { mode } = form.values;

  const cards = data.map((item) => (
    <Grid.Col span={6} key={item.value}>
      <Radio.Card className={classes.root} radius="md" value={item.value}>
        <Group wrap="nowrap" align="flex-start">
          <Radio.Indicator />
          <div>
            <Text className={classes.label}>{item.name}</Text>
            <Text className={classes.description}>{item.description}</Text>
          </div>
        </Group>
      </Radio.Card>
    </Grid.Col>
  ));
  return (
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Title order={4}>模式</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Radio.Group
          value={mode}
          onChange={(val) => {
            form.setFieldValue('mode', val as ModeEnum);
          }}
          label="商品模式"
        >
          <Grid>{cards}</Grid>
        </Radio.Group>
      </Card.Section>
    </Card>
  );
};

export default Mode;
