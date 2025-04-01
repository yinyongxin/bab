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
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import {
  IconCheck,
  IconGenderFemale,
  IconGenderMale,
  IconMars,
} from '@tabler/icons-react';

function CreateManager() {
  const form = useForm({
    initialValues: { username: '', email: '', sex: 'Male' },
    validate: {
      username: hasLength({ min: 1 }, '用户名不能为空'),
      email: isEmail('邮箱格式不正确'),
      sex: hasLength({ min: 1 }, '性别不能为空'),
    },
  });

  const onSubmit = form.onSubmit((values) => {
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
