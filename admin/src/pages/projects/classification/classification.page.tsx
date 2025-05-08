import AppImage from '@/components/AppImage/AppImage';
import Page from '@/components/Page/Page';
import TablePagination from '@/components/TablePagination';
import { ActionIcon, Button, Modal, Switch } from '@mantine/core';
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
import { projectClassificationsControllerGetTreeData } from '@/client';

const Classification = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, loadingAction] = useDisclosure(false);
  const [title, setTitle] = useState('');
  const [initalValues, setInitalValues] = useState();
  const [dataList, setDataList] = useState<any[]>([]);
  const getData = async () => {
    loadingAction.open();
    const res = await projectClassificationsControllerGetTreeData();
    setDataList(res?.data || []);
    loadingAction.close();
  };
  useEffect(() => {
    getData();
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
          dataList={dataList}
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
