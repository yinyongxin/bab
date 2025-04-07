import {
  Box,
  Button,
  Flex,
  Group,
  Select,
  TextInput,
  Text,
  Grid,
  FileButton,
  Avatar,
  MultiSelect,
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import {
  IconCheck,
  IconExclamationCircle,
  IconUpload,
  IconMail,
  IconPhone,
  IconUser,
  IconGenderBigender,
  IconUsersGroup,
} from '@tabler/icons-react';
import {
  admintorsControllerAddOne,
  admintorsControllerUpdateOne,
  AdmintorsCreateBodyDto,
  AdmintorsPageItemDto,
  AdmintorsUpdateDto,
  filesControllerUploadFile,
} from '@/client';
import useRoleOptions from '@/utils/hooks/useRoleOptions';
import { notifications } from '@mantine/notifications';
import { getFilePath } from '@/utils';
import { sexIcons } from './common';

type UpdateManagerProps = {
  onSuccess: () => void;
  initalValues?: AdmintorsPageItemDto;
};
function UpdateManager(props: UpdateManagerProps) {
  const { onSuccess, initalValues } = props;
  const [roleOptions] = useRoleOptions();
  const isAdding = !initalValues;
  const isEditing = initalValues && initalValues._id;
  const form = useForm({
    initialValues: initalValues
      ? { ...initalValues, roles: initalValues.roles.map((item) => item._id) }
      : {
          username: '',
          email: '',
          sex: '',
          avatar: '',
          roles: [],
          phone: '',
        },
    validate: {
      username: hasLength({ min: 1 }, '用户名不能为空'),
      email: isEmail('邮箱格式不正确'),
      sex: hasLength({ min: 1 }, '性别不能为空'),
      phone: hasLength({ min: 1, max: 11 }, '手机号不能为空'),
      roles: hasLength({ min: 1 }, '角色不能为空'),
    },
  });

  const createrAdmintor = async (values: AdmintorsCreateBodyDto) => {
    const addAdmintor = await admintorsControllerAddOne({
      body: {
        ...values,
      },
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

  const updateAdmintor = async (id: string, values: AdmintorsUpdateDto) => {
    const addAdmintor = await admintorsControllerUpdateOne({
      query: {
        id,
      },
      body: {
        username: values.username,
        email: values.email,
        sex: values.sex,
        avatar: values.avatar,
        roles: values.roles,
        phone: values.phone,
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
      await createrAdmintor({ ...values, password: '123456' });
    } else if (isEditing) {
      await updateAdmintor(initalValues._id, values as AdmintorsUpdateDto);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Flex justify="center" pb="lg" pt="lg">
        <FileButton
          onChange={async (file) => {
            if (!file) {
              return;
            }
            const newFile = new File([file], encodeURI(file.name), {
              type: file.type,
            });
            const res = await filesControllerUploadFile({
              body: {
                file: newFile,
              },
            });
            if (res.data) {
              form.setFieldValue('avatar', res.data.url);
            }
          }}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <Avatar
              {...props}
              size={100}
              src={form.values.avatar ? getFilePath(form.values.avatar) : ''}
            >
              <IconUpload stroke={1.5} />
            </Avatar>
          )}
        </FileButton>
      </Flex>

      <Grid>
        <Grid.Col span={6}>
          <TextInput
            {...form.getInputProps('username')}
            label="用户名"
            leftSection={<IconUser size={16} />}
            placeholder="填写用户名"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            {...form.getInputProps('email')}
            label="邮箱"
            leftSection={<IconMail size={16} />}
            placeholder="填写邮箱"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            {...form.getInputProps('phone')}
            label="手机号"
            type="tel"
            leftSection={<IconPhone size={16} />}
            placeholder="填写手机号"
            maxLength={11}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            {...form.getInputProps('sex')}
            label="性别"
            leftSection={<IconGenderBigender size={16} />}
            placeholder="选择性别"
            data={[
              { label: '男生', value: 'Male' },
              { label: '女生', value: 'Female' },
            ]}
            renderOption={(item) => (
              <Box w="100%">
                <Flex justify="space-between">
                  <Group flex={1}>
                    {sexIcons[item.option.value]}
                    {item.option.label}
                  </Group>
                  {item.checked && (
                    <IconCheck
                      style={{ marginInlineStart: 'auto' }}
                      stroke={1.5}
                      opacity={0.6}
                      size={18}
                    />
                  )}
                </Flex>
              </Box>
            )}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <MultiSelect
            {...form.getInputProps('roles')}
            label="角色"
            placeholder="选择角色"
            leftSection={<IconUsersGroup size={16} />}
            data={roleOptions}
          />
        </Grid.Col>
      </Grid>
      <Flex justify="space-between" align="center" mt="md">
        <Text c="dimmed">填写完信息后点击确定保存</Text>
        <Button type="submit">保存</Button>
      </Flex>
    </form>
  );
}

export default UpdateManager;
