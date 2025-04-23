import {
  ActionIcon,
  Center,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  MantineSpacing,
  MantineStyleProps,
  Menu,
  Pagination,
  PaginationProps,
  Paper,
  ScrollArea,
  Stack,
  Table,
  TableProps,
  TableTdProps,
  TableThProps,
  Tooltip,
} from '@mantine/core';
import { Key, useRef, useState } from 'react';
import Empty from '../Empty/Empty';
import classes from './TablePagination.module.css';
import {
  IconMaximize,
  IconMinimize,
  IconSpacingVertical,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { Option } from '@/@types';
import { getPageTotal } from '@/utils';

type Column<
  D = Record<string, any>,
  O extends string | number | symbol = any,
> = {
  title: React.ReactNode;
  dataKey?: keyof D | 'action';
  render?: (values: D) => React.ReactNode;
  thProps?: TableThProps;
  tdProps?: TableTdProps;
  prefix?: (values: D) => React.ReactNode;
  width?: MantineStyleProps['w'];
  options?: Option<O>[];
  optionsObj?: Record<O, Option<O>>;
};

export type TablePaginationProps<D = Record<string, any>> = {
  columns: Column<D>[];
  dataList: D[];
  rowkey: keyof D;
  pagination?: {
    pageNo: number;
    pageSize: number;
    total: number;
    onChange: (value: number) => void;
  };
  paginationProps?: PaginationProps;
  tableProps?: TableProps;
  loading?: boolean;
  title?: React.ReactNode;
};

function TablePagination<D = Record<string, any>>(
  props: TablePaginationProps<D>,
) {
  const {
    paginationProps,
    pagination,
    tableProps,
    dataList,
    rowkey,
    loading,
    title,
  } = props;
  const [scrolled, setScrolled] = useState(false);
  const [verticalSpacing, setVerticalSpacing] = useState<MantineSpacing>('md');
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const toggle = () => {
    if (!ref.current) {
      return;
    }
    if (!fullscreen) {
      ref.current.style.position = 'fixed';
      ref.current.style.inset = '0';
      ref.current.style.zIndex = '102';
    } else {
      ref.current.style.position = 'relative';
      ref.current.style.inset = 'unset';
      ref.current.style.zIndex = 'unset';
    }
    setFullscreen(!fullscreen);
  };
  const getTableHeader = () => {
    return (
      <Table.Thead
        className={clsx(classes.header, { [classes.scrolled]: scrolled })}
      >
        <Table.Tr>
          {props.columns.map((column) => {
            return (
              <Table.Th
                key={`${column.title}`}
                w={column.width}
                {...column.thProps}
              >
                {column.title}
              </Table.Th>
            );
          })}
        </Table.Tr>
      </Table.Thead>
    );
  };

  const getTableBody = () => (
    <Table.Tbody>
      {dataList.map((data) => (
        <Table.Tr key={data[rowkey] as Key}>
          {props.columns.map((column) => {
            let tdContent;
            if (column.render || column.dataKey === 'action') {
              tdContent = column.render?.(data);
            } else if (column.dataKey) {
              tdContent = data[column.dataKey];
              if (column.options) {
                tdContent = column.options.find(
                  (option) => option.value === data[column.dataKey as keyof D],
                )?.renderContent;
              } else if (column.optionsObj) {
                tdContent =
                  column.optionsObj[data[column.dataKey as keyof D]]
                    ?.renderContent;
              }
            }

            if (column.prefix) {
              tdContent = (
                <Group align="center" gap="xs">
                  {column.prefix(data)}
                  <>{tdContent}</>
                </Group>
              );
            }
            return (
              <Table.Td
                key={`${data[rowkey]}-${column.title}`}
                {...column.tdProps}
                w={column.width}
              >
                <>{tdContent}</>
              </Table.Td>
            );
          })}
        </Table.Tr>
      ))}
    </Table.Tbody>
  );

  const toolList = [
    {
      key: 'verticalSpacing',
      icon: (
        <Menu key="verticalSpacing" shadow="md" width={100}>
          <Menu.Target>
            <Tooltip label="行间距">
              <ActionIcon key="verticalSpacing" variant="subtle">
                <IconSpacingVertical />
              </ActionIcon>
            </Tooltip>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                setVerticalSpacing('xs');
              }}
              bg={
                verticalSpacing === 'xs' ? 'var(--mantine-primary-color-1)' : ''
              }
            >
              <Center>xs</Center>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setVerticalSpacing('sm');
              }}
              bg={
                verticalSpacing === 'sm' ? 'var(--mantine-primary-color-1)' : ''
              }
            >
              <Center>sm</Center>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setVerticalSpacing('md');
              }}
              bg={
                verticalSpacing === 'md' ? 'var(--mantine-primary-color-1)' : ''
              }
            >
              <Center>md</Center>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setVerticalSpacing('lg');
              }}
              bg={
                verticalSpacing === 'lg' ? 'var(--mantine-primary-color-1)' : ''
              }
            >
              <Center>lg</Center>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setVerticalSpacing('xl');
              }}
              bg={
                verticalSpacing === 'xl' ? 'var(--mantine-primary-color-1)' : ''
              }
            >
              <Center>xl</Center>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
    {
      key: 'fullscreen',
      icon: (
        <Tooltip key="fullscreen" label={fullscreen ? '取消全屏' : '全屏'}>
          <ActionIcon
            key="fullscreen"
            onClick={() => {
              toggle();
            }}
            variant="subtle"
          >
            {fullscreen ? <IconMinimize /> : <IconMaximize />}
          </ActionIcon>
        </Tooltip>
      ),
    },
  ];

  const paginationRender = () => {
    if (!pagination) {
      return null;
    }
    return (
      <footer>
        <Divider />
        <Flex justify="flex-end" p="md">
          <Pagination
            total={getPageTotal(pagination?.total, pagination?.pageSize)}
            value={pagination?.pageNo}
            onChange={pagination?.onChange}
            {...paginationProps}
          />
        </Flex>
      </footer>
    );
  };
  return (
    <Paper
      pos="relative"
      flex={1}
      ref={ref}
      shadow="xs"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <header>
        <Flex justify="space-between">
          {title ? title : <div />}
          <Group p="sm" gap="xs">
            {toolList.map((tool) => tool.icon)}
          </Group>
        </Flex>
      </header>
      <Divider />
      <Stack pos="relative" flex={1} style={{ overflow: 'auto' }}>
        <LoadingOverlay
          visible={loading}
          zIndex={50}
          loaderProps={{ type: 'bars' }}
          overlayProps={{
            blur: 2,
          }}
        />

        <ScrollArea
          style={{ overflow: 'hidden' }}
          flex={1}
          type="auto"
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          {/* <Table.ScrollContainer minWidth={500} type="native"> */}

          <Table
            verticalSpacing={verticalSpacing}
            stickyHeader={false}
            {...tableProps}
          >
            {getTableHeader()}
            {getTableBody()}
          </Table>
          {/* </Table.ScrollContainer> */}
          {dataList.length === 0 && <Empty />}
        </ScrollArea>
      </Stack>
      {paginationRender()}
    </Paper>
  );
}

export default TablePagination;
