import { getFilePath } from '@/utils';
import { imagePreview } from '@/utils/imageTools';
import {
  UnstyledButton,
  Overlay,
  Group,
  ActionIcon,
  Image,
  MantineSize,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconEye, IconTrash } from '@tabler/icons-react';
type ImageListItemProps = {
  listType?: 'text' | 'picture' | 'picture-card';
  radius?: MantineSize;
  src: string;
  edit?: boolean;
  onDelete?: () => void;
};

const ImageListItem = (props: ImageListItemProps) => {
  const { src, radius = 'default', onDelete } = props;
  const { hovered, ref } = useHover();
  return (
    <UnstyledButton
      component="div"
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
      <Image src={getFilePath(src)} radius={radius} />
      {hovered && (
        <Overlay backgroundOpacity={0.3} blur={4} radius={radius}>
          <Group justify="center" align="center" h="100%" gap="xs">
            <ActionIcon
              variant="transparent"
              onClick={(event) => {
                event.stopPropagation();
                imagePreview(src);
              }}
            >
              <IconEye color="light-dark(var(--mantine-color-white), var(--mantine-color-white))" />
            </ActionIcon>
            <ActionIcon variant="transparent" onClick={onDelete}>
              <IconTrash color="light-dark(var(--mantine-color-white), var(--mantine-color-white))" />
            </ActionIcon>
          </Group>
        </Overlay>
      )}
    </UnstyledButton>
  );
};

export default ImageListItem;
