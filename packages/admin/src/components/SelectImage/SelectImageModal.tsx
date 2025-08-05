import { Modal, ModalProps, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SelectImageModalContent, {
  SelectImageModalContentProps,
} from './SelectImageModalContent';
import { FC } from 'react';

export interface SelectImageModalProps
  extends Partial<ModalProps>,
    Pick<SelectImageModalContentProps, 'onConfirm'> {
  contentProps?: SelectImageModalContentProps;
  children?: React.ReactNode;
}
const SelectImageModal: FC<SelectImageModalProps> = (props) => {
  const { contentProps, onConfirm, onClose, ...modalProps } = props;

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <UnstyledButton onClick={open}>Button without styles</UnstyledButton>;
      <Modal
        opened={opened}
        centered
        size="lg"
        title="选择图片"
        {...modalProps}
        onClose={() => {
          close();
          onClose?.();
        }}
      >
        <SelectImageModalContent
          {...contentProps}
          onConfirm={(value) => {
            onConfirm?.(value);
            close();
          }}
        />
      </Modal>
    </>
  );
};
export default SelectImageModal;
