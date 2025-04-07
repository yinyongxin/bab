import { Box, Flex } from '@mantine/core';
type EmptyProps = {
  text?: string;
  children?: React.ReactNode;
};

const Empty = (props: EmptyProps) => {
  const { text = '未找到任何资源', children } = props;
  return (
    <Box h="100%">
      <Flex
        direction="column"
        justify="center"
        align="center"
        h="100%"
        gap="md"
      >
        {children}
        {text}
      </Flex>
    </Box>
  );
};

export default Empty;
