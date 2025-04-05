import type { Meta, StoryObj } from '@storybook/react';

import TablePage from './index';

const meta: Meta<typeof TablePage> = {
  component: TablePage,
};

export default meta;
type Story = StoryObj<typeof TablePage>;

export const Default: Story = {
  args: {
    columns: [],
    dataList: [],
    rowkey: 'id' as any,
  },
};
