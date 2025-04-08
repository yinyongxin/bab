import {
  Box,
  Button,
  Flex,
  TextInput,
  Text,
  Grid,
  Textarea,
  Anchor,
  Center,
  LoadingOverlay,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';
import {
  MenuTypeEnum,
  MenusCreateBodyDto,
  MenusResultDto,
  MenusUpdateDto,
  menusControllerAddOne,
  menusControllerFindById,
  menusControllerUpdateOne,
} from '@/client';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import FontIcons from '@/components/FontIcons';
import { useDisclosure } from '@mantine/hooks';

type UpdataMenuProps = {
  onSuccess: () => void;
  parentData?: MenusResultDto;
  id?: string;
  sort?: number;
  menuType: MenuTypeEnum;
};
function UpdataMenu(props: UpdataMenuProps) {
  const { onSuccess, id, sort = 0, parentData, menuType } = props;
  const [loading, loadingAction] = useDisclosure(false);
  const isAdding = !id;
  const isEditing = id;
  const isDirectory = menuType === MenuTypeEnum.DIRECTORY;
  const isPage = menuType === MenuTypeEnum.PAGE;
  const isFunctionArea = menuType === MenuTypeEnum.FUNCTION_AREA;
  const form = useForm<MenusCreateBodyDto>({
    initialValues: {
      name: '',
      uniqueKey: '',
      path: '',
      sort,
      icon: 'briefcase-2',
      menuType,
      description: '',
      isHide: false,
    },
    validate: {
      name: hasLength({ min: 1 }, '用户名不能为空'),
      description: hasLength({ min: 1 }, '描述不能为空'),
      icon: hasLength({ min: 1 }, '头像不能为空'),
      path: hasLength({ min: 1 }, '路径不能为空'),
      uniqueKey: hasLength({ min: 1 }, '唯一标识不能为空'),
    },
  });
  const getDetail = async (id: string) => {
    try {
      loadingAction.open();

      const res = await menusControllerFindById({
        query: {
          id,
        },
      });
      if (res.data) {
        form.setValues(res.data);
      }
    } finally {
      loadingAction.close();
    }
  };

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);

  const createrMainMenu = async (values: MenusCreateBodyDto) => {
    const addAdmintor = await menusControllerAddOne({
      body: { ...values, parent: parentData?._id },
    });
    if (addAdmintor?.error) {
      notifications.show({
        color: 'red',
        title: '提示',
        message: '创建失败',
        icon: <IconExclamationCircle />,
      });
      return;
    }
    onSuccess?.();
    notifications.show({
      color: 'green',
      title: '提示',
      message: '创建成功',
      icon: <IconCheck />,
    });
  };

  const updataMainMenu = async (id: string, values: MenusUpdateDto) => {
    const addAdmintor = await menusControllerUpdateOne({
      query: {
        id,
      },
      body: {
        name: values.name,
        description: values.description,
        icon: values.icon,
        path: values.path,
        uniqueKey: values.uniqueKey,
      },
    });
    if (addAdmintor?.error) {
      notifications.show({
        color: 'red',
        title: '提示',
        message: '更新失败',
        icon: <IconExclamationCircle />,
      });
      return;
    }
    onSuccess?.();
    notifications.show({
      color: 'green',
      title: '提示',
      message: '更新成功',
      icon: <IconCheck />,
    });
  };

  const onSubmit = form.onSubmit(async (values) => {
    if (isAdding) {
      await createrMainMenu(values);
    } else if (isEditing) {
      await updataMainMenu(id, values);
    }
  });

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
      />
      <form onSubmit={onSubmit}>
        <Grid>
          <Grid.Col span={3}>
            <Center h="100%" bg="gray.1">
              <FontIcons
                name={form.values.icon || ''}
                style={{
                  fontSize: 60,
                }}
              />
            </Center>
          </Grid.Col>
          <Grid.Col span={9}>
            <TextInput
              {...form.getInputProps('icon')}
              label="图标"
              description={
                <Anchor
                  size="xs"
                  href="https://tablericons.com/"
                  target="_blank"
                >
                  点击查看图标
                </Anchor>
              }
              placeholder="填写图标"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              {...form.getInputProps('name')}
              label="标题"
              placeholder="填写标题"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              {...form.getInputProps('uniqueKey')}
              label="唯一值"
              placeholder="唯一值"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              {...form.getInputProps('description')}
              label="描述"
              placeholder="填写描述"
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              {...form.getInputProps('path')}
              label="路径"
              placeholder="填写路径"
            />
          </Grid.Col>
        </Grid>
        <Flex justify="space-between" align="center" mt="md">
          <Text c="dimmed">填写完信息后点击确定保存</Text>
          <Button type="submit">保存</Button>
        </Flex>
      </form>
    </Box>
  );
}

export default UpdataMenu;
