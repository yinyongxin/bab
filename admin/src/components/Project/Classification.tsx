import { Card, Title } from '@mantine/core';

const Classification = () => {
  return (
    <Card>
      <Card.Section withBorder inheritPadding py="md">
        <Title order={4}>分类</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md"></Card.Section>
    </Card>
  );
};

export default Classification;
