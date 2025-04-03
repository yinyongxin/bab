import {
  RoleQueryPaginationResultDto,
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import UpdateRole from './UpdateRole';
import {
  IconEdit,
  IconLayoutSidebarInactive,
  IconTrash,
} from '@tabler/icons-react';

export default () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, loadingAction] = useDisclosure(false);
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
  };

  return (
    <>
      <Page
        title="人员角色"
        description="人员角色"
        actions={[
          <Button size="xs" key="add" onClick={open}>
            添加角色
          </Button>,
        ]}
        contentProps={{
          p: 0,
          bg: 'transparent',
        }}
      >
        <Grid mt={0}>
          {data?.list.map((item) => {
            return (
              <Grid.Col
                span={{
                  sm: 12,
                  md: 6,
                  lg: 4,
                  xl: 3,
                }}
              >
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                      height={200}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Title order={4} mt="md">
                    {item.name}
                  </Title>

                  <Text size="sm" c="dimmed" lineClamp={2} h={'48'}>
                    {item.description}
                  </Text>
                  <Divider />
                  <Card.Section pb="md">
                    <Flex justify="space-around" pt="md" px="md">
                      <ActionIcon variant="transparent">
                        <IconEdit />
                      </ActionIcon>
                      <ActionIcon variant="transparent" color="yellow">
                        <IconLayoutSidebarInactive />
                      </ActionIcon>
                      <ActionIcon variant="transparent" color="red">
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
      <Modal opened={opened} onClose={close} title="添加管理人员" centered>
        <UpdateRole
          onSuccess={() => {
            close();
            getData({ pageNo: 1 });
          }}
        />
      </Modal>
    </>
  );
};
