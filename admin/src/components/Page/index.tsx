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
import { useDisclosure } from '@mantine/hooks';
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
    ...rest
  } = props;
  const navigate = useNavigate();
  return (
    <Box pos="relative" p="xl" {...rest}>
      {(showLoading || loading) && (
        <LoadingOverlay
          visible={visible || loading}
          zIndex={1000}
          loaderProps={{ type: 'bars' }}
        />
      )}
      <Stack gap="md">
        <Stack>
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
              <ActionIcon
                size="md"
                variant="transparent"
                loading={visible}
                onClick={async () => {
                  try {
                    open();
                    await onReload?.();
                  } finally {
                    setTimeout(() => {
                      close();
                    }, 1000);
                  }
                }}
              >
                <IconReload />
              </ActionIcon>
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
        {bodyTop}
        {children}
        {footer}
      </Stack>
    </Box>
  );
};

export default Page;
