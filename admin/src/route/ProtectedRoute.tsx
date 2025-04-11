import { REDIRECT_URL_KEY } from '@/constants/app.constant';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/utils/hooks/useAuth';
import useAppConfig from '@/store/hook/useAppConfig';

const ProtectedRoute = () => {
  const [appConfig] = useAppConfig();
  const { unAuthenticatedEntryPath } = appConfig;
  const { authenticated } = useAuth();

  const location = useLocation();

  if (!authenticated) {
    return (
      <Navigate
        replace
        to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
