import appConfig from '@/configs/app.config';
import { getFilePath } from '@/utils';
import { Box, Flex, Image } from '@mantine/core';
type EmptyProps = {
  text?: string;
  children?: React.ReactNode;
};

const Empty = (props: EmptyProps) => {
  const { text = '未找到任何资源', children } = props;
  return (
    <Box h="100%" py={100}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        h="100%"
        gap="md"
      >
        {children || (
          <Image
            w="200"
            src={getFilePath(appConfig.emptyOrder)}
            fallbackSrc="/images/Empty-Order--Streamline-Bruxelles.png"
          />
        )}
        {text}
      </Flex>
    </Box>
  );
};

export default Empty;
