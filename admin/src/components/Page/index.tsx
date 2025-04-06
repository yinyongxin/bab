import {
  Title,
  Text,
  Paper,
  Flex,
  Group,
  PaperProps,
  Stack,
} from '@mantine/core';

type PageProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode[];
  footer?: React.ReactNode;
  headerBottom?: React.ReactNode;
  bodyTop?: React.ReactNode;
  contentProps?: PaperProps;
  style?: React.CSSProperties;
};
const Page = (props: PageProps) => {
  const {
    children,
    title,
    description,
    actions,
    footer,
    headerBottom,
    bodyTop,
    contentProps,
    style,
  } = props;
  return (
    <Flex direction="column" gap={24} style={style}>
      <Stack gap="sm">
        <Flex justify="space-between" align="center">
          {title && <Title order={3}>{title}</Title>}
          {actions && <Group>{actions}</Group>}
        </Flex>
        {description && (
          <Text lineClamp={2} mt="sm" c="dimmed">
            {description}
          </Text>
        )}
        {headerBottom}
      </Stack>
      {bodyTop}
      <Paper radius="md" p="md" flex={1} {...contentProps}>
        {children}
      </Paper>
      {footer}
    </Flex>
  );
};

export default Page;
