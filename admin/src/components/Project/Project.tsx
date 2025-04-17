import { Grid, Stack } from '@mantine/core';
import Classification from './Classification';
import Thumbnail from './Thumbnail';
import { useForm, hasLength } from '@mantine/form';
import BaseInfo from './BaseInfo';
import Detail from './Detail';
import Tag from './Tag';
import Pricing from './Pricing';
import Variation from './Variation';
import { useEffect } from 'react';
import Inventory from './Inventory';

const Projcet = () => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      detail: 'asdfasfasfsf',
      variationList: [],
      inventoryList: [],
    },
    validate: {
      name: hasLength({ min: 1 }, '产品名称不能为空'),
      description: hasLength({ min: 1 }, '项目描述不能为空'),
    },
  });

  useEffect(() => {
    form.setValues({
      name: '测试',
      description: '测试',
      variationList: [
        [
          {
            _id: 'color',
            name: '颜色',
            unit: '',
            standardsType: 0,
            value: '#ed0202',
          },
        ],
        [
          {
            _id: '尺寸',
            name: '尺寸',
            unit: '',
            standardsType: 3,
            options: ['S', 'M', 'L'],
            value: 'S',
          },
        ],
      ] as any,
    });
  }, []);

  useEffect(() => {
    console.log('form.values', form.values);
  }, [form.values]);

  return (
    <Grid gutter="xl">
      <Grid.Col span={8}>
        <Stack gap="xl">
          <BaseInfo form={form} />
          <Detail form={form} />
          <Variation form={form} />
          <Pricing form={form} />
        </Stack>
      </Grid.Col>

      <Grid.Col span={4}>
        <Stack gap="xl">
          <Thumbnail form={form} />
          <Classification />
          <Tag />
          <Inventory form={form} />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
export default Projcet;
