import {
  Box,
  Flex,
  LoadingOverlay,
  Pagination,
  PaginationProps,
  Table,
  TableProps,
  TableTdProps,
  TableThProps,
} from '@mantine/core';
import { Key } from 'react';
export type TablePageProps<D> = {
  paginationProps?: PaginationProps;
  tableProps?: TableProps;
  columns: {
    title: React.ReactNode;
    dataKey?: keyof D;
    render?: (values: D) => React.ReactNode;
    thProps?: TableThProps;
    tdProps?: TableTdProps;
  }[];
  dataList: D[];
  rowkey: keyof D;
  loading?: boolean;
};

function TablePage<D = unknown>(props: TablePageProps<D>) {
  const { paginationProps, tableProps, dataList, rowkey, loading } = props;
  const getTableHeader = () => {
    return (
      <Table.Thead>
        <Table.Tr>
          {props.columns.map((column, columnIndex) => {
            return (
              <Table.Th key={`${column.title}`} {...column.thProps}>
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
        if (column.render) {
          return (
            <Table.Td
              key={`${data[rowkey]}-${column.title}`}
              {...column.tdProps}
            >
              {column.render(data)}
            </Table.Td>
          );
        }
        if (column.dataKey) {
          return (
            <Table.Td
              key={`${data[rowkey]}-${column.title}`}
              {...column.tdProps}
            >
              <>{data[column.dataKey]}</>
            </Table.Td>
          );
        }
      })}
    </Table.Tr>
  ));
  return (
    <Flex direction="column" gap={16} style={{ position: 'relative' }}>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
      />
      <Table.ScrollContainer minWidth={500}>
        <Table verticalSpacing="md" {...tableProps}>
          {getTableHeader()}
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Pagination
        total={0}
        {...paginationProps}
        style={{
          alignSelf: 'flex-end',
          ...paginationProps?.style,
        }}
      />
    </Flex>
  );
}

export default TablePage;
