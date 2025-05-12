import useTools from '@/hooks/useTools';
import { uploadFile } from '@/utils';
import {
  FileButton,
  UnstyledButton,
  Center,
  ActionIcon,
  Overlay,
  Image,
  MantineSize,
  Group,
} from '@mantine/core';
import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useHover } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconEdit, IconEye, IconUpload } from '@tabler/icons-react';
import { isArray } from 'lodash';
import { useState } from 'react';
type UploadImageProps = {
  multiple?: boolean;
  listType?: 'text' | 'picture' | 'picture-card';
  imageList?: string[];
  isList?: boolean;
  preview?: boolean;
  radius?: MantineSize;
  edit?: boolean;
};
const UploadImage = (props: UploadImageProps) => {
  const { getFilePath } = useTools();
  const {
    multiple = false,
    isList = false,
    preview = true,
    imageList: defaultImageList = [],
    radius = 'default',
    edit = true,
  } = props;

  const [imageList, setImageList] = useState<string[]>(defaultImageList);
  const { hovered, ref } = useHover();

  const imagetPreview = (src: string) => {
    modals.open({
      fullScreen: true,
      withCloseButton: true,
      lockScroll: true,
      styles: {
        content: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
        },
        body: {
          flex: 1,
          overflow: 'hidden',
          padding: 'var(--mantine-spacing-md)',
        },
        header: {
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 0,
          right: 0,
        },
      },
      children: <Image h="100%" fit="contain" src={getFilePath(src)} />,
    });
  };

  const imageShow = () => {
    return <div>asdasd</div>;
  };

  return (
    <FileButton
      onChange={async (val) => {
        if (!val) {
          return;
        }
        if (isArray(val)) {
          console.log(val);
        } else {
          const data = await uploadFile(val);
          if (data) {
            setImageList([data.url]);
          }
        }
      }}
      accept={IMAGE_MIME_TYPE.join(',')}
      multiple={multiple}
    >
      {(props) => (
        <UnstyledButton
          ref={ref}
          w={100}
          h={100}
          bg="var(--mantine-color-gray-1)"
          style={{
            borderRadius: `var(--mantine-radius-${radius})`,
          }}
          pos="relative"
          {...props}
        >
          {!isList && imageList[0] ? (
            <Image src={getFilePath(imageList[0])} radius={radius} />
          ) : (
            <Center>
              <IconUpload />
            </Center>
          )}
          {preview && imageList[0] && (
            <Overlay backgroundOpacity={0.3} blur={4} radius={radius}>
              <Group justify="center" align="center" h="100%" gap="xs">
                <ActionIcon
                  variant="transparent"
                  onClick={(event) => {
                    event.stopPropagation();
                    imagetPreview(imageList[0]);
                  }}
                >
                  <IconEye color="light-dark(var(--mantine-color-white), var(--mantine-color-white))" />
                </ActionIcon>
                <ActionIcon variant="transparent">
                  <IconEdit color="light-dark(var(--mantine-color-white), var(--mantine-color-white))" />
                </ActionIcon>
              </Group>
            </Overlay>
          )}
        </UnstyledButton>
      )}
    </FileButton>
  );
};

export default UploadImage;
