import {
  AdmintorPaginationResultDto,
  AdmintorsFilterDto,
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
  Group,
  Stack,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCheck,
  IconClock24,
  IconEdit,
  IconEye,
  IconPhone,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import UpdateManager from './UpdateManager';
import { getPageTotal } from '@/utils';
import { modals } from '@mantine/modals';
import DateRangeSelect from '@/components/DateRangeSelect/DateRangeSelect';
import useTools from '@/utils/hooks/useTools';
import { sexOptions, sexOptionsObj } from '@/constants/options';
import Filter from '@/components/Filter/Filter';
import useFilter from '@/utils/hooks/useFilter';
export default () => {
  const { getFilePath } = useTools();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, loadingAction] = useDisclosure(false);
  const [title, setTitle] = useState('');
  const [data, setData] = useState<AdmintorPaginationResultDto>({
    list: [],
    pageNo: 1,
    pageSize: 10,
    total: 0,
  });
  const filter = useFilter<
    AdmintorsFilterDto & AdmintorsFilterDto['fuzzyFields']
  >(
    {
      initialValues: {},
      validate: {},
    },
    [
      {
        name: 'sex',
        options: sexOptions,
        placeholder: '请选择性别',
        label: '性别',
        defaultValue: undefined,
      },
      {
        name: 'username',
        label: '用户名',
        defaultValue: undefined,
      },
    ],
    {
      onDelete: (values) => {
        setFilterParams((state) => ({
          ...state,
          ...values,
        }));
      },
    },
  );

  const [initalValues, setInitalValues] = useState<AdmintorsPageItemDto>();
  const [filterParams, setFilterParams] = useState<AdmintorsFilterDto>({});
  const getData = async (params?: { pageNo?: number }) => {
    try {
      loadingAction.open();
      const { pageNo = data.pageNo } = params || {};
      const res = await admintorsControllerGetPageList({
        query: {
          pageNo,
          pageSize: 10,
        },
        body: {
          ...filterParams,
        },
      });
      if (res.data) {
        setData(res.data);
      }
    } finally {
      loadingAction.close();
    }
  };
  useEffect(() => {
    if (filterParams) {
      getData();
    }
  }, [filterParams]);

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
    modals.openConfirmModal({
      title: '确认删除当前管理员？',
      centered: true,
      children: <Text size="sm">请注意，删除管理员后，将无法恢复。</Text>,
      labels: { confirm: '删除', cancel: '取消' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
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
      },
    });
  };

  const columns: TablePageProps<AdmintorsPageItemDto>['columns'] = [
    {
      title: '管理员',
      render(values) {
        return (
          <Flex gap={8} align="center">
            <Avatar src={getFilePath(values?.avatar || '')} />
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
      prefix() {
        return <IconPhone size={16} />;
      },
    },
    {
      title: '性别',
      dataKey: 'sex',
      optionsObj: sexOptionsObj,
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
        return (
          <Group>
            {roles.map((role) => {
              return (
                <Badge
                  key={role._id}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                >
                  {role.name}
                </Badge>
              );
            })}
          </Group>
        );
      },
    },
    {
      title: '创建时间',
      dataKey: 'createdTime',
      prefix: () => <IconClock24 size={16} />,
      render: ({ createdTime }) => {
        return dayjs(createdTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      width: 120,
      render: (record) => {
        return (
          <>
            <ActionIcon variant="subtle" color="green">
              <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              onClick={() => {
                setTitle('编辑信息');
                setInitalValues(record);
                open();
              }}
            >
              <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
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

  const headerBottom = () => {
    const filterLength = filter.selccted.filter(Boolean).length;
    if (!filterLength) {
      return null;
    }
    return (
      <Stack>
        <Flex gap="md">
          <Title order={6} lh={rem(28)} textWrap="nowrap">
            筛选条件:
          </Title>
          {filter.selccted}
        </Flex>
      </Stack>
    );
  };

  return (
    <>
      <Page
        title="管理人员"
        description="欢迎使用管理员管理页面！"
        onReload={() => {
          getData();
        }}
        headerBottom={headerBottom()}
        actions={[
          <DateRangeSelect
            key="DataRangerSelect"
            defaultValue="all"
            toDate
            onChange={(value) => {
              setFilterParams({
                dateTimeRange: { createdTime: value },
              });
            }}
          />,
          <Filter
            onConfirm={(e, close) =>
              filter.form.onSubmit(async (values) => {
                const { username, ...rest } = values;
                setFilterParams((state) => {
                  return {
                    ...state,
                    ...rest,
                    fuzzyFields: { username: values.username },
                  };
                });
                close();
              })(e)
            }
            onCancel={() => {
              filter.form.setValues({
                sex: filterParams.sex,
              });
            }}
          >
            <Stack gap="sm">{filter.inputArea}</Stack>
          </Filter>,
          <Button
            key="add"
            onClick={() => {
              setTitle('添加人员');
              open();
            }}
          >
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
            total: getPageTotal(data?.total, data?.pageSize),
            value: data?.pageNo,
            onChange(value) {
              getData({
                pageNo: value,
              });
            },
          }}
        />
      </Page>
      <Modal
        size="lg"
        opened={opened}
        onClose={() => {
          close();
          if (initalValues) {
            setInitalValues(undefined);
          }
        }}
        title={title}
        centered
      >
        <UpdateManager
          initalValues={initalValues}
          onSuccess={() => {
            close();
            getData({ pageNo: 1 });
          }}
        />
      </Modal>
    </>
  );
};
