import { Card, Title, Stack, Center, Text, Image } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UseFormReturnType } from '@mantine/form';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { useState } from 'react';
import DropzoneDefaultContent from '../DropzoneDefaultContent';
type ThumbnailProps = {
  form: UseFormReturnType<any>;
};
const Thumbnail = (props: ThumbnailProps) => {
  const { form } = props;
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
          maxSize={5 * 1024 * 2}
          accept={IMAGE_MIME_TYPE}
          bg="var(--mantine-primary-color-light)"
        >
          {files.length > 0 ? previews : <DropzoneDefaultContent />}
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
