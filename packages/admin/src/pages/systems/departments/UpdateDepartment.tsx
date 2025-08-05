import {
  Button,
  Flex,
  TextInput,
  Text,
  Grid,
  Textarea,
  Switch,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';
import {
  projectClassificationsControllerAddOne,
  projectClassificationsControllerUpdateOne,
  DepartmentsCreateBodyDto,
  DepartmentsResultDto,
  DepartmentsUpdateDto,
  StatusEnum,
  departmentsControllerAddOne,
  departmentsControllerUpdateOne,
} from '@/client';
import { notifications } from '@mantine/notifications';
import useTools from '@/hooks/useTools';
import UploadImage from '@/components/UploadImage/UploadImage';

type UpdateClassificationProps = {
  onSuccess: () => void;
  initalValues?: DepartmentsResultDto;
  parentId?: string;
};
function UpdateClassification(props: UpdateClassificationProps) {
  const { getFilePath } = useTools();
  const { onSuccess, initalValues, parentId } = props;
  const isAddChildren = parentId !== undefined;
  const isAdding = !initalValues;
  const isEditing = initalValues && initalValues._id;
  const getInitialValues = () => {
    if (isAddChildren) {
      return {
        name: '',
        picture: '',
        description: '',
        status: StatusEnum.OPEN,
        sort: 0,
        parent: parentId,
      };
    }
    return {
      name: initalValues?.name || '',
      description: initalValues?.description || '',
      status: initalValues?.status || StatusEnum.OPEN,
      sort: initalValues?.sort || 0,
      parent: initalValues?.parent || '',
    };
  };
  const form = useForm<DepartmentsCreateBodyDto>({
    initialValues: getInitialValues(),
    validate: {
      name: hasLength({ min: 1 }, '部门名不能为空'),
      description: hasLength({ min: 1 }, '部门描述不能为空'),
    },
  });

  const create = async (values: DepartmentsCreateBodyDto) => {
    const addRes = await departmentsControllerAddOne({
      body: values,
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
    values: DepartmentsUpdateDto,
  ) => {
    const updateRes = await departmentsControllerUpdateOne({
      body: {
        name: values.name,
        description: values.description,
        sort: values.sort,
        parent: values.parent,
        status: values.status,
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
          <TextInput
            {...form.getInputProps('name')}
            label="部门名称"
            placeholder="填写部门名称"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            {...form.getInputProps('description')}
            label="部门描述"
            placeholder="填写部门描述"
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
            label="部门是否启用"
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
