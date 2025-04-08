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
  Table,
  TableProps,
  TableTdProps,
  TableThProps,
  Tooltip,
} from '@mantine/core';
import { Key, useState } from 'react';
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
  const { ref, toggle, fullscreen } = useFullscreen();
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
    <Paper pos="relative" radius="md" flex={1} ref={ref} shadow="xs">
      <LoadingOverlay
        visible={loading}
        zIndex={50}
        loaderProps={{ type: 'bars' }}
      />
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
