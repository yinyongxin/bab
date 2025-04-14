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
  useDocumentTitle,
  useShallowEffect,
  useWindowScroll,
} from '@mantine/hooks';
import { IconArrowLeft, IconReload } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { LayoutTypes } from '@/@types/layout';
import useAppConfig from '@/store/hook/useAppConfig';
import { Fragment } from 'react/jsx-runtime';
import { useAppSelector } from '@/store';
import { ReactNode, useMemo } from 'react';
import { MenuTypeEnum } from '@/client';

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
  tabs?: React.ReactNode;
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
    tabs,
    ...rest
  } = props;

  const { list } = useAppSelector((state) => state.auth.menus);
  const location = useLocation();
  const defaultInfo = useMemo(() => {
    const pageList = list.filter((item) => item.menuType === MenuTypeEnum.PAGE);
    const currentPath = location.pathname.split('/');
    const currentSubLink = currentPath[2];
    return pageList.find((item) => item.path === currentSubLink);
  }, [list]);

  useDocumentTitle(title || '');

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

  const titleRender = () => {
    let text = defaultInfo?.name;
    if (title) {
      text = title;
    }
    return <Title order={3}>{text}</Title>;
  };

  const reloadBtnRender = () => {
    if (!onReload) {
      return null;
    }
    return (
      <ActionIcon
        size="md"
        variant="transparent"
        className={clsx({ spin: loading })}
        onClick={reload}
      >
        <IconReload />
      </ActionIcon>
    );
  };

  const actionsRender = () => {
    if (!actions || actions.length === 0) {
      return;
    }
    return (
      <Group>
        {actions.map((action, index) => (
          <Fragment key={index}>{action}</Fragment>
        ))}
      </Group>
    );
  };

  const backBtnRender = () => {
    if (!showBack) {
      return null;
    }
    return (
      <ActionIcon
        size="md"
        variant="gradient"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IconArrowLeft />
      </ActionIcon>
    );
  };

  const descriptionRender = () => {
    let text: ReactNode = defaultInfo?.description;
    if (description) {
      text = description;
    }
    return (
      <Text lineClamp={2} c="dimmed">
        {text}
      </Text>
    );
  };
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
        pb={tabs ? 0 : 'md'}
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
            {backBtnRender()}
            {titleRender()}
            {reloadBtnRender()}
          </Group>
          {actionsRender()}
        </Flex>
        {descriptionRender()}
        {headerBottom}
        {tabs}
      </Stack>
      {bodyTop && <Box px="xl">{bodyTop}</Box>}
      <Box px="xl" w={`${appConfig.contentWidth / 2 + 50}%`} m="0 auto">
        {children}
      </Box>
      {footer && <Box px="xl">{footer}</Box>}
    </Stack>
  );
};

export default Page;
