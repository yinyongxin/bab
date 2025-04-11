import { LayoutTypes } from '@/@types/layout';
import { setAppConfig, useAppDispatch, useAppSelector } from '@/store';
import useAppConfig from '@/store/hook/useAppConfig';
import { getFilePath } from '@/utils';
import { Image, Code, Group, Title, Burger } from '@mantine/core';
import { useMemo } from 'react';

const LogoArea = () => {
  const [appConfig, updateAppConfig] = useAppConfig();
  const burger = useMemo(() => {
    if (appConfig.layoutType === LayoutTypes.TopSide) {
      return (
        <Burger
          opened={appConfig.desktop}
          onClick={() =>
            updateAppConfig({
              desktop: !appConfig.desktop,
            })
          }
          aria-label="Toggle navigation"
        />
      );
    }
    return null;
  }, [appConfig.desktop, appConfig.layoutType]);
  return (
    <Group justify="space-between" align="center" h="100%" px="md" w={300}>
      {burger}
      <Image
        w="30"
        h="30"
        radius="sm"
        alt="Logo"
        src={getFilePath(appConfig.logo)}
      />
      <Title order={5} flex={1}>
        {appConfig.name}
      </Title>
      <Code fw={700}>{appConfig.version}</Code>
    </Group>
  );
};

export default LogoArea;
