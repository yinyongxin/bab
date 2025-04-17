import { Card, Title, Stack, Center, Text, Image } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { useState } from 'react';
type ThumbnailProps = {
  form: UseFormReturnType<any>;
};
const Thumbnail = (props: ThumbnailProps) => {
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
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Title order={4}>产品缩略图</Title>
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
                  color="var(--mantine-primary-color-filled)"
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
  );
};

export default Thumbnail;
