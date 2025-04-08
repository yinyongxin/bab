const ImageMIMEOptions = [
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

// application/json: JSON 格式
// application/xml: XML 格式
// application/octet-stream: 二进制流，通常用于未知文件类型
// application/pdf: PDF 文件
// application/vnd.ms-excel: Excel 文件
// application/vnd.openxmlformats-officedocument.spreadsheetml.sheet: Excel XLSX 文件
// application/zip: ZIP 文件
// application/x-zip-compressed: 另一个 ZIP 文件类型
// application/x-rar-compressed: RAR 文件
// application/vnd.ms-powerpoint: PowerPoint 文件
// application/vnd.openxmlformats-officedocument.presentationml.presentation: PowerPoint PPTX 文件

const ApplicationMIMEOptions = [
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
export const FileMIMEOptions = [...ImageMIMEOptions, ...ApplicationMIMEOptions];
