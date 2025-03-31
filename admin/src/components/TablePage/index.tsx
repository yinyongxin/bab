import { Pagination, PaginationProps, Table, TableProps } from '@mantine/core';
import { Key } from 'react';
export type TablePageProps<D> = {
  paginationProps?: PaginationProps;
  tableProps?: TableProps;
  columns: {
    title: React.ReactNode;
    dataKey: keyof D;
  }[];
  dataList: D[];
  rowkey: keyof D;
};

function TablePage<D = unknown>(props: TablePageProps<D>) {
  const { paginationProps, tableProps, dataList, rowkey } = props;
  const getTableHeader = () => {
    return (
      <Table.Thead>
        <Table.Tr>
          {props.columns.map((column) => {
            return (
              <Table.Th key={column.dataKey as Key}>{column.title}</Table.Th>
            );
          })}
        </Table.Tr>
      </Table.Thead>
    );
  };

  const rows = dataList.map((data) => (
    <Table.Tr key={data[rowkey] as Key}>
      {props.columns.map((column) => {
        return (
          <Table.Td key={column.dataKey as Key}>
            <>{data[column.dataKey]}</>
          </Table.Td>
        );
      })}
    </Table.Tr>
  ));
  return (
    <div>
      <Table {...tableProps}>
        {getTableHeader()}
        {rows}
      </Table>
      <Pagination total={0} {...paginationProps} />
    </div>
  );
}

export default TablePage;
