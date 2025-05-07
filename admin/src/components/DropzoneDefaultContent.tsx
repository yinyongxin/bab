import { Dropzone } from '@mantine/dropzone';
import { Stack, Text } from '@mantine/core';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';

const DropzoneDefaultContent = () => {
  return (
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
        <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
      </Dropzone.Reject>
      <Dropzone.Idle>
        <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
      </Dropzone.Idle>
      <Text size="xl" inline>
        拖动或点击选择文件
      </Text>
      <Text size="sm" c="dimmed" inline mt={7}>
        选择的文件不能超过 5mb
      </Text>
    </Stack>
  );
};
export default DropzoneDefaultContent;
