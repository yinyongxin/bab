import Page from '@/components/Page';
import TablePage, { TablePageProps } from '@/components/TablePage';
import { Button } from '@mantine/core';

export default () => {
  const columns: TablePageProps<{
    a: string;
    b: string;
    c: string;
    d: string;
  }>['columns'] = [
    {
      title: 'Element position',
      dataKey: 'a',
    },
    {
      title: 'Atomic mass',
      dataKey: 'b',
    },
    {
      title: 'Symbol',
      dataKey: 'c',
    },
    {
      title: 'Element name',
      dataKey: 'd',
    },
  ];

  return (
    <>
      <Page
        title="管理人员"
        description="管理人员"
        actions={[<Button size="xs">添加人员</Button>]}
      >
        <TablePage<{
          a: string;
          b: string;
          c: string;
          d: string;
        }>
          columns={columns}
          dataList={[
            {
              a: 'a',
              b: 'b',
              c: 'c',
              d: 'd',
            },
          ]}
          rowkey={'a'}
        />
      </Page>
    </>
  );
};
