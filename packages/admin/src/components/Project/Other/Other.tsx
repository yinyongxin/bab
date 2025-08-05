import { Card, Group, Radio, Title, Text, Grid } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import classes from './Other.module.css';
import { ProjectStatusEnum, ProjectType } from '../types';
const data = [
  {
    name: '上架',
    description: '可见并可购买',
    value: ProjectStatusEnum.PUBLISH,
  },
  {
    name: '下架',
    description: '隐藏或停止销售',
    value: ProjectStatusEnum.UNPUBLISH,
  },
];

type OtherProps = {
  form: UseFormReturnType<ProjectType>;
};
const Other = (props: OtherProps) => {
  const { form } = props;
  const { status } = form.values;

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
        <Title order={4}>其他信息</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Radio.Group
          value={status}
          onChange={(val) => {
            form.setFieldValue('status', val as unknown as ProjectStatusEnum);
          }}
          label="商品状态"
        >
          <Grid>{cards}</Grid>
        </Radio.Group>
      </Card.Section>
    </Card>
  );
};

export default Other;
