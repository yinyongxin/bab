import {
  Title,
  Text,
  Flex,
  Group,
  Stack,
  Box,
  BoxComponentProps,
  ActionIcon,
  LoadingOverlay,
} from '@mantine/core';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import { IconArrowLeft, IconLoader, IconReload } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

type PageProps = {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode[];
  footer?: React.ReactNode;
  headerBottom?: React.ReactNode;
  bodyTop?: React.ReactNode;
  style?: React.CSSProperties;
  onReload?: () => void | Promise<void>;
  onInit?: () => void | Promise<void>;
  showLoading?: boolean;
  loading?: boolean;
  showBack?: boolean;
} & BoxComponentProps;

const Page = (props: PageProps) => {
  const [visible, { open, close }] = useDisclosure(false);
  const {
    children,
    title,
    description,
    actions,
    footer,
    headerBottom,
    bodyTop,
    onReload,
    loading,
    showLoading,
    showBack,
    onInit,
    ...rest
  } = props;

  const init = async () => {
    if (!onInit) {
      return;
    }
    try {
      open();
      await onInit();
    } finally {
      close();
    }
  };

  const reload = async () => {
    if (!onReload) {
      return;
    }
    try {
      open();
      await onReload();
    } finally {
      close();
    }
  };

  useShallowEffect(() => {
    init();
  }, []);

  const navigate = useNavigate();
  return (
    <Box pos="relative" {...rest} h="100%">
      {(showLoading || loading) && (
        <LoadingOverlay
          visible={visible || loading}
          zIndex={1000}
          loaderProps={{ type: 'bars' }}
        />
      )}
      <Stack gap="md" h="inherit">
        <Stack px="xl" py="md">
          <Flex justify="space-between" align="center">
            <Group gap="sm" align="center">
              {showBack && (
                <ActionIcon
                  size="md"
                  variant="gradient"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <IconArrowLeft />
                </ActionIcon>
              )}
              {title && (
                <Title order={3} pt="4">
                  {title}
                </Title>
              )}

              {onReload && (
                <ActionIcon
                  size="md"
                  variant="transparent"
                  loading={visible}
                  onClick={reload}
                >
                  <IconReload />
                </ActionIcon>
              )}
            </Group>
            {actions && <Group>{actions}</Group>}
          </Flex>
          {description && (
            <Text lineClamp={2} c="dimmed">
              {description}
            </Text>
          )}
          {headerBottom}
        </Stack>
        <Box px="xl">{bodyTop}</Box>
        <Box flex={1} px="xl">
          {children}
        </Box>
        <Box px="xl" pb="md">
          {footer}
        </Box>
      </Stack>
    </Box>
  );
};

export default Page;
