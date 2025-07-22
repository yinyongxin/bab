import {
  AspectRatio,
  Box,
  Button,
  Divider,
  FileButton,
  Flex,
  Grid,
  Image,
  LoadingOverlay,
  Pagination,
  Stack,
  TextInput,
} from '@mantine/core';
import { FC, useState } from 'react';
import ImageTypeSelect from '../FormItems/Selects/ImageTypeSelect/ImageTypeSelect';
import { useForm } from '@mantine/form';
import { getPageTotal, uploadFile } from '@/utils';
import { IconUpload } from '@tabler/icons-react';
import { useRequest } from '@/hooks';
import {
  filesControllerGetPaginationList,
  FilesControllerGetPaginationListData,
} from '@/client';
import useTools from '@/hooks/useTools';

export interface SelectImageModalContentProps {
  onConfirm?: (imageSrc: string) => void;
}

const DefultAccept = 'image/*';

const DefaultPageSize = 18;
const SelectImageModalContent: FC<SelectImageModalContentProps> = () => {
  const { getFilePath } = useTools();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      imageType: DefultAccept,
      name: '',
    },
  });
  const [accept, setAccept] = useState(DefultAccept);
  form.watch('imageType', ({ value }) => {
    setAccept(value);
  });

  const imageListRequest = useRequest(
    async (
      query: Partial<FilesControllerGetPaginationListData['query']>,
      body?: Partial<FilesControllerGetPaginationListData['body']>,
    ) => {
      const getDirsRes = await filesControllerGetPaginationList({
        query: {
          pageNo: query?.pageNo || 1,
          pageSize: query?.pageSize || DefaultPageSize,
        },
        body: {
          ...body,
        },
      });
      return getDirsRes.data;
    },
    {
      refreshDeps: [],
    },
  );

  return (
    <div>
      <Stack>
        <Flex gap="md">
          <TextInput
            placeholder="请输入图片名称"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <ImageTypeSelect
            key={form.key('imageType')}
            {...form.getInputProps('imageType')}
          />
          <Flex flex={1} justify="flex-end">
            <FileButton
              key="upload"
              onChange={async (file) => {
                await uploadFile(file);
              }}
              accept={accept}
            >
              {(props) => (
                <Button {...props} leftSection={<IconUpload size={14} />}>
                  上传图片
                </Button>
              )}
            </FileButton>
          </Flex>
        </Flex>
        <Divider />
        <Stack gap="md">
          <Grid gutter="md" pos="relative" h={289}>
            <LoadingOverlay visible={imageListRequest.loading} />
            {imageListRequest.data?.list.map((item) => (
              <Grid.Col span={2}>
                <AspectRatio ratio={1}>
                  <Box w="100%" h="100%">
                    <Image src={getFilePath(item.path)} />
                  </Box>
                </AspectRatio>
              </Grid.Col>
            ))}
          </Grid>
          <Flex justify="end">
            <Pagination
              total={getPageTotal(
                imageListRequest.data?.total || 0,
                imageListRequest.data?.pageSize || DefaultPageSize,
              )}
              hideWithOnePage={false}
              value={imageListRequest.data?.pageNo || 1}
              onChange={(value) => {
                imageListRequest.run({
                  pageNo: value,
                });
              }}
            />
          </Flex>
        </Stack>
      </Stack>
    </div>
  );
};

export default SelectImageModalContent;
