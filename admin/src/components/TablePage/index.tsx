import {
  ActionIcon,
  Box,
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
  Table,
  TableProps,
  TableTdProps,
  TableThProps,
  Tooltip,
} from '@mantine/core';
import { Key, useRef, useState } from 'react';
import Empty from '../Empty/Empty';
import classes from './TablePage.module.css';
import {
  IconMaximize,
  IconMinimize,
  IconSpacingVertical,
} from '@tabler/icons-react';
import { useFullscreen } from '@mantine/hooks';
import clsx from 'clsx';

export type TablePageProps<D> = {
  columns: {
    title: React.ReactNode;
    dataKey?: keyof D;
    render?: (values: D) => React.ReactNode;
    thProps?: TableThProps;
    tdProps?: TableTdProps;
    prefix?: (values: D) => React.ReactNode;
    width?: MantineStyleProps['w'];
  }[];
  dataList: D[];
  rowkey: keyof D;
  paginationProps?: PaginationProps;
  tableProps?: TableProps;
  loading?: boolean;
  title?: React.ReactNode;
};

function TablePage<D = Record<string, any>>(props: TablePageProps<D>) {
  const { paginationProps, tableProps, dataList, rowkey, loading, title } =
    props;
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
            if (column.render) {
              tdContent = column.render(data);
            } else if (column.dataKey) {
              tdContent = data[column.dataKey];
            }
            if (column.prefix) {
              tdContent = (
                <Flex align="center" gap="xs">
                  {column.prefix(data)}
                  <>{tdContent}</>
                </Flex>
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
  return (
    <Paper pos="relative" flex={1} ref={ref} shadow="xs">
      <Flex direction="column" flex={1}>
        <header>
          <Flex justify="space-between">
            {title ? title : <div />}
            <Group p="sm" gap="xs">
              {toolList.map((tool) => tool.icon)}
            </Group>
          </Flex>
        </header>
        <Divider />
        <Box pos="relative">
          <LoadingOverlay
            visible={loading}
            zIndex={50}
            loaderProps={{ type: 'bars' }}
            overlayProps={{
              blur: 2,
            }}
            // style={{
            //   borderRadius: 'var(--mantine-radius-md)',
            // }}
          />

          <ScrollArea
            flex={1}
            type="always"
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
        </Box>
        {paginationProps?.total ? (
          <footer>
            <Divider />
            <Flex justify="flex-end" p="md">
              <Pagination {...paginationProps} />
            </Flex>
          </footer>
        ) : null}
      </Flex>
    </Paper>
  );
}

export default TablePage;
