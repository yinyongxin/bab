import { Title, Text, Paper, Flex, Box, Group } from '@mantine/core';
import classes from './Page.module.css';

type PageProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode[];
  footer?: React.ReactNode;
};
const Page = (props: PageProps) => {
  const { children, title, description, actions, footer } = props;
  return (
    <Paper radius="md" p="md" className={classes.page}>
      <header>
        <Flex justify="space-between" align="center">
          {title && <Title order={3}>{title}</Title>}
          {actions && <Group>{actions}</Group>}
        </Flex>
        {description && (
          <Text lineClamp={2} mt="md">
            {description}
          </Text>
        )}
      </header>
      <Box mt="lg">{children}</Box>
      {footer && <Box mt="lg">{footer}</Box>}
    </Paper>
  );
};

export default Page;
