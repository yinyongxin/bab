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
  rgba,
  rem,
} from '@mantine/core';
import {
  useDisclosure,
  useShallowEffect,
  useWindowScroll,
} from '@mantine/hooks';
import { IconArrowLeft, IconReload } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppSelector } from '@/store';
import { LayoutTypes } from '@/@types/layout';
import useAppConfig from '@/store/hook/useAppConfig';

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
  const [appConfig] = useAppConfig();
  const { layoutType } = appConfig;
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
  const [scroll] = useWindowScroll();

  useShallowEffect(() => {
    init();
  }, []);

  const stickyTop: Record<LayoutTypes, string> = {
    [LayoutTypes.SimpleSideBar]: '0',
    [LayoutTypes.DeckedSideBar]: '0',
    [LayoutTypes.TopSide]: rem(60),
    [LayoutTypes.Top]: rem(60),
  };

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
      <Stack
        px="xl"
        pt="xl"
        pb="md"
        pos="sticky"
        bg={
          scroll.y > 0 ? rgba('var(--mantine-color-body)', 0.2) : 'transparent'
        }
        top={stickyTop[layoutType]}
        style={{
          zIndex: 10,
          transition: 'background-color,box-shadow 0.2s ease-in-out',
          ...(scroll.y > 5 && {
            backdropFilter: 'blur(8px)',
            boxShadow: 'var(--mantine-shadow-sm)',
          }),
        }}
      >
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
      <Stack align="center" w="100%" px="xl">
        <Box flex={1} w={appConfig.contentWidth / 2 + 50 + '%'}>
          {children}
        </Box>
      </Stack>
      {footer && <Box px="xl">{footer}</Box>}
    </Stack>
  );
};

export default Page;
