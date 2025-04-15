import Page from '@/components/Page/Page';
import {
  Box,
  Card,
  Grid,
  Image,
  Stack,
  TextInput,
  Textarea,
  Title,
  Text,
  Center,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { hasLength, useForm } from '@mantine/form';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import AppRichTextDditor from '@/components/AppRichTextDditor';
import Classification from '@/components/Project/Classification';
import Thumbnail from '@/components/Project/Thumbnail';

const AddProject = () => {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      detail: 'asdfasfasfsf',
    },
    validate: {
      name: hasLength({ min: 1 }, '项目名称不能为空'),
      description: hasLength({ min: 1 }, '项目描述不能为空'),
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: form.values.detail,
  });

  return (
    <Page>
      <Grid>
        <Grid.Col span={8}>
          <Stack>
            <Card>
              <Card.Section withBorder inheritPadding py="md">
                <Title order={4}>基本信息</Title>
              </Card.Section>
              <Card.Section inheritPadding py="md">
                <Stack>
                  <TextInput
                    withAsterisk
                    size="md"
                    {...form.getInputProps('name')}
                    label="项目名称"
                    description="项目名称是唯一的，不可重复的，请确保项目名称的唯一性"
                    placeholder="请输入项目名称"
                  />
                  <Textarea
                    withAsterisk
                    rows={4}
                    size="md"
                    {...form.getInputProps('description')}
                    label="项目描述"
                    placeholder="请输入项目描述"
                  />
                </Stack>
              </Card.Section>
            </Card>
            <Card>
              <Card.Section withBorder inheritPadding py="md">
                <Title order={4}>详情</Title>
              </Card.Section>
              <Card.Section inheritPadding py="md">
                <AppRichTextDditor value={form.values.detail} />
              </Card.Section>
            </Card>
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack>
            <Thumbnail />
            <Classification />
          </Stack>
        </Grid.Col>
      </Grid>
    </Page>
  );
};

export default AddProject;
