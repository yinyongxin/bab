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
    width?: string | number;
    prefix?: (values: D) => React.ReactNode;
  }[];
  dataList: D[];
  rowkey: keyof D;
  loading?: boolean;
};

function TablePage<D = Record<string, any>>(props: TablePageProps<D>) {
  const { paginationProps, tableProps, dataList, rowkey, loading } = props;
  const getTableHeader = () => {
    return (
      <Table.Thead>
        <Table.Tr>
          {props.columns.map((column, columnIndex) => {
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
      <Flex direction="column" gap={16}>
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
    </Box>
  );
}

export default TablePage;
