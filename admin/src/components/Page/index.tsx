import {
  Title,
  Text,
  Flex,
  Group,
  Stack,
  Box,
  ActionIcon,
  LoadingOverlay,
  StackProps,
} from '@mantine/core';
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import { IconArrowLeft, IconReload } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

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
} & StackProps;

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
    <Stack pos="relative" gap="md" {...rest} pb="xl">
      {(showLoading || loading) && (
        <LoadingOverlay
          visible={visible || loading}
          zIndex={1000}
          loaderProps={{ type: 'bars' }}
        />
      )}
      <Stack px="xl" py="xl">
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
            {title && <Title order={3}>{title}</Title>}

            {onReload && (
              <ActionIcon
                size="md"
                variant="transparent"
                className={clsx({ spin: loading })}
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
      {bodyTop && <Box px="xl">{bodyTop}</Box>}
      <Box
        px="xl"
        flex={1}
        style={{
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
      {footer && (
        <Box px="xl" pb="xl">
          {footer}
        </Box>
      )}
    </Stack>
  );
};

export default Page;
