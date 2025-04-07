import {
  Box,
  Divider,
  Flex,
  LoadingOverlay,
  Pagination,
  PaginationProps,
  ScrollArea,
  Table,
  TableProps,
  TableTdProps,
  TableThProps,
} from '@mantine/core';
import { Key, useState } from 'react';
import Empty from '../Empty/Empty';
import clsx from 'clsx';

import classes from './TablePage.module.css';

export type TablePageProps<D> = {
  columns: {
    title: React.ReactNode;
    dataKey?: keyof D;
    render?: (values: D) => React.ReactNode;
    thProps?: TableThProps;
    tdProps?: TableTdProps;
    prefix?: (values: D) => React.ReactNode;
    width?: string | number;
  }[];
  dataList: D[];
  rowkey: keyof D;
  paginationProps?: PaginationProps;
  tableProps?: TableProps;
  loading?: boolean;
};

function TablePage<D = Record<string, any>>(props: TablePageProps<D>) {
  const { paginationProps, tableProps, dataList, rowkey, loading } = props;
  const [scrolled, setScrolled] = useState(false);
  const getTableHeader = () => {
    return (
      <Table.Thead
        className={clsx(classes.header, { [classes.scrolled]: scrolled })}
        bg="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
      >
        <Table.Tr>
          {props.columns.map((column) => {
            return (
              <Table.Th
                key={`${column.title}`}
                {...column.thProps}
                style={{
                  width: column.width,
                  ...column.thProps?.style,
                }}
              >
                {column.title}
              </Table.Th>
            );
          })}
        </Table.Tr>
      </Table.Thead>
    );
  };

  const rows = dataList.map((data) => (
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
            style={{
              width: column.width,
              ...column.thProps?.style,
            }}
          >
            <>{tdContent}</>
          </Table.Td>
        );
      })}
    </Table.Tr>
  ));
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
      />
      <ScrollArea
        h="60vh"
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table verticalSpacing="md" {...tableProps}>
          {getTableHeader()}
          {dataList.length === 0 ? (
            <Empty />
          ) : (
            <Table.Tbody>{rows}</Table.Tbody>
          )}
        </Table>
      </ScrollArea>
      <Divider />
      <Flex justify="flex-end" mt="md">
        <Pagination total={0} {...paginationProps} />
      </Flex>
    </Box>
  );
}

export default TablePage;
