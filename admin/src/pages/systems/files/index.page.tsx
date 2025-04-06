import { filesControllerGetDirsPagination } from '@/client';
import Page from '@/components/Page';
import { Tabs } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useState } from 'react';
import FileList from './FileList';

export default () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [dirList, setDirList] = useState<string[]>([]);
  const getDirs = async () => {
    const getDirsRes = await filesControllerGetDirsPagination({
      body: {},
    });
    if (!getDirsRes.error) {
      setDirList(getDirsRes.data?.list || []);
      setActiveTab(`/${getDirsRes.data?.list[0]}`);
    }
  };

  useShallowEffect(() => {
    getDirs();
  }, []);
  const tabsRender = () => {
    return (
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          {dirList.map((item) => (
            <Tabs.Tab key={item} value={`/${item}`}>
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    );
  };
  return (
    <>
      <Page title="文件管理" headerBottom={tabsRender()}>
        {activeTab && (
          <>
            <FileList dirPath={activeTab} />
          </>
        )}
      </Page>
    </>
  );
};
