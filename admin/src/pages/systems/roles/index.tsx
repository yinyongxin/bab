import {
  RoleQueryPaginationResultDto,
  rolesControllerDeleteByIds,
  rolesControllerGetPageList,
} from '@/client';
import Page from '@/components/Page';
import {
  Badge,
  Button,
  Text,
  Modal,
  Image,
  Grid,
  Card,
  Group,
  Title,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import CreateManager from './CreateManager';
import {
  IconEdit,
  IconLayoutSidebarInactive,
  IconMenu,
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

                  <Text size="sm" c="dimmed" lineClamp={3} h={'64'}>
                    {item.description}
                  </Text>

                  <Group grow>
                    <ActionIcon variant="transparent">
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon variant="transparent" color="yellow">
                      <IconLayoutSidebarInactive />
                    </ActionIcon>
                    <ActionIcon variant="transparent" color="red">
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </Page>
      <Modal opened={opened} onClose={close} title="添加管理人员" centered>
        <CreateManager
          onSuccess={() => {
            close();
            getData({ pageNo: 1 });
          }}
        />
      </Modal>
    </>
  );
};
