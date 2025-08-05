import Page from '@/components/Page/Page';
import Projcet from '@/components/Project/Project';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const AddProject = () => {
  return (
    <Page
      actions={[
        <Button leftSection={<IconPlus size={16} />} key="save">
          保存
        </Button>,
      ]}
    >
      <Projcet />
    </Page>
  );
};

export default AddProject;
