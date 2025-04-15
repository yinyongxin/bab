import { LayoutTypes } from '@/@types/layout';
import useAppConfig from '@/store/hook/useAppConfig';
import { Image, Code, Group, Title, Burger } from '@mantine/core';
import { useContext, useMemo } from 'react';
import LayoutContext from '../LayoutContext';
import useTools from '@/hooks/useTools';

const LogoArea = () => {
  const { getFilePath } = useTools();
  const [appConfig] = useAppConfig();
  const { desktop, setDesktop } = useContext(LayoutContext);
  const showBurger = appConfig.layoutType === LayoutTypes.TopSide;
  const logo = (
    <Image
      w="30"
      h="30"
      radius="sm"
      alt="Logo"
      src={getFilePath(appConfig.logo)}
    />
  );
  return (
    <>
      <Group justify="space-between" align="center" h="100%" px="md" w={300}>
        {showBurger && (
          <Burger
            opened={desktop}
            onClick={() => setDesktop(!desktop)}
            aria-label="Toggle navigation"
          />
        )}
        {logo}
        <Title order={5} flex={1}>
          {appConfig.name}
        </Title>
        <Code fw={700}>{appConfig.version}</Code>
      </Group>
    </>
  );
};

export default LogoArea;
