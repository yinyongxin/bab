import Page from '@/components/Page/Page';
import { Paper, Tabs } from '@mantine/core';
import { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string | null>('base');
  const tabs = (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="base">基本设置</Tabs.Tab>
        <Tabs.Tab value="app">APP设置</Tabs.Tab>
        <Tabs.Tab value="admin">管理端设置</Tabs.Tab>
        <Tabs.Tab value="backend">后端设置</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
  return (
    <Page tabs={tabs}>
      <Paper h="2000"></Paper>
    </Page>
  );
};

export default Settings;
