import { Grid, Stack } from '@mantine/core';
import Classification from './Classification';
import Thumbnail from './Thumbnail';
import { useForm, hasLength } from '@mantine/form';
import BaseInfo from './BaseInfo';
import Detail from './Detail';
import Tag from './Tag';
import Pricing from './Pricing/Pricing';
import Variation from './Variation';
import { useEffect } from 'react';
import Inventory from './Inventory';
import {
  ProjectType,
  DiscountTypeEnum,
  ModeEnum,
  ProjectStatusEnum,
} from './types';
import Mode from './Mode/Mode';
import Other from './Other/Other';
type ProjectProps = {
  id?: string;
};

const Project = (props: ProjectProps) => {
  const { id } = props;
  const isEdit = !!id;
  const isCreate = !id;
  const form = useForm<ProjectType>({
    initialValues: {
      name: '',
      description: '',
      detail: 'asdfasfasfsf',
      variationList: [],
      inventoryList: [],
      price: 0,
      discount: 0,
      discountType: DiscountTypeEnum.NONE,
      mode: ModeEnum.QUANTITY,
      timeRange: {
        start: '00:00:00',
        end: '23:59:59',
      },
      weekRange: [1, 2, 3, 4, 5, 6, 7],
      status: ProjectStatusEnum.PUBLISH,
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
      ],
      timeRange: {
        start: '09:00',
        end: '18:00',
      },
      weekRange: [1, 2, 3, 4, 5],
      discountType: DiscountTypeEnum.NONE,
    });
  }, []);

  useEffect(() => {
    console.log('form.values', form.values);
    console.log('isEdit', isEdit);
    console.log('isCreate', isCreate);
  }, [form.values]);

  return (
    <Grid gutter="xl">
      <Grid.Col span={8}>
        <Stack gap="xl">
          <BaseInfo form={form} />
          <Detail form={form} />
          <Mode form={form} />
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
          <Other form={form} />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
export default Project;
