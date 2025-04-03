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
  Image,
  Textarea,
  Container,
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import {
  IconCheck,
  IconExclamationCircle,
  IconGenderFemale,
  IconGenderMale,
  IconUpload,
} from '@tabler/icons-react';
import {
  admintorsControllerAddOne,
  filesControllerUploadFile,
  rolesControllerAddOne,
} from '@/client';
import { notifications } from '@mantine/notifications';
import { getFilePath } from '@/utils';

type UpdateRoleProps = {
  onSuccess: () => void;
};
function UpdateRole(props: UpdateRoleProps) {
  const { onSuccess } = props;

  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      icon: '',
    },
    validate: {
      name: hasLength({ min: 1 }, '用户名不能为空'),
      description: hasLength({ min: 1 }, '描述不能为空'),
      icon: hasLength({ min: 1 }, '头像不能为空'),
    },
  });

  const onSubmit = form.onSubmit(async (values) => {
    const addRoleRes = await rolesControllerAddOne({
      body: {
        ...values,
      },
    });
    if (addRoleRes?.error) {
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

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <Grid.Col span={12}>
          <FileButton
            onChange={async (file) => {
              if (!file) {
                return;
              }
              const res = await filesControllerUploadFile({
                body: {
                  file: file,
                },
              });
              if (res.data) {
                form.setFieldValue('icon', res.data.url);
              }
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Box
                {...props}
                h="180"
                bg="gray.1"
                style={{
                  borderRadius: 'var(--mantine-radius-default)',
                  cursor: 'pointer',
                }}
              >
                {form.values.icon ? (
                  <Image
                    width="100%"
                    height="100%"
                    src={getFilePath(form.values.icon)}
                    fit="cover"
                  ></Image>
                ) : (
                  <Flex justify="center" align="center" h="100%">
                    <IconUpload stroke={1.5} />
                  </Flex>
                )}
              </Box>
            )}
          </FileButton>
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            {...form.getInputProps('name')}
            label="角色名"
            placeholder="填写角色名"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            {...form.getInputProps('description')}
            label="描述"
            placeholder="填写描述"
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

export default UpdateRole;
