import {
  AdmintorPaginationResultDto,
  AdmintorsPageItemDto,
  AdmintorsResultDto,
  admintorsControllerDeleteByIds,
  admintorsControllerGetPageList,
  admintorsControllerUpdateOne,
} from '@/client';
import Page from '@/components/Page';
import TablePage, { TablePageProps } from '@/components/TablePage';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Flex,
  Text,
  Modal,
  Switch,
  Title,
} from '@mantine/core';
import { useDisclosure, useMounted } from '@mantine/hooks';
import {
  IconCheck,
  IconEdit,
  IconEye,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CreateManager from './CreateManager';
import { getFilePath } from '@/utils';

export default () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, loadingAction] = useDisclosure(false);
  const [data, setData] = useState<AdmintorPaginationResultDto>();
  const getData = async (params: { pageNo: number }) => {
    try {
      loadingAction.open();
      const { pageNo } = params;
      const res = await admintorsControllerGetPageList({
        query: {
          pageNo,
          pageSize: 1,
        },
        body: {},
      });

      setData(res.data);
    } finally {
      loadingAction.close();
    }
  };

  const updateStatus = async (
    params: Pick<AdmintorsResultDto, '_id' | 'status'>,
  ) => {
    admintorsControllerUpdateOne({
      query: {
        id: params._id,
      },
      body: {
        status: params.status,
      },
    });
    if (!data) {
      return;
    }
    setData({
      ...data,
      list: (data.list || []).map((item) => {
        if (item._id === params._id) {
          return {
            ...item,
            status: params.status,
          };
        }
        return item;
      }),
    });
  };

  useEffect(() => {
    getData({
      pageNo: 1,
    });
  }, []);

  const deleteById = async (id: string) => {
    try {
      loadingAction.open();
      await admintorsControllerDeleteByIds({
        body: {
          ids: [id],
        },
      });
      await getData({
        pageNo: 1,
      });
    } finally {
      loadingAction.close();
    }
  };

  const columns: TablePageProps<AdmintorsPageItemDto>['columns'] = [
    {
      title: '管理员',
      render(values) {
        return (
          <Flex gap={8} align="center">
            <Avatar src={getFilePath(values?.avatar || '')}></Avatar>
            <Flex direction="column">
              <Title order={6}>{values?.username}</Title>
              <Text size="sm" c="dimmed">
                {values?.email}
              </Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      title: '电话',
      dataKey: 'phone',
    },
    {
      title: '状态',
      dataKey: 'status',
      render: ({ _id, status }) => {
        return (
          <Switch
            checked={status === 'Open'}
            onClick={() => {
              updateStatus({
                _id,
                status: status === 'Open' ? 'Close' : 'Open',
              });
            }}
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
      title: '角色',
      dataKey: 'roles',
      render: ({ roles }) => {
        return roles.map((role) => {
          return (
            <Badge
              key={role._id}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
              {role.name}
            </Badge>
          );
        });
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
          <>
            <ActionIcon variant="transparent" color="green">
              <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="transparent">
              <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              color="red"
              onClick={() => {
                deleteById(record._id);
              }}
            >
              <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </>
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
          <Button size="xs" key="add" onClick={open}>
            添加人员
          </Button>,
        ]}
      >
        <TablePage<AdmintorsPageItemDto>
          loading={loading}
          columns={columns}
          dataList={data?.list || []}
          rowkey="_id"
          paginationProps={{
            total: Math.ceil((data?.total || 0) / (data?.pageSize || 0)),
            value: data?.pageNo,
            onChange(value) {
              getData({
                pageNo: value,
              });
            },
          }}
        />
      </Page>
      <Modal opened={opened} onClose={close} title="添加管理人员" centered>
        <CreateManager
          onSuccess={() => {
            close();
            getData({ pageNo: 1 });
          }}
        />
      </Modal>
    </>
  );
};
