import {
  AspectRatio,
  Button,
  Center,
  Divider,
  FileButton,
  Flex,
  Grid,
  Image,
  LoadingOverlay,
  Pagination,
  rem,
  Stack,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { FC, useState } from 'react';
import ImageTypeSelect from '../FormItems/Selects/ImageTypeSelect/ImageTypeSelect';
import { useForm } from '@mantine/form';
import { classNames, getPageTotal, uploadFile } from '@/utils';
import { IconCheck, IconTrash, IconUpload } from '@tabler/icons-react';
import { useRequest } from '@/hooks';
import {
  filesControllerGetPaginationList,
  FilesControllerGetPaginationListData,
  FilesResultDto,
} from '@/client';
import useTools from '@/hooks/useTools';
import styles from './SelectImageModalContent.module.css';

export interface SelectImageModalContentProps {
  onConfirm?: (images: FilesResultDto[]) => void;
  multiple?: boolean;
}

const DefultAccept = 'image/*';

const DefaultPageSize = 18;
const SelectImageModalContent: FC<SelectImageModalContentProps> = (props) => {
  const { onConfirm, multiple } = props;
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

  const [selectedList, setSelectedList] = useState<FilesResultDto[]>([]);

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

  const handleSelectImage = (value: FilesResultDto) => {
    if (multiple) {
      setSelectedList([value]);
      return;
    }
    const isHas = selectedList.some((item) => item._id === value._id);
    if (isHas) {
      setSelectedList(selectedList.filter((item) => item._id !== value._id));
    } else {
      setSelectedList([...selectedList, value]);
    }
  };

  const handleConfirm = async () => {
    onConfirm?.(selectedList);
  };

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
          <Flex flex={1} justify="flex-end" gap="md">
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
                <UnstyledButton
                  className={classNames([
                    styles.imageItem,
                    {
                      [styles.imageItemSelected]:
                        selectedList.findIndex(
                          (selected) => selected._id === item._id,
                        ) !== -1,
                    },
                  ])}
                  display="flex"
                  onClick={() => {
                    handleSelectImage(item);
                  }}
                >
                  <AspectRatio ratio={1}>
                    <Center w="100%" h="100%">
                      <Image src={getFilePath(item.path)} radius="default" />
                    </Center>
                  </AspectRatio>
                </UnstyledButton>
              </Grid.Col>
            ))}
          </Grid>
          <Flex justify="space-between" h={rem(36)} align="center">
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
            <Flex gap="md">
              {selectedList.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => {
                      setSelectedList([]);
                    }}
                    size="sm"
                    leftSection={<IconTrash />}
                  >
                    清除选择
                  </Button>
                  <Button
                    onClick={() => {
                      handleConfirm();
                    }}
                    color="green"
                    leftSection={<IconCheck />}
                  >
                    确定
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Stack>
      </Stack>
    </div>
  );
};

export default SelectImageModalContent;
