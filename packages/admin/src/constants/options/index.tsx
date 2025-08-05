import { StatusEnum, SexEnum } from '@/client';
import { Option } from '@/@types';
import {
  IconGenderFemale,
  IconGenderMale,
  IconLock,
  IconLockOpen,
} from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';
import { convertToObject } from '@/utils';
import { iconProps } from './base';

export const sexIcons: Record<SexEnum, React.ReactNode> = {
  [SexEnum.MALE]: <IconGenderMale color="blue" {...iconProps} />,
  [SexEnum.FEMALE]: <IconGenderFemale color="red" {...iconProps} />,
};

export const sexOptions: Option<SexEnum>[] = [
  {
    label: '男',
    value: SexEnum.MALE,
    icon: sexIcons[SexEnum.MALE],
    renderContent: (
      <Group gap="2">
        {sexIcons[SexEnum.MALE]}
        <Text>男</Text>
      </Group>
    ),
  },
  {
    label: '女',
    value: SexEnum.FEMALE,
    icon: sexIcons[SexEnum.FEMALE],
    renderContent: (
      <Group gap="2">
        {sexIcons[SexEnum.FEMALE]}
        <Text>女</Text>
      </Group>
    ),
  },
];

export const sexOptionsObj = convertToObject(sexOptions);

export const admintorsStatusOptions: Option<StatusEnum>[] = [
  {
    label: '开启',
    value: StatusEnum.OPEN,
    icon: sexIcons[SexEnum.MALE],
    renderContent: (
      <Group gap="xs">
        <IconLockOpen color="green" {...iconProps} />
        <Text>开启</Text>
      </Group>
    ),
  },
  {
    label: '关闭',
    value: StatusEnum.CLOSE,
    icon: sexIcons[SexEnum.FEMALE],
    renderContent: (
      <Group gap="xs">
        <IconLock color="red" {...iconProps} />
        <Text>关闭</Text>
      </Group>
    ),
  },
];

export const admintorsStatusOptionsObj = convertToObject(
  admintorsStatusOptions,
);

export const imageMIMEOptions = [
  {
    value: 'image/png',
    label: 'PNG 图片',
  },
  {
    value: 'image/jpeg',
    label: 'JPEG 图片',
  },
  {
    value: 'image/gif',
    label: 'GIF 图片',
  },
  {
    value: 'image/webp',
    label: 'WebP 图片',
  },
  {
    value: 'image/svg+xml',
    label: 'SVG 矢量图形',
  },
  {
    value: 'image/tiff',
    label: 'TIFF 图片',
  },
];

export const imageMIMEOptionsObj = convertToObject(imageMIMEOptions);

const applicationMIMEOptions = [
  {
    value: 'application/json',
    label: 'JSON 格式',
  },
  {
    value: 'application/xml',
    label: 'XML 格式',
  },
  // {
  //   value: 'application/octet-stream',
  //   label: '二进制流',
  // },
  {
    value: 'application/pdf',
    label: 'PDF 文件',
  },
  {
    value: 'application/vnd.ms-excel',
    label: 'Excel 文件',
  },
  // {
  //   value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   label: 'Excel XLSX 文件',
  // },
  {
    value: 'application/zip',
    label: 'ZIP 文件',
  },
  // {
  //   value: 'application/x-zip-compressed',
  //   label: '另一个 ZIP 文件类型',
  // },
  {
    value: 'application/x-rar-compressed',
    label: 'RAR 文件',
  },

  {
    value: 'application/vnd.ms-powerpoint',
    label: 'PowerPoint 文件',
  },
  // {
  //   value:
  //     'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  //   label: 'PowerPoint PPTX 文件',
  // },
  {
    value: 'application/vnd.ms-word',
    label: 'Word 文件',
  },
  // {
  //   value:
  //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //   label: 'Word DOCX 文件',
  // },
];

export const applicationMIMEOptionsObj = convertToObject(
  applicationMIMEOptions,
);

export const fileMIMEOptions = [...imageMIMEOptions, ...applicationMIMEOptions];

export const fileMIMEOptionsObj = {
  ...applicationMIMEOptionsObj,
  ...imageMIMEOptionsObj,
};
