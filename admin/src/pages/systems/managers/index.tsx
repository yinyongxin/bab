import {
  AdmintorPaginationResultDto,
  AdmintorsResultDto,
  admintorsControllerGetPageList,
} from '@/client';
import Page from '@/components/Page';
import TablePage, { TablePageProps } from '@/components/TablePage';
import { Avatar, Button, Flex, Switch, Title } from '@mantine/core';
import { useMounted } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default () => {
  const [data, setData] = useState<AdmintorPaginationResultDto>();
  const getData = async (params: { pageNo: number }) => {
    const { pageNo } = params;
    const res = await admintorsControllerGetPageList({
      query: {
        pageNo,
        pageSize: 2,
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
      render(values) {
        return (
          <Flex gap={8} align="center">
            <Avatar src={values?.avatar}></Avatar>
            <Title order={6}>{values?.username}</Title>
          </Flex>
        );
      },
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
      title: '状态',
      dataKey: 'status',
      render: ({ status }) => {
        return (
          <Switch
            checked={status === 'Open'}
            color="teal"
            thumbIcon={
              status === 'Open' ? (
                <IconCheck
                  size={12}
                  color="var(--mantine-color-teal-6)"
                  stroke={3}
                />
              ) : (
                <IconX
                  size={12}
                  color="var(--mantine-color-red-6)"
                  stroke={3}
                />
              )
            }
          />
        );
      },
    },
    {
      title: '创建时间',
      dataKey: 'createdTime',
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
