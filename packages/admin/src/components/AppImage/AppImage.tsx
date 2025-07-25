import {
  ActionIcon,
  Box,
  BoxProps,
  Center,
  Image,
  ImageProps,
  MantineSize,
  Overlay,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconEye } from '@tabler/icons-react';
type AppImageProps = BoxProps & {
  preview?: boolean;
  radius?: MantineSize;
  src: string;
  imageProps?: ImageProps;
};
const AppImage = (props: AppImageProps) => {
  const {
    preview = true, // default to false
    w,
    h,
    src,
    radius = 'md',
    imageProps,
    ...rest
  } = props;
  const { hovered, ref } = useHover();

  const imagetPreview = () => {
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
      children: <Image h="100%" fit="contain" src={src} />,
    });
  };
  return (
    <Box
      ref={ref}
      pos="relative"
      w={w}
      h={h}
      {...rest}
      style={(theme) => ({
        borderRadius: theme.radius[radius],
        ...rest.style,
      })}
    >
      <Image
        radius={radius}
        w="100%"
        h="100%"
        fallbackSrc="/images/Empty-Order--Streamline-Bruxelles.png"
        src={src}
        {...imageProps}
      />
      {preview && hovered && (
        <Overlay backgroundOpacity={0.3} blur={4} radius={radius}>
          <Center h="100%">
            <ActionIcon variant="transparent" onClick={imagetPreview}>
              <IconEye color="light-dark(var(--mantine-color-white), var(--mantine-color-white))" />
            </ActionIcon>
          </Center>
        </Overlay>
      )}
    </Box>
  );
};
export default AppImage;
