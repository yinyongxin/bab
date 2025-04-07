import {
  FilesPaginationResultDto,
  filesControllerGetPaginationList,
} from '@/client';
import Page from '@/components/Page';
import { Stack, Tabs, Title, Text, Anchor } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useState } from 'react';
import TablePage from '@/components/TablePage';
import { IconClock24 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import appConfig from '@/configs/app.config';
import { decode } from 'punycode';
import { getFilePath } from '@/utils';

export default () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [data, setData] = useState<FilesPaginationResultDto>();
  const [dirList, setDirList] = useState<string[]>([]);

  const getDate = async (pagination: { pageNo: number; pageSize?: number }) => {
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
    getDate({
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
          ]}
          dataList={data?.list || []}
          rowkey={'_id'}
        ></TablePage>
      </Page>
    </>
  );
};
