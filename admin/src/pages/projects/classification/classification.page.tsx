import Page from '@/components/Page/Page';
import Projcet from '@/components/Project/Project';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const Classification = () => {
  return (
    <Page
      actions={[
        <Button leftSection={<IconPlus size={16} />} key="save">
          新增分类
        </Button>,
      ]}
    >
      sdfaf
    </Page>
  );
};

export default Classification;
