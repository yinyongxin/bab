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
  Switch,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import {
  IconCheck,
  IconExclamationCircle,
  IconLink,
  IconTextCaption,
} from '@tabler/icons-react';
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
      path: '',
      isHide: false,
      sort,
      icon: 'icons',
      menuType,
      description: '',
    },
    validate: {
      icon: isNotEmpty('头像不能为空'),
      name: isNotEmpty('用户名不能为空'),
      description: isNotEmpty('描述不能为空'),
      path: isNotEmpty('路径不能为空'),
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
      if (!res.error && res.data) {
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
    const updateAdmintor = await menusControllerUpdateOne({
      query: {
        id,
      },
      body: {
        icon: values.icon,
        name: values.name,
        description: values.description,
        isHide: values.isHide,
        menuType: values.menuType || menuType,
        path: values.path,
      },
    });
    if (updateAdmintor?.error) {
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
            <Center
              h="100%"
              bg="gray.1"
              style={{
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
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
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              {...form.getInputProps('name')}
              leftSection={<IconTextCaption size={14} />}
              label={
                {
                  [MenuTypeEnum.DIRECTORY]: '目录名称',
                  [MenuTypeEnum.PAGE]: '页面名称',
                  [MenuTypeEnum.FUNCTION_AREA]: '功能区名称',
                }[menuType]
              }
              placeholder={
                {
                  [MenuTypeEnum.DIRECTORY]: '填写目录名称',
                  [MenuTypeEnum.PAGE]: '填写页面名称',
                  [MenuTypeEnum.FUNCTION_AREA]: '填写功能区名称',
                }[menuType]
              }
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              {...form.getInputProps('path')}
              leftSection={<IconLink size={14} />}
              label={
                {
                  [MenuTypeEnum.DIRECTORY]: '填写目录路径',
                  [MenuTypeEnum.PAGE]: '填写页面路径',
                  [MenuTypeEnum.FUNCTION_AREA]: '填写功能区路径',
                }[menuType]
              }
              description={
                {
                  [MenuTypeEnum.DIRECTORY]: `/${form.values.path}`,
                  [MenuTypeEnum.PAGE]: `/${parentData?.path}/${form.values.path}`,
                  [MenuTypeEnum.FUNCTION_AREA]: `/${parentData?.path}/${form.values.path}`,
                }[menuType]
              }
              placeholder={
                {
                  [MenuTypeEnum.DIRECTORY]: '填写目录路径',
                  [MenuTypeEnum.PAGE]: '填写页面路径',
                  [MenuTypeEnum.FUNCTION_AREA]: '填写功能区路径',
                }[menuType]
              }
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              withAsterisk
              {...form.getInputProps('description')}
              label="描述"
              placeholder="填写描述"
            />
          </Grid.Col>
          {!isFunctionArea && (
            <Grid.Col span={12}>
              <Switch
                {...form.getInputProps('isHide')}
                checked={form.getInputProps('isHide').value}
                label="是否在菜单中隐藏"
              />
            </Grid.Col>
          )}
        </Grid>
        <Flex justify="space-between" align="center" mt="md">
          <Text c="dimmed">填写完信息后点击保存</Text>
          <Button type="submit">保存</Button>
        </Flex>
      </form>
    </Box>
  );
}

export default UpdataMenu;
