import { Card, Title, Stack, TextInput, Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
type BaseInfoType = {
  form: UseFormReturnType<any>;
};
const BaseInfo = (props: BaseInfoType) => {
  const { form } = props;
  return (
    <Card>
      <Card.Section withBorder inheritPadding py="md">
        <Title order={4}>基本信息</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Stack>
          <TextInput
            withAsterisk
            size="md"
            {...form.getInputProps('name')}
            label="产品名称"
            description="产品名称是唯一的，不可重复的，请确保产品名称的唯一性"
            placeholder="请输入产品名称"
          />
          <Textarea
            withAsterisk
            rows={4}
            size="md"
            {...form.getInputProps('description')}
            label="项目描述"
            placeholder="请输入项目描述"
          />
        </Stack>
      </Card.Section>
    </Card>
  );
};
export default BaseInfo;
