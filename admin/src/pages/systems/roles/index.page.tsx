import {
  RoleQueryPaginationResultDto,
  RolesResultDto,
  rolesControllerDeleteByIds,
  rolesControllerGetPageList,
} from '@/client';
import Page from '@/components/Page';
import {
  Button,
  Text,
  Modal,
  Image,
  Grid,
  Card,
  Title,
  ActionIcon,
  Divider,
  Flex,
  Pagination,
  Drawer,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import UpdateRole from './UpdateRole';
import {
  IconEdit,
  IconLayoutSidebarInactive,
  IconTrash,
} from '@tabler/icons-react';
import { getFilePath, getPageTotal } from '@/utils';
import { modals } from '@mantine/modals';
import MenusCheck from './MenusCheck';

export default () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpened, drawerOpenedAition] = useDisclosure(false);
  const [title, setTitle] = useState('');
  const [initalValues, setInitalValues] = useState<RolesResultDto>();
  const [, loadingAction] = useDisclosure(false);
  const [data, setData] = useState<RoleQueryPaginationResultDto>();
  const getData = async (params: { pageNo: number }) => {
    try {
      loadingAction.open();
      const { pageNo } = params;
      const res = await rolesControllerGetPageList({
        query: {
          pageNo,
          pageSize: 8,
        },
        body: {},
      });

      setData(res.data);
    } finally {
      loadingAction.close();
    }
  };

  useEffect(() => {
    getData({
      pageNo: 1,
    });
  }, []);

  const deleteById = async (id: string) => {
    modals.openConfirmModal({
      title: '确认删除当前角色？',
      centered: true,
      children: <Text size="sm">请注意，删除角色后，将无法恢复。</Text>,
      labels: { confirm: '删除', cancel: '取消' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          loadingAction.open();
          await rolesControllerDeleteByIds({
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

  return (
    <>
      <Page
        title="人员角色"
        description="管理人员角色"
        actions={[
          <Button
            key="add"
            onClick={() => {
              setTitle('添加管理人员');
              open();
            }}
          >
            添加角色
          </Button>,
        ]}
        footer={
          <Flex justify="flex-end">
            <Pagination
              total={getPageTotal(data?.total, data?.pageSize)}
              value={data?.pageNo}
              onChange={(value) => {
                getData({
                  pageNo: value,
                });
              }}
            />
          </Flex>
        }
      >
        <Grid mt={0}>
          {data?.list.map((item) => {
            return (
              <Grid.Col
                key={item._id}
                span={{
                  sm: 12,
                  md: 8,
                  lg: 4,
                  xl: 2,
                }}
              >
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section bg="gray.1">
                    <Image
                      src={getFilePath(item.icon)}
                      height={200}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Title order={4} mt="md">
                    {item.name}
                  </Title>

                  <Text size="sm" c="dimmed" lineClamp={2} h="48">
                    {item.description}
                  </Text>
                  <Divider />
                  <Card.Section pb="md">
                    <Flex justify="space-around" pt="md" px="md">
                      <ActionIcon
                        variant="transparent"
                        onClick={() => {
                          setTitle('编辑信息');
                          setInitalValues(item);
                          open();
                        }}
                      >
                        <IconEdit />
                      </ActionIcon>
                      <ActionIcon
                        variant="transparent"
                        color="yellow"
                        onClick={() => {
                          setInitalValues(item);
                          drawerOpenedAition.open();
                        }}
                      >
                        <IconLayoutSidebarInactive />
                      </ActionIcon>
                      <ActionIcon
                        variant="transparent"
                        color="red"
                        onClick={() => {
                          deleteById(item._id);
                        }}
                      >
                        <IconTrash />
                      </ActionIcon>
                    </Flex>
                  </Card.Section>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </Page>
      <Modal
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
        <UpdateRole
          initalValues={initalValues}
          onSuccess={() => {
            close();
            getData({ pageNo: 1 });
          }}
        />
      </Modal>
      <Drawer
        opened={drawerOpened}
        onClose={() => {
          drawerOpenedAition.close();
          if (initalValues) {
            setInitalValues(undefined);
          }
        }}
        title="菜单配置"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <MenusCheck
          roleData={initalValues}
          onSuccess={(menus) => {
            close();
            setData(
              (state) =>
                ({
                  ...state,
                  list: state?.list?.map((item) => {
                    if (item._id === initalValues?._id) {
                      return {
                        ...item,
                        menus,
                      };
                    }
                    return item;
                  }),
                }) as RoleQueryPaginationResultDto,
            );
            getData({ pageNo: 1 });
          }}
        />
      </Drawer>
    </>
  );
};
