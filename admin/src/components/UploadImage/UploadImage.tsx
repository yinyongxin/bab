import { FileButton, UnstyledButton, Center } from '@mantine/core';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload } from '@tabler/icons-react';
import { isArray } from 'lodash';
import { useState } from 'react';
type UploadImageProps = {
  multiple?: boolean;
  listType?: 'text' | 'picture' | 'picture-card';
};
const UploadImage = (props: UploadImageProps) => {
  const { multiple = false } = props;
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileButton
      onChange={(val) => {
        if (!val) {
          return;
        }
        if (isArray(val)) {
          setFiles([...files, ...val]);
        } else {
          setFiles([...files, val]);
        }
      }}
      accept={IMAGE_MIME_TYPE.join(',')}
      multiple={multiple}
    >
      {(props) => (
        <UnstyledButton
          w={100}
          h={100}
          bg="var(--mantine-color-gray-1)"
          style={{
            borderRadius: 'var(--mantine-radius-default)',
          }}
          {...props}
        >
          <Center>
            <IconUpload />
          </Center>
        </UnstyledButton>
      )}
    </FileButton>
  );
};

export default UploadImage;
