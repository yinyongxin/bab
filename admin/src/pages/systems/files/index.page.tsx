import {
  FilesPaginationResultDto,
  FilesQueryFilterDto,
  FilesResultDto,
  filesControllerBatchDelete,
  filesControllerGetPaginationList,
  filesControllerUpdateFile,
} from '@/client';
import Page from '@/components/Page/Page';
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
  rem,
  Badge,
} from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useState } from 'react';
import TablePagination from '@/components/TablePagination';
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
import { getPageTotal, uploadFile } from '@/utils';
import { modals } from '@mantine/modals';
import useAppConfig from '@/store/hook/useAppConfig';
import DateRangeSelect from '@/components/DateRangeSelect/DateRangeSelect';
import useTools from '@/utils/hooks/useTools';
import { fileMIMEOptions } from '@/constants/options';

export default () => {
  const { getFilePath } = useTools();
  const [appConfig] = useAppConfig();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FilesPaginationResultDto>({
    list: [],
    pageNo: 1,
    pageSize: 10,
    total: 0,
  });
  const [filterParams, setFilterParams] = useState<FilesQueryFilterDto>({});
  const getData = async (pagination?: {
    pageNo?: number;
    pageSize?: number;
  }) => {
    setLoading(true);
    const { pageNo = data.pageNo, pageSize = data.pageSize } = {
      ...pagination,
    };
    const getDirsRes = await filesControllerGetPaginationList({
      query: {
        pageNo,
        pageSize,
      },
      body: {
        ...filterParams,
      },
    });
    if (!getDirsRes.error) {
      setData(getDirsRes.data);
    }
    setLoading(false);
  };

  useShallowEffect(() => {
    getData();
  }, [filterParams]);

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
          <Title order={6} lh={rem(28)} textWrap="nowrap">
            文件类型:
          </Title>
          <Group>
            <Chip
              checked={!filterParams.mimetype}
              onClick={() => {
                setFilterParams({ ...filterParams, mimetype: undefined });
              }}
            >
              全部
            </Chip>
            {fileMIMEOptions.map((item) => {
              return (
                <Chip
                  key={item.value}
                  checked={filterParams.mimetype === item.value}
                  onClick={() => {
                    setFilterParams({ ...filterParams, mimetype: item.value });
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
        headerBottom={bodyTop()}
        onReload={async () => {
          await getData();
        }}
        actions={[
          <DateRangeSelect
            key="DataRangerSelect"
            defaultValue="all"
            toDate
            onChange={(range) => {
              setFilterParams({
                dateTimeRange: { createdTime: range },
              });
            }}
          />,
          <FileButton
            key="upload"
            onChange={async (file) => {
              await uploadFile(file);
              getData();
            }}
            accept={filterParams.mimetype}
          >
            {(props) => (
              <Button {...props} leftSection={<IconUpload size={14} />}>
                上传文件
              </Button>
            )}
          </FileButton>,
        ]}
      >
        <TablePagination
          loading={loading}
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
              render: ({ mimetype }) => {
                return (
                  <Badge
                    variant="gradient"
                    gradient={{
                      from: 'var(--mantine-primary-color-filled)',
                      to: 'cyan',
                      deg: 90,
                    }}
                  >
                    {mimetype}
                  </Badge>
                );
              },
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
                      <ActionIcon variant="subtle" color="green">
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
                        <ActionIcon {...props} variant="subtle">
                          <IconEdit
                            style={{ width: '70%', height: '70%' }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      )}
                    </FileButton>

                    <ActionIcon
                      variant="subtle"
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
          pagination={{
            pageNo: data?.pageNo || 1,
            pageSize: data?.pageSize || 10,
            total: data?.total || 0,
            onChange: (page) => {
              getData({
                pageNo: page,
              });
            },
          }}
        />
      </Page>
    </>
  );
};
