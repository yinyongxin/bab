import { LayoutTypes } from '@/@types/layout';
import useAppConfig from '@/store/hook/useAppConfig';
import { getFilePath } from '@/utils';
import { Image, Code, Group, Title, Burger } from '@mantine/core';
import { useContext, useMemo } from 'react';
import LayoutContext from '../LayoutContext';

const LogoArea = () => {
  const [appConfig] = useAppConfig();
  const { desktop, setDesktop } = useContext(LayoutContext);
  const burger = useMemo(() => {
    if (appConfig.layoutType === LayoutTypes.TopSide) {
      return (
        <Burger
          opened={desktop}
          onClick={() => setDesktop(!desktop)}
          aria-label="Toggle navigation"
        />
      );
    }
    return null;
  }, [desktop, appConfig.layoutType]);
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
