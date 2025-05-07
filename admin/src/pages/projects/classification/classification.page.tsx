import AppImage from '@/components/AppImage/AppImage';
import Page from '@/components/Page/Page';
import TablePagination from '@/components/TablePagination';
import { ActionIcon, Button, Modal, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconClock24,
  IconEdit,
  IconEye,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import UpdateClassification from './UpdateClassification';

const Classification = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, loadingAction] = useDisclosure(false);
  const [title, setTitle] = useState('');
  const [initalValues, setInitalValues] = useState();
  const getData = async (params: any) => {
    console.log('params', params);
    loadingAction.open();
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loadingAction.close();
    return {
      total: 100,
      data: [],
    };
  };
  useEffect(() => {
    getData({ page: 1, pageSize: 10 });
  }, []);

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
                return <AppImage src={picture} w={40} h={40} />;
              },
            },
            {
              title: '分类描述',
              dataKey: 'description',
            },
            {
              title: '状态',
              dataKey: 'status',
              render: ({ status }) => {
                return <Switch checked={status === 'open'} />;
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
                    color="green"
                    onClick={() => {
                      setTitle('查看分类');
                      setInitalValues(values);
                      open();
                    }}
                  >
                    <IconEye
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
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
                  <ActionIcon variant="subtle" color="red" onClick={() => {}}>
                    <IconTrash
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </div>
              ),
            },
          ]}
          dataList={[
            {
              _id: '0',
              picture:
                'https://fantastic-trout-ppxx6g5xvxj3q5-3000.app.github.dev/image/png/2025040703/a55f5bdf-f549-4627-ba29-2d9a4ec98ad0.png',
              name: '分类0',
              status: 'open',
              description: '这是分类0的描述',
              createdTime: '2023-10-01 12:00:00',
              children: [
                {
                  _id: '0-1',
                  picture:
                    'https://fantastic-trout-ppxx6g5xvxj3q5-3000.app.github.dev/image/png/2025040703/a55f5bdf-f549-4627-ba29-2d9a4ec98ad0.png',
                  name: '分类0-1',
                  status: 'closed',
                  description: '这是分类0-1的描述',
                  createdTime: '2023-10-01 12:00:00',
                },
              ],
            },
          ]}
        />
      </Page>
      <Modal
        size="md"
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
        <UpdateClassification
          initalValues={initalValues}
          onSuccess={() => {
            close();
          }}
        />
      </Modal>
    </>
  );
};

export default Classification;
