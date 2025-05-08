import AppImage from '@/components/AppImage/AppImage';
import Page from '@/components/Page/Page';
import TablePagination from '@/components/TablePagination';
import { ActionIcon, Button, Modal, Switch, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconClock24,
  IconEdit,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import UpdateClassification from './UpdateClassification';
import {
  projectClassificationsControllerDeleteByIds,
  projectClassificationsControllerGetTreeData,
  projectClassificationsControllerUpdateOne,
  ProjectClassificationsResultDto,
  ProjectClassificationsTreeDto,
  StatusEnum,
} from '@/client';
import { modals } from '@mantine/modals';
import useTools from '@/hooks/useTools';

const Classification = () => {
  const { getFilePath } = useTools();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, loadingAction] = useDisclosure(false);
  const [title, setTitle] = useState('');
  const [initalValues, setInitalValues] =
    useState<ProjectClassificationsResultDto>();
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [dataList, setDataList] = useState<ProjectClassificationsTreeDto[]>([]);

  const getData = async () => {
    loadingAction.open();
    const res = await projectClassificationsControllerGetTreeData();
    setDataList(res?.data || []);
    loadingAction.close();
  };

  useEffect(() => {
    getData();
  }, []);

  const updateStatus = async (
    params: Pick<ProjectClassificationsResultDto, '_id' | 'status'>,
  ) => {
    projectClassificationsControllerUpdateOne({
      query: {
        id: params._id,
      },
      body: {
        status: params.status,
      },
    });
    if (!dataList) {
      return;
    }
    setDataList(
      (dataList || []).map((item) => {
        if (item._id === params._id) {
          return {
            ...item,
            status: params.status,
          };
        }
        return item;
      }),
    );
  };

  const deleteById = async (id: string) => {
    modals.openConfirmModal({
      title: '确认删除当前分类？',
      centered: true,
      children: <Text size="sm">请注意，删除分类后，将无法恢复。</Text>,
      labels: { confirm: '删除', cancel: '取消' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          loadingAction.open();
          await projectClassificationsControllerDeleteByIds({
            body: {
              ids: [id],
            },
          });
          await getData();
        } finally {
          loadingAction.close();
        }
      },
    });
  };

  return (
    <>
      <Page
        actions={[
          <Button
            leftSection={<IconPlus size={16} />}
            key="save"
            onClick={() => {
              setTitle('新增分类');
              setInitalValues(undefined);
              open();
            }}
          >
            新增分类
          </Button>,
        ]}
      >
        <TablePagination
          loading={loading}
          rowkey="_id"
          columns={[
            {
              title: '分类名称',
              dataKey: 'name',
            },
            {
              title: '分类图片',
              width: 100,
              dataKey: 'picture',
              render: ({ picture }) => {
                return <AppImage src={getFilePath(picture)} w={40} h={40} />;
              },
            },
            {
              title: '分类描述',
              dataKey: 'description',
            },
            {
              title: '状态',
              dataKey: 'status',
              render: ({ _id, status }) => {
                return (
                  <Switch
                    checked={status === StatusEnum.OPEN}
                    onChange={(event) => {
                      updateStatus({
                        _id,
                        status: event.currentTarget.checked
                          ? StatusEnum.OPEN
                          : StatusEnum.CLOSE,
                      });
                    }}
                  />
                );
              },
            },
            {
              title: '创建时间',
              dataKey: 'createdTime',
              width: 200,
              prefix: () => <IconClock24 size={16} />,
              render: ({ createdTime }) => {
                return dayjs(createdTime).format('YYYY-MM-DD HH:mm:ss');
              },
            },
            {
              title: '操作',
              dataKey: 'action',
              width: 120,
              render: (values) => (
                <div>
                  <ActionIcon
                    variant="subtle"
                    onClick={() => {
                      setTitle('编辑分类');
                      setInitalValues(values);
                      open();
                    }}
                  >
                    <IconEdit
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="green"
                    onClick={() => {
                      setTitle('添加子类');
                      setParentId(values._id);
                      open();
                    }}
                  >
                    <IconPlus
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => {
                      deleteById(values._id);
                    }}
                  >
                    <IconTrash
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </div>
              ),
            },
          ]}
          dataList={dataList}
        />
      </Page>
      <Modal
        size="md"
        opened={opened}
        onClose={() => {
          close();
          setParentId(undefined);
          setInitalValues(undefined);
        }}
        title={title}
        centered
      >
        <UpdateClassification
          initalValues={initalValues}
          parentId={parentId}
          onSuccess={() => {
            close();
            getData();
          }}
        />
      </Modal>
    </>
  );
};

export default Classification;
