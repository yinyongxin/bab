import {
  Title,
  Text,
  Paper,
  Flex,
  Box,
  Group,
  PaperProps,
  ScrollArea,
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
  } = props;
  return (
    <Flex direction="column" gap={24}>
      <header>
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
      </header>
      {bodyTop}
      <Paper radius="md" p="md" flex={1} {...contentProps}>
        <ScrollArea h="100%">{children}</ScrollArea>
      </Paper>
      {footer && <Box mt="lg">{footer}</Box>}
    </Flex>
  );
};

export default Page;
