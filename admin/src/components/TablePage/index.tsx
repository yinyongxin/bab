import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  MantineStyleProps,
  Pagination,
  PaginationProps,
  Paper,
  ScrollArea,
  Stack,
  Table,
  TableProps,
  TableTdProps,
  TableThProps,
} from '@mantine/core';
import { Key, useState } from 'react';
import Empty from '../Empty/Empty';
import clsx from 'clsx';

import classes from './TablePage.module.css';
import { IconMaximize, IconMinimize } from '@tabler/icons-react';
import { useFullscreen } from '@mantine/hooks';

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
      key: 'fullscreen',
      title: '全屏',
      icon: (
        <ActionIcon
          onClick={() => {
            toggle();
          }}
          variant="subtle"
        >
          {fullscreen ? <IconMinimize /> : <IconMaximize />}
        </ActionIcon>
      ),
    },
  ];
  return (
    <Paper
      pos="relative"
      radius="md"
      style={{
        overflow: 'hidden',
      }}
      ref={ref}
    >
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        loaderProps={{ type: 'bars' }}
      />
      <Flex direction='column' h="100%">
        <header>
          <Flex justify="space-between">
            {title ? title : <div />}
            <Box p="sm">{toolList.map((tool) => tool.icon)}</Box>
          </Flex>
        </header>
          <Divider />
        <ScrollArea
          flex={1}
          type="always"
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          {/* <Table.ScrollContainer minWidth={500} type="native"> */}
          <Table verticalSpacing="md" stickyHeader={false} {...tableProps}>
            {getTableHeader()}
            {getTableBody()}
          </Table>
          {/* </Table.ScrollContainer> */}
          {dataList.length === 0 && <Empty />}
        </ScrollArea>
        <Divider />
        {paginationProps?.total ? (
          <footer>
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
