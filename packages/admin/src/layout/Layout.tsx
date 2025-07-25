import { lazy, Suspense, useEffect, useMemo } from 'react';
import useAuth from '@/hooks/useAuth';
import useLocale from '@/hooks/useLocale';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import { useAppSelector } from '@/store';
import { client } from '@/client/client.gen';
import { TOKEN_TYPE } from '@/constants/api.constant';
import Views from './Views';
import BaseLayout from './BaseLayout';
const AppSpotlight = lazy(
  () => import('../components/AppSpotlight/AppSpotlight'),
);

export function Layout() {
  const { authenticated } = useAuth();
  const session = useAppSelector((state) => state.auth.session);
  useEffect(() => {
    client.setConfig({
      // set default base url for requests
      // baseURL: 'http://localhost:3000',
      // set default headers for requests
      headers: {
        Authorization: `${TOKEN_TYPE}${session.token}`,
      },
    });
  }, [session]);
  useLocale();

  const content = useMemo(() => {
    if (authenticated) {
      return <BaseLayout />;
    }
    return <Views />;
  }, [authenticated]);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex flex-auto flex-col h-[100vh]">
            <LoadingScreen />
          </div>
        }
      >
        {content}
        <AppSpotlight />
      </Suspense>
    </>
  );
}
