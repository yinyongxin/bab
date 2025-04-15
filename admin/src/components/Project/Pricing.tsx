import { Card, Title, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
type PricingType = {
  form: UseFormReturnType<any>;
};
const Pricing = (props: PricingType) => {
  const { form } = props;
  return (
    <Card shadow='sm'>
      <Card.Section inheritPadding py="md">
        <Title order={4}>价格</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Stack>
          <TextInput
            withAsterisk
            size="md"
            {...form.getInputProps('name')}
            label="基本价格"
            placeholder="请输入基本价格"
          />
        </Stack>
      </Card.Section>
    </Card>
  );
};
export default Pricing;
