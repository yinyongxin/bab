import { Modal, ModalProps, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SelectImageModalContent, {
  SelectImageModalContentProps,
} from './SelectImageModalContent';
import { FC } from 'react';

export interface SelectImageModalProps extends Partial<ModalProps> {
  contentProps?: SelectImageModalContentProps;
  children?: React.ReactNode;
}
const SelectImageModal: FC<SelectImageModalProps> = (props) => {
  const { contentProps, ...modalProps } = props;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <UnstyledButton onClick={open}>Button without styles</UnstyledButton>;
      <Modal
        opened={opened}
        centered
        size="lg"
        onClose={() => {
          close();
        }}
        title="选择图片"
        {...modalProps}
      >
        <SelectImageModalContent {...contentProps} />
      </Modal>
    </>
  );
};
export default SelectImageModal;
