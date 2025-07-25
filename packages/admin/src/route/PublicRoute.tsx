import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useAppConfig from '@/store/hook/useAppConfig';

const PublicRoute = () => {
  const [appConfig] = useAppConfig();
  const { authenticatedEntryPath } = appConfig;
  const { authenticated } = useAuth();

  return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />;
};

export default PublicRoute;
