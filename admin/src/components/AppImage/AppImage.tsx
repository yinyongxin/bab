import {
  ActionIcon,
  Box,
  Center,
  Image,
  ImageProps,
  MantineSize,
  Overlay,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';
type AppImageProps = Omit<ImageProps, 'radius'> & {
  preview?: boolean;
  radius?: MantineSize;
};
const AppImage = (props: AppImageProps) => {
  const {
    preview = true, // default to false
    w,
    h,
    radius = 'md',
    ...imageProps
  } = props;
  const { hovered, ref } = useHover();
  return (
    <Box
      ref={ref}
      pos="relative"
      w={w}
      h={h}
      style={(theme) => ({
        borderRadius: theme.radius[radius],
      })}
    >
      <Image
        {...imageProps}
        radius={radius}
        w="100%"
        h="100%"
        fallbackSrc="/images/Empty-Order--Streamline-Bruxelles.png"
      />
      {preview && hovered && (
        <Overlay backgroundOpacity={0.3} blur={4} radius={radius}>
          <Center h="100%">
            <ActionIcon variant="transparent">
              <IconEye color="light-dark(var(--mantine-color-white), var(--mantine-color-white))" />
            </ActionIcon>
          </Center>
        </Overlay>
      )}
    </Box>
  );
};
export default AppImage;
