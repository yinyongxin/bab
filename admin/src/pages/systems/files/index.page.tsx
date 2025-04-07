import {
  FilesPaginationResultDto,
  FilesResultDto,
  filesControllerBatchDelete,
  filesControllerGetPaginationList,
} from '@/client';
import Page from '@/components/Page';
import { Stack, Tabs, Title, Text, Anchor, ActionIcon } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useState } from 'react';
import TablePage from '@/components/TablePage';
import { IconClock24, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import appConfig from '@/configs/app.config';
import { decode } from 'punycode';
import { getFilePath } from '@/utils';
import { modals } from '@mantine/modals';

export default () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [data, setData] = useState<FilesPaginationResultDto>();
  const [dirList, setDirList] = useState<string[]>([]);

  const getData = async (pagination: { pageNo: number; pageSize?: number }) => {
    const { pageNo, pageSize = 10 } = pagination;
    const getDirsRes = await filesControllerGetPaginationList({
      query: {
        pageNo,
        pageSize,
      },
      body: {},
    });
    if (!getDirsRes.error) {
      setData(getDirsRes.data);
    }
  };

  useShallowEffect(() => {
    getData({
      pageNo: 1,
    });
  }, []);
  const tabsRender = () => {
    return (
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          {dirList.map((item) => (
            <Tabs.Tab key={item} value={`/${item}`}>
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    );
  };

  const deleteById = async (record: FilesResultDto) => {
    modals.openConfirmModal({
      title: '确认删除当前文件？',
      centered: true,
      children: <Text size="sm">请注意，删除文件后，将无法恢复。</Text>,
      labels: { confirm: '删除', cancel: '取消' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await filesControllerBatchDelete({
          body: {
            fileList: [record],
          },
        });
        await getData({
          pageNo: data?.pageNo || 1,
        });
      },
    });
  };

  return (
    <>
      <Page title="文件管理" headerBottom={tabsRender()}>
        <TablePage
          columns={[
            {
              title: '文件名',
              dataKey: 'originalname',
              render: ({ originalname, uniquedName, path }) => {
                return (
                  <Stack>
                    <Anchor href={getFilePath(path)} target="_blank">
                      <Title order={6}>{decodeURI(originalname)}</Title>
                    </Anchor>
                    <Text size="sm" c="dimmed">
                      {uniquedName}
                    </Text>
                  </Stack>
                );
              },
            },
            {
              title: '文件类型',
              dataKey: 'mimetype',
            },
            {
              title: '文件大小',
              dataKey: 'size',
              render: ({ size }) => {
                if (size < 1024) {
                  return size + 'B';
                } else if (size < 1024 * 1024) {
                  return (size / 1024).toFixed(2) + 'KB';
                } else {
                  return (size / 1024 / 1024).toFixed(2) + 'MB';
                }
              },
            },
            {
              title: '创建时间',
              dataKey: 'createdTime',
              prefix: () => <IconClock24 size={16} />,
              render: ({ createdTime }) => {
                return dayjs(createdTime).format(appConfig.dateTimeFormat);
              },
            },
            {
              title: '修改时间',
              dataKey: 'updatedTime',
              prefix: () => <IconClock24 size={16} />,
              render: ({ createdTime }) => {
                return dayjs(createdTime).format(appConfig.dateTimeFormat);
              },
            },
            {
              title: '操作',
              width: 110,
              render: (record) => {
                return (
                  <>
                    <Anchor href={getFilePath(record.path)} target="_blank">
                      <ActionIcon variant="transparent" color="green">
                        <IconEye
                          style={{ width: '70%', height: '70%' }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Anchor>
                    <ActionIcon variant="transparent" onClick={() => {}}>
                      <IconEdit
                        style={{ width: '70%', height: '70%' }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="transparent"
                      color="red"
                      onClick={() => {
                        deleteById(record);
                      }}
                    >
                      <IconTrash
                        style={{ width: '70%', height: '70%' }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </>
                );
              },
            },
          ]}
          dataList={data?.list || []}
          rowkey={'_id'}
        ></TablePage>
      </Page>
    </>
  );
};
