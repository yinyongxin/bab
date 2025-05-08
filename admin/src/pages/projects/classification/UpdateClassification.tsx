import {
  Button,
  Flex,
  TextInput,
  Text,
  Grid,
  Textarea,
  Switch,
  Center,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import {
  IconCheck,
  IconExclamationCircle,
  IconUser,
} from '@tabler/icons-react';
import {
  projectClassificationsControllerAddOne,
  projectClassificationsControllerUpdateOne,
  ProjectClassificationsCreateBodyDto,
  ProjectClassificationsResultDto,
  ProjectClassificationsUpdateDto,
  StatusEnum,
} from '@/client';
import { notifications } from '@mantine/notifications';
import { uploadFile } from '@/utils';
import useTools from '@/hooks/useTools';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import AppImage from '@/components/AppImage/AppImage';
import DropzoneDefaultContent from '@/components/DropzoneDefaultContent';

type UpdateClassificationProps = {
  onSuccess: () => void;
  initalValues?: ProjectClassificationsResultDto;
};
function UpdateClassification(props: UpdateClassificationProps) {
  const { getFilePath } = useTools();
  const { onSuccess, initalValues } = props;
  const isAdding = !initalValues;
  const isEditing = initalValues && initalValues._id;
  const form = useForm<ProjectClassificationsCreateBodyDto>({
    initialValues: isEditing
      ? { ...initalValues }
      : {
          name: '',
          picture: '',
          description: '',
          status: StatusEnum.OPEN,
          sort: 0,
          parent: '',
        },
    validate: {
      name: hasLength({ min: 1 }, '分类名不能为空'),
      description: hasLength({ min: 1 }, '分类描述不能为空'),
    },
  });

  const create = async (values: ProjectClassificationsCreateBodyDto) => {
    const addRes = await projectClassificationsControllerAddOne({
      body: {
        ...values,
        status: values.status ? StatusEnum.OPEN : StatusEnum.CLOSE,
      },
    });

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

  const update = async (
    id: string,
    values: ProjectClassificationsUpdateDto,
  ) => {
    const updateRes = await projectClassificationsControllerUpdateOne({
      body: {
        name: values.name,
        description: values.description,
        picture: values.picture,
        sort: values.sort,
        parent: values.parent,
        status: values.status ? StatusEnum.OPEN : StatusEnum.CLOSE,
      },
      query: {
        id,
      },
    });
    if (updateRes?.error) {
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
          <Dropzone
            multiple={false}
            onDrop={async (files) => {
              const data = await uploadFile(files[0]);
              if (data) {
                form.setFieldValue('picture', data.url);
              }
            }}
            onReject={(files) => {
              notifications.show({
                color: 'red',
                title: '提示',
                message: files.map((file) => file.errors[0].message).join(','),
                icon: <IconExclamationCircle />,
              });
            }}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            bg="var(--mantine-primary-color-light)"
          >
            {form.values.picture ? (
              <Center>
                <AppImage
                  mih={220}
                  preview
                  imageProps={{
                    w: 'auto',
                  }}
                  src={getFilePath(form.values.picture)}
                />
              </Center>
            ) : (
              <DropzoneDefaultContent />
            )}
          </Dropzone>
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            {...form.getInputProps('name')}
            label="分类名称"
            leftSection={<IconUser size={16} />}
            placeholder="填写分类名称"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            {...form.getInputProps('description')}
            label="分类描述"
            placeholder="填写分类描述"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Switch
            onChange={(event) => {
              form.setFieldValue(
                'status',
                event.currentTarget.checked
                  ? StatusEnum.OPEN
                  : StatusEnum.CLOSE,
              );
            }}
            checked={form.getInputProps('status').value === StatusEnum.OPEN}
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
