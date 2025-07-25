import {
  Card,
  Title,
  Stack,
  Text,
  NumberInput,
  Radio,
  Group,
  Slider,
  Space,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import classes from './Pricing.module.css';
import { DiscountTypeEnum, ProjectType } from '../types';
import { useEffect } from 'react';
const data = [
  {
    name: '没有折扣',
    value: DiscountTypeEnum.NONE,
  },
  {
    name: '百分比折扣',
    value: DiscountTypeEnum.PERCENTAGE,
  },
  {
    name: '固定折扣',
    value: DiscountTypeEnum.FIXED,
  },
];

type PricingType = {
  form: UseFormReturnType<ProjectType>;
};
const Pricing = (props: PricingType) => {
  const { form } = props;
  const { discountType } = form.values;
  const cards = data.map((item) => (
    <Radio.Card
      className={classes.root}
      radius="md"
      value={item.value}
      key={item.value}
    >
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator />
        <div>
          <Text className={classes.label}>{item.name}</Text>
        </div>
      </Group>
    </Radio.Card>
  ));

  useEffect(() => {
    form.setFieldValue('discount', 0);
  }, [discountType]);
  const discountTypeRender = () => {
    return (
      <Radio.Group
        value={discountType}
        onChange={(val) => {
          form.setFieldValue('discountType', val as DiscountTypeEnum);
        }}
        label="折扣类型"
      >
        <Group gap="sm">{cards}</Group>
      </Radio.Group>
    );
  };

  const discountAfterPrice = () => {
    if (discountType === DiscountTypeEnum.PERCENTAGE) {
      return (
        form.values.price - (form.values.discount / 100) * form.values.price
      );
    }
    if (discountType === DiscountTypeEnum.FIXED) {
      return form.values.price - form.values.discount;
    }
    return form.values.price;
  };
  return (
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Title order={4}>价格</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Stack>
          <NumberInput
            min={0}
            withAsterisk
            size="md"
            {...form.getInputProps('price')}
            label="基本价格"
            description={`折扣计算后价格: ${discountAfterPrice()}`}
            placeholder="请输入基本价格"
          />
          {discountTypeRender()}
          {discountType === DiscountTypeEnum.PERCENTAGE && (
            <>
              <Slider
                size="md"
                marks={[
                  { value: 0, label: '0%' },
                  { value: 10, label: '10%' },
                  { value: 20, label: '20%' },
                  { value: 30, label: '30%' },
                  { value: 40, label: '40%' },
                  { value: 20, label: '20%' },
                  { value: 50, label: '50%' },
                  { value: 60, label: '60%' },
                  { value: 70, label: '70%' },
                  { value: 80, label: '80%' },
                  { value: 90, label: '90%' },
                  { value: 100, label: '100%' },
                ]}
                onChange={(val) => {
                  form.setFieldValue('discount', val);
                }}
                value={form.values.discount}
              />
              <Space h="xs" />
            </>
          )}
          {discountType === DiscountTypeEnum.FIXED && (
            <NumberInput
              min={0}
              withAsterisk
              size="md"
              {...form.getInputProps('discount')}
              label="折扣金额"
              placeholder="请输入折扣金额"
            />
          )}
        </Stack>
      </Card.Section>
    </Card>
  );
};
export default Pricing;
