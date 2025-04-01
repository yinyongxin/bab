import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';

function CreateManager() {
  const form = useForm({
    initialValues: { username: '', email: '' },
    validate: {
      username: hasLength({ min: 1 }, '用户名不能为空'),
      email: isEmail('邮箱格式不正确'),
    },
  });

  const onSubmit = form.onSubmit((values) => {
    console.log(values);
  });

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        {...form.getInputProps('username')}
        label="用户名"
        placeholder="填写用户名"
      />
      <TextInput
        {...form.getInputProps('email')}
        label="邮箱"
        placeholder="填写邮箱"
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}

export default CreateManager;
