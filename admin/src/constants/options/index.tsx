import { AdmintorStatusEnum, SexEnum } from '@/client';
import { Option } from '@/@types';
import {
  IconGenderFemale,
  IconGenderMale,
  IconLock,
  IconLockOpen,
} from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';

function convertToObject<T = any>(arr: Option<T>[]) {
  return arr.reduce(
    (acc, cur) => {
      acc[cur.value] = cur;
      return acc;
    },
    //@ts-ignore
    {} as Record<T, Option<T>>,
  );
}

const iconProps = {
  stroke: 1.5,
  opacity: 0.6,
  size: 18,
};

export const sexIcons: Record<SexEnum, React.ReactNode> = {
  Male: <IconGenderMale color="blue" {...iconProps} />,
  Female: <IconGenderFemale color="red" {...iconProps} />,
};

export const sexOptions: Option<SexEnum>[] = [
  {
    label: '男',
    value: 'Male',
    icon: sexIcons.Male,
    renderContent: (
      <Group gap="xs">
        {sexIcons.Male}
        <Text>男</Text>
      </Group>
    ),
  },
  {
    label: '女',
    value: 'Female',
    icon: sexIcons.Female,
    renderContent: (
      <Group gap="xs">
        {sexIcons.Female}
        <Text>女</Text>
      </Group>
    ),
  },
];

export const sexOptionsObj = convertToObject(sexOptions);

export const admintorsStatusOptions: Option<AdmintorStatusEnum>[] = [
  {
    label: '开启',
    value: AdmintorStatusEnum.OPEN,
    icon: sexIcons.Male,
    renderContent: (
      <Group gap="xs">
        <IconLockOpen color="green" {...iconProps} />
        <Text>开启</Text>
      </Group>
    ),
  },
  {
    label: '关闭',
    value: AdmintorStatusEnum.CLOSE,
    icon: sexIcons.Female,
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

const imageMIMEOptions = [
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
