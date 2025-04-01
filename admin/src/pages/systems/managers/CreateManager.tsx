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
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import {
  IconCheck,
  IconGenderFemale,
  IconGenderMale,
  IconUpload,
} from '@tabler/icons-react';
import { admintorsControllerAddOne, filesControllerUploadFile } from '@/client';

type CreateManagerProps = {
  onSuccess: () => void;
};
function CreateManager(props: CreateManagerProps) {
  const { onSuccess } = props;

  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      sex: 'Male',
      avatar: '',
      roles: ['67e9ff47398e2ea2c64f02c5'],
      phone: '',
    },
    validate: {
      username: hasLength({ min: 1 }, '用户名不能为空'),
      email: isEmail('邮箱格式不正确'),
      sex: hasLength({ min: 1 }, '性别不能为空'),
      phone: hasLength({ min: 1, max: 11 }, '手机号不能为空'),
    },
  });

  const onSubmit = form.onSubmit(async (values) => {
    const addAdmintor = await admintorsControllerAddOne({
      body: {
        ...values,
        password: '123456',
      },
    });
    if (addAdmintor.data) {
      onSuccess?.();
    }

    console.log(values);
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
              src={file ? URL.createObjectURL(file) : ''}
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
            placeholder="填写用户名"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            {...form.getInputProps('email')}
            label="邮箱"
            placeholder="填写邮箱"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            {...form.getInputProps('phone')}
            label="手机号"
            type="tel"
            placeholder="填写手机号"
            maxLength={11}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Select
            {...form.getInputProps('sex')}
            label="性别"
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
      </Grid>
      <Flex justify="space-between" align="center" mt="md">
        <Text c="dimmed">填写完信息后点击确定保存</Text>
        <Button type="submit">保存</Button>
      </Flex>
    </form>
  );
}

export default CreateManager;
