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

  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
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
            <Card>
              <Card.Section withBorder inheritPadding py="md">
                <Title order={4}>产品封面</Title>
              </Card.Section>
              <Card.Section inheritPadding py="md">
                <Dropzone
                  onDrop={setFiles}
                  onReject={(files) => console.log('rejected files', files)}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                  bg="var(--mantine-primary-color-light)"
                >
                  {files.length > 0 ? (
                    previews
                  ) : (
                    <Stack
                      justify="center"
                      align="center"
                      mih={220}
                      style={{ pointerEvents: 'none' }}
                    >
                      <Dropzone.Accept>
                        <IconUpload
                          size={52}
                          color="var(--mantine-color-blue-6)"
                          stroke={1.5}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          size={52}
                          color="var(--mantine-color-red-6)"
                          stroke={1.5}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconPhoto
                          size={52}
                          color="var(--mantine-color-dimmed)"
                          stroke={1.5}
                        />
                      </Dropzone.Idle>
                      <Text size="xl" inline>
                        拖动或点击选择文件
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        选择的文件不能超过 5mb
                      </Text>
                    </Stack>
                  )}
                </Dropzone>
                <Center mt="md">
                  <Text size="xs" c="dimmed">
                    设置产品缩略图。仅接受*.png、*.jpg和*.jpeg 图像文件。
                  </Text>
                </Center>
              </Card.Section>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Page>
  );
};

export default AddProject;
