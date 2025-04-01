import {
  AdmintorPaginationResultDto,
  admintorsControllerGetPageList,
} from '@/client';
import Page from '@/components/Page';
import TablePage, { TablePageProps } from '@/components/TablePage';
import { Button } from '@mantine/core';
import { useMounted } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export default () => {
  const [data, setData] = useState<AdmintorPaginationResultDto>();
  const getData = async () => {
    const res = await admintorsControllerGetPageList({
      method: 'POST',

      query: {
        pageNo: 1,
        pageSize: 10,
      },
      body: {},
    });
    console.log(res);
  };
  useEffect(() => {
    getData();
  }, []);
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
