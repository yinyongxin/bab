import {
  Button,
  Flex,
  TextInput,
  Text,
  Grid,
  FileButton,
  Avatar,
  Textarea,
  Switch,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import {
  IconCheck,
  IconExclamationCircle,
  IconUpload,
  IconUser,
} from '@tabler/icons-react';
import { AdmintorsPageItemDto } from '@/client';
import { notifications } from '@mantine/notifications';
import { uploadFile } from '@/utils';
import useTools from '@/hooks/useTools';

type UpdateClassificationProps = {
  onSuccess: () => void;
  initalValues?: AdmintorsPageItemDto;
};
function UpdateClassification(props: UpdateClassificationProps) {
  const { getFilePath } = useTools();
  const { onSuccess, initalValues } = props;
  const isAdding = !initalValues;
  const isEditing = initalValues && initalValues._id;
  const form = useForm({
    initialValues: initalValues
      ? { ...initalValues, roles: initalValues.roles.map((item) => item._id) }
      : {
          name: '',
          picture: '',
          description: '',
          status: 'open',
        },
    validate: {
      name: hasLength({ min: 1 }, '产品名不能为空'),
      description: hasLength({ min: 1 }, '描述不能为空'),
    },
  });

  const create = async () => {
    const addRes = {};

    if (addRes?.error) {
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

  const update = async () => {
    const addRes = {};
    if (addRes?.error) {
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
      await create(values);
    } else if (isEditing) {
      await update(initalValues._id, values);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <Grid.Col span={12}>
          <Text size="sm">分类图片</Text>
          <FileButton
            onChange={async (file) => {
              const data = await uploadFile(file);
              if (data) {
                form.setFieldValue('picture', data.url);
              }
            }}
            accept="image/png,image/jpeg"
          >
            {(props) => {
              console.log('props', props);
              return (
                <Avatar
                  radius="sm"
                  {...props}
                  size={100}
                  src={
                    form.values.picture ? getFilePath(form.values.picture) : ''
                  }
                >
                  <IconUpload stroke={1.5} />
                </Avatar>
              );
            }}
          </FileButton>
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            {...form.getInputProps('name')}
            label="产品名"
            leftSection={<IconUser size={16} />}
            placeholder="填写产品名"
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
          <Switch
            {...form.getInputProps('status')}
            checked={form.getInputProps('status').value === 'open'}
            label="分类是否启用"
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

export default UpdateClassification;
