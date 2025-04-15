import { Card, Title } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import AppRichTextDditor from '../AppRichTextDditor';
type DetailType = {
  form: UseFormReturnType<any>;
};
const Detail = (props: DetailType) => {
  const { form } = props;
  return (
    <Card>
      <Card.Section inheritPadding py="md">
        <Title order={4}>详情</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <AppRichTextDditor value={form.values.detail} />
      </Card.Section>
    </Card>
  );
};
export default Detail;
