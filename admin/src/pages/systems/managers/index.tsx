import {
  AdmintorPaginationResultDto,
  AdmintorsResultDto,
  admintorsControllerGetPageList,
} from '@/client';
import Page from '@/components/Page';
import TablePage, { TablePageProps } from '@/components/TablePage';
import { Button } from '@mantine/core';
import { useMounted } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default () => {
  const [data, setData] = useState<AdmintorPaginationResultDto>();
  const getData = async (params: { pageNo: number }) => {
    const { pageNo } = params;
    const res = await admintorsControllerGetPageList({
      query: {
        pageNo,
        pageSize: 1,
      },
      body: {},
    });
    setData(res.data);
  };
  useEffect(() => {
    getData({
      pageNo: 1,
    });
  }, []);
  const columns: TablePageProps<AdmintorsResultDto>['columns'] = [
    {
      title: '管理员名称',
      dataKey: 'username',
    },
    {
      title: '邮箱',
      dataKey: 'email',
    },
    {
      title: '电话',
      dataKey: 'phone',
    },
    {
      title: '创建时间',
      render: ({ createdTime }) => {
        return dayjs(createdTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      render: (record) => {
        return (
          <Button size="xs" key={record?._id}>
            编辑
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Page
        title="管理人员"
        description="管理人员"
        actions={[
          <Button size="xs" key="add">
            添加人员
          </Button>,
        ]}
      >
        <TablePage<AdmintorsResultDto>
          columns={columns}
          dataList={data?.list || []}
          rowkey="_id"
          paginationProps={{
            total: (data?.total || 0) / (data?.pageSize || 0),
            value: data?.pageNo,
            onChange(value) {
              getData({
                pageNo: value,
              });
              console.log(value);
            },
          }}
        />
      </Page>
    </>
  );
};
