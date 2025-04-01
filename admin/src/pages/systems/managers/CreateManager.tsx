import { useState } from 'react';
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
  IconBadge4k,
  IconCheck,
  IconGenderFemale,
  IconExclamationCircle,
  IconUpload,
  IconGenderMale,
  IconMail,
  IconPhone,
  IconUser,
  IconGenderBigender,
  IconUsersGroup,
} from '@tabler/icons-react';
import {
  AdmintorPaginationResultDto,
  admintorsControllerAddOne,
  AdmintorsPageItemDto,
  AdmintorsResultDto,
  filesControllerUploadFile,
} from '@/client';
import useRoleOptions from '@/utils/hooks/useRoleOptions';
import { notifications } from '@mantine/notifications';
import { getFilePath } from '@/utils';

type CreateManagerProps = {
  onSuccess: () => void;
  editVlaue?: AdmintorsPageItemDto;
};
function CreateManager(props: CreateManagerProps) {
  const { onSuccess, editVlaue } = props;

  const [file, setFile] = useState<File | null>(null);
  const [roleOptions] = useRoleOptions();
  const form = useForm({
    initialValues: editVlaue
      ? { ...editVlaue, roles: editVlaue.roles.map((item) => item._id) }
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

  const onSubmit = form.onSubmit(async (values) => {
    const addAdmintor = await admintorsControllerAddOne({
      body: {
        ...values,
        password: '123456',
      },
    });
    console.log('addAdmintor', addAdmintor);
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
  });

  const iconProps = {
    stroke: 1.5,
    opacity: 0.6,
    size: 18,
  };
  const icons: Record<string, React.ReactNode> = {
    Male: <IconGenderMale color="blue" {...iconProps} />,
    Female: <IconGenderFemale color="red" {...iconProps} />,
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex justify="center" pb="lg" pt="lg">
        <FileButton
          onChange={async (file) => {
            if (!file) {
              return;
            }
            setFile(file);
            const res = await filesControllerUploadFile({
              body: {
                file: file,
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
        <Grid.Col span={12}>
          <TextInput
            {...form.getInputProps('username')}
            label="用户名"
            leftSection={<IconUser size={16} />}
            placeholder="填写用户名"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            {...form.getInputProps('email')}
            label="邮箱"
            leftSection={<IconMail size={16} />}
            placeholder="填写邮箱"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            {...form.getInputProps('phone')}
            label="手机号"
            type="tel"
            leftSection={<IconPhone size={16} />}
            placeholder="填写手机号"
            maxLength={11}
          />
        </Grid.Col>
        <Grid.Col span={12}>
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
                    {icons[item.option.value]}
                    {item.option.label}
                  </Group>
                  {item.checked && (
                    <IconCheck
                      style={{ marginInlineStart: 'auto' }}
                      {...iconProps}
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

export default CreateManager;
