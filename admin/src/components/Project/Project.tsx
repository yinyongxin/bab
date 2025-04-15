import { Grid, Stack } from '@mantine/core';
import Classification from './Classification';
import Thumbnail from './Thumbnail';
import { useForm, hasLength } from '@mantine/form';
import BaseInfo from './BaseInfo';
import Detail from './Detail';
import Tag from './Tag';
import Pricing from './Pricing';

const Projcet = () => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      detail: 'asdfasfasfsf',
    },
    validate: {
      name: hasLength({ min: 1 }, '产品名称不能为空'),
      description: hasLength({ min: 1 }, '项目描述不能为空'),
    },
  });

  return (
    <Grid>
      <Grid.Col span={8}>
        <Stack>
          <BaseInfo form={form} />
          <Detail form={form} />
          <Pricing form={form} />

        </Stack>
      </Grid.Col>

      <Grid.Col span={4}>
        <Stack>
          <Thumbnail />
          <Classification />
          <Tag /> 
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
export default Projcet;
