import { modals } from '@mantine/modals';
import { Image } from '@mantine/core';
import { getFilePath } from '.';

export const imagePreview = (src: string) => {
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
