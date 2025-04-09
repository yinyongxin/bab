import { setAppConfig, useAppDispatch, useAppSelector } from '@/store';
import { getFilePath } from '@/utils';
import { Image, Code, Group, Title } from '@mantine/core';

const LogoArea = () => {
  const appConfig = useAppSelector((state) => state.appConfig);
  const dispatch = useAppDispatch();
  const toggleDesktop = () => {
    dispatch(
      setAppConfig({
        desktop: !appConfig.desktop,
      }),
    );
  };
  return (
    <Group justify="space-between" align="center" h="100%" px="md" w={300}>
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
