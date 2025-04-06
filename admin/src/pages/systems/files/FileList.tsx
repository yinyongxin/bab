import { filesControllerGetDirsPagination } from '@/client';
import TablePage from '@/components/TablePage';
import { Box, Flex, Select, Tabs } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useState } from 'react';

type FileListProps = {
  dirPath: string;
};
const FileList = (props: FileListProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
  const getFileTypes = async () => {
    const getDirsRes = await filesControllerGetDirsPagination({
      body: {
        dirPath: props.dirPath,
      },
    });
    if (!getDirsRes.error) {
      setFileTypes(getDirsRes.data?.list || []);
      setActiveTab(`/${getDirsRes.data?.list[0]}`);
    }
  };

  const getDates = async (dirPath: string) => {
    const getDatesRes = await filesControllerGetDirsPagination({
      body: {
        dirPath: props.dirPath + dirPath,
      },
    });
    if (!getDatesRes.error) {
      setDateList(getDatesRes.data?.list || []);
    }
  };

  useShallowEffect(() => {
    getFileTypes();
  }, [props.dirPath]);

  useShallowEffect(() => {
    if (!activeTab) return;
    getDates(activeTab);
  }, [activeTab]);
  return (
    <Flex gap="md">
      <Tabs value={activeTab} onChange={setActiveTab} orientation="vertical">
        <Tabs.List>
          {fileTypes.map((fileType) => (
            <Tabs.Tab key={fileType} value={`/${fileType}`}>
              {fileType}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <Box flex={1}>
        <Flex justify="flex-end">
          <Select data={dateList}></Select>
        </Flex>
        <TablePage
          columns={[
            {
              title: '文件名',
              dataKey: 'name',
            },
            {
              title: '文件类型',
              dataKey: 'type',
            },
            {
              title: '文件大小',
              dataKey: 'size',
            },
            {
              title: '创建时间',
              dataKey: 'createTime',
            },
            {
              title: '修改时间',
              dataKey: 'udpateTime',
            },
            {
              title: '操作',
              dataKey: 'operation',
            },
          ]}
          dataList={[]}
          rowkey={'size'}
        ></TablePage>
      </Box>
    </Flex>
  );
};

export default FileList;
