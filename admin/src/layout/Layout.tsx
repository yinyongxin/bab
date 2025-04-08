import { lazy, Suspense, useMemo } from 'react';
import useAuth from '@/utils/hooks/useAuth';
import useLocale from '@/utils/hooks/useLocale';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import { LayoutTypes } from '@/@types/layout';
import { useAppSelector } from '@/store';
import { SpotlightActionData, Spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import FontIcons from '../components/FontIcons';
import { useNavigate } from 'react-router-dom';
import { useShallowEffect } from '@mantine/hooks';
import { client } from '@/client/client.gen';
import { TOKEN_TYPE } from '@/constants/api.constant';
import { MenuTypeEnum } from '@/client';

const layouts: any = {
  [LayoutTypes.SimpleSideBar]: lazy(
    () => import('./LayoutTypes/SimpleSideBar/SimpleSideBar'),
  ),
  [LayoutTypes.DeckedSideBar]: lazy(
    () => import('./LayoutTypes/DeckedSideBar/DeckedSideBar'),
  ),
};

export function Layout() {
  const { authenticated } = useAuth();
  const layoutType = useAppSelector((state) => state.theme.currentLayout);
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const { menus } = auth;

  useLocale();

  client.setConfig({
    // set default base url for requests
    // baseURL: 'http://localhost:3000',
    // set default headers for requests
    headers: {
      Authorization: `${TOKEN_TYPE}${auth.session.token}`,
    },
  });

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return layouts[layoutType];
    }
    return lazy(() => import('./AuthLayout'));
  }, [authenticated]);

  const actions: SpotlightActionData[] = menus.list
    .filter((item) => item.menuType === MenuTypeEnum.PAGE)
    .map((item) => {
      return {
        id: item._id,
        label: item.name,
        description: item.description,
        onClick: () => {
          const parent = menus.list.find(
            (listItem) => listItem._id === item.parent,
          );
          navigate(`/${parent?.path}/${item.path}`);
        },
        leftSection: (
          <FontIcons style={{ fontSize: 24 }} name={item.icon || 'menu-deep'} />
        ),
      };
    });
  return (
    <>
      <Suspense
        fallback={
          <div className="flex flex-auto flex-col h-[100vh]">
            <LoadingScreen />
          </div>
        }
      >
        <AppLayout />
      </Suspense>
      <Spotlight
        actions={actions}
        nothingFound="未找到"
        highlightQuery
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: '搜索',
        }}
      />
    </>
  );
}
