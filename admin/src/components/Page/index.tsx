import {
  Title,
  Text,
  Flex,
  Group,
  Stack,
  Box,
  BoxComponentProps,
} from '@mantine/core';

type PageProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode[];
  footer?: React.ReactNode;
  headerBottom?: React.ReactNode;
  bodyTop?: React.ReactNode;
  style?: React.CSSProperties;
} & BoxComponentProps;
const Page = (props: PageProps) => {
  const {
    children,
    title,
    description,
    actions,
    footer,
    headerBottom,
    bodyTop,
    ...rest
  } = props;
  return (
    <Box {...rest}>
      <Stack gap="md">
        <Stack>
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
        {children}
        {footer}
      </Stack>
    </Box>
  );
};

export default Page;
