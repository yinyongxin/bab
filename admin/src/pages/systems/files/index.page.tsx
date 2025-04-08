import {
  FilesPaginationResultDto,
  FilesResultDto,
  filesControllerBatchDelete,
  filesControllerGetPaginationList,
  filesControllerUpdateFile,
} from '@/client';
import Page from '@/components/Page';
import {
  Stack,
  Title,
  Text,
  Anchor,
  ActionIcon,
  Flex,
  FileButton,
  Chip,
  Group,
  Button,
  CopyButton,
  Tooltip,
} from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useState } from 'react';
import TablePage from '@/components/TablePage';
import {
  IconCheck,
  IconClock24,
  IconCopy,
  IconEdit,
  IconEye,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import appConfig from '@/configs/app.config';
import { getFilePath, getPageTotal, uploadFile } from '@/utils';
import { modals } from '@mantine/modals';
import { FileMIMEOptions } from './constants';

export default () => {
  const [data, setData] = useState<FilesPaginationResultDto>({
    list: [],
    pageNo: 1,
    pageSize: 10,
    total: 0,
  });
  const [fileMIMEChecked, setFileMIMEChecked] = useState<string>();
  const getData = async (pagination?: {
    pageNo?: number;
    pageSize?: number;
  }) => {
    const { pageNo = data.pageNo, pageSize = data.pageSize } = {
      ...pagination,
    };
    const getDirsRes = await filesControllerGetPaginationList({
      query: {
        pageNo,
        pageSize,
      },
      body: {
        mimetype: fileMIMEChecked,
      },
    });
    if (!getDirsRes.error) {
      setData(getDirsRes.data);
    }
  };

  useShallowEffect(() => {
    getData();
  }, [fileMIMEChecked]);

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
          pageNo: data?.pageNo,
        });
      },
    });
  };

  const bodyTop = () => {
    return (
      <Stack>
        <Flex gap="md">
          <Title order={6} lh={2} textWrap="nowrap">
            文件类型:
          </Title>
          <Group>
            <Chip
              checked={!fileMIMEChecked}
              onClick={() => {
                setFileMIMEChecked(undefined);
              }}
            >
              全部
            </Chip>
            {FileMIMEOptions.map((item) => {
              return (
                <Chip
                  key={item.value}
                  checked={fileMIMEChecked === item.value}
                  onClick={() => {
                    setFileMIMEChecked(item.value);
                  }}
                >
                  {item.label}
                </Chip>
              );
            })}
          </Group>
        </Flex>
      </Stack>
    );
  };

  return (
    <>
      <Page
        title="文件管理"
        bodyTop={bodyTop()}
        onReload={async () => {
          await getData();
        }}
        actions={[
          <FileButton
            key="upload"
            onChange={async (file) => {
              await uploadFile(file);
              getData();
            }}
            accept={fileMIMEChecked}
          >
            {(props) => (
              <Button {...props} leftSection={<IconUpload size={14} />}>
                上传文件
              </Button>
            )}
          </FileButton>,
        ]}
      >
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
                  return `${size}B`;
                } else if (size < 1024 * 1024) {
                  return `${(size / 1024).toFixed(2)}KB`;
                }
                return `${(size / 1024 / 1024).toFixed(2)}MB`;
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
              render: ({ updatedTime }) => {
                return dayjs(updatedTime).format(appConfig.dateTimeFormat);
              },
            },
            {
              title: '操作',
              width: 140,
              render: (record) => {
                return (
                  <>
                    <CopyButton value={getFilePath(record.path)}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
                          <ActionIcon
                            color={copied ? 'teal' : 'gray'}
                            variant="subtle"
                            onClick={copy}
                          >
                            {copied ? (
                              <IconCheck size={16} />
                            ) : (
                              <IconCopy size={16} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                    <Anchor href={getFilePath(record.path)} target="_blank">
                      <ActionIcon variant="transparent" color="green">
                        <IconEye
                          style={{ width: '70%', height: '70%' }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Anchor>
                    <FileButton
                      onChange={async (file) => {
                        if (!file) {
                          return;
                        }
                        const newFile = new File([file], encodeURI(file.name), {
                          type: file.type,
                        });
                        const res = await filesControllerUpdateFile({
                          body: {
                            file: newFile,
                            fileInfo: {
                              path: record.path,
                              _id: record._id,
                            },
                          },
                        });
                        if (res.data) {
                          getData({
                            pageNo: data?.pageNo,
                          });
                        }
                      }}
                      accept={record.mimetype}
                    >
                      {(props) => (
                        <ActionIcon {...props} variant="transparent">
                          <IconEdit
                            style={{ width: '70%', height: '70%' }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      )}
                    </FileButton>

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
    </>
  );
};
