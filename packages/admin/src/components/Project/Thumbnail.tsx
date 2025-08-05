import { Card, Title, Center, Text, Image, Grid } from '@mantine/core';
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
  const previews = (
    <Grid mt="md" gutter="sm">
      {files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
          <Grid.Col span={4} key={index} bd="sm">
            <Image
              w="100%"
              h={60}
              fit="cover"
              key={index}
              src={imageUrl}
              onLoad={() => URL.revokeObjectURL(imageUrl)}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
  return (
    <Card shadow="sm">
      <Card.Section inheritPadding py="md">
        <Title order={4}>产品缩略图</Title>
      </Card.Section>
      <Card.Section inheritPadding py="md">
        <Center mb="md">
          <Text size="xs" c="dimmed">
            设置产品缩略图。仅接受*.png、*.jpg和*.jpeg 图像文件。
          </Text>
        </Center>
        <Dropzone
          onDrop={(val) => {
            setFiles([...files, ...val]);
          }}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          bg="var(--mantine-primary-color-light)"
        >
          <DropzoneDefaultContent />
        </Dropzone>

        {previews}
      </Card.Section>
    </Card>
  );
};

export default Thumbnail;
