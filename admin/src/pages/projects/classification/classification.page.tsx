import AppImage from '@/components/AppImage/AppImage';
import Page from '@/components/Page/Page';
import TablePagination from '@/components/TablePagination';
import { ActionIcon, Button } from '@mantine/core';
import {
  IconClock24,
  IconEdit,
  IconEye,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

const Classification = () => {
  return (
    <Page
      actions={[
        <Button leftSection={<IconPlus size={16} />} key="save">
          新增分类
        </Button>,
      ]}
    >
      <TablePagination
        rowkey="_id"
        columns={[
          {
            title: '分类图片',
            dataKey: 'picture',
            width: 80,
            render: ({ picture }) => {
              return <AppImage src={picture} w={40} h={40} />;
            },
          },
          {
            title: '分类名称',
            dataKey: 'name',
          },
          {
            title: '分类描述',
            dataKey: 'description',
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
            dataKey: 'action',
            width: 120,
            render: () => (
              <div>
                <ActionIcon variant="subtle" color="green">
                  <IconEye
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon variant="subtle" onClick={() => {}}>
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
            description: '这是分类0的描述',
            createdTime: '2023-10-01 12:00:00',
            children: [
              {
                _id: '0-1',
                picture:
                  'https://fantastic-trout-ppxx6g5xvxj3q5-3000.app.github.dev/image/png/2025040703/a55f5bdf-f549-4627-ba29-2d9a4ec98ad0.png',
                name: '分类0-1',
                description: '这是分类0-1的描述',
                createdTime: '2023-10-01 12:00:00',
              },
            ],
          },
          {
            _id: '1',
            name: '分类1',
            picture:
              'https://fantastic-trout-ppxx6g5xvxj3q5-3000.app.github.dev/image/png/2025040703/a55f5bdf-f549-4627-ba29-2d9a4ec98ad0.png',
            description: '这是分类1的描述',
            createdTime: '2023-10-02 12:00:00',
          },
          {
            _id: '2',
            name: '分类2',
            picture:
              'https://fantastic-trout-ppxx6g5xvxj3q5-3000.app.github.dev/image/png/2025040703/a55f5bdf-f549-4627-ba29-2d9a4ec98ad0.png',
            description: '这是分类2的描述',
            createdTime: '2023-10-03 12:00:00',
          },
        ]}
      />
    </Page>
  );
};

export default Classification;
