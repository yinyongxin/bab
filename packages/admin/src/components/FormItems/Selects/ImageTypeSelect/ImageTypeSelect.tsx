import { imageMIMEOptions } from '@/constants/options';
import { Select, SelectProps } from '@mantine/core';

export interface ImageTypeSelectProps extends SelectProps {}
const ImageTypeSelect = (props: ImageTypeSelectProps) => {
  const { ...selectProps } = props;
  return (
    <Select
      placeholder="全部图片类型"
      data={imageMIMEOptions}
      {...selectProps}
    />
  );
};
export default ImageTypeSelect;
