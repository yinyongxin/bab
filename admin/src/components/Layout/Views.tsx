import { Suspense } from 'react';
import appConfig from '@/configs/app.config';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { protectedRoutes, publicRoutes } from '@/configs/routes.config';
import ProtectedRoute from '@/route/ProtectedRoute';
import AppRoute from '@/route/AppRoute';
import AuthorityGuard from '@/route/AuthorityGuard';
import PublicRoute from '@/route/PublicRoute';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

const { authenticatedEntryPath } = appConfig;
const AllRoutes = () => {
  const userAuthority = useAppSelector((state) => state.auth.user.roles);

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        />
        {protectedRoutes.map((route, index) => {
          return (
            <Route
              key={route.key + index}
              path={route.path}
              element={
                <AuthorityGuard
                  userAuthority={userAuthority}
                  authority={route.authority}
                >
                  <AppRoute
                    routeKey={route.key}
                    component={route.component}
                    {...route.authority}
                  />
                </AuthorityGuard>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute routeKey={route.key} component={route.component} />
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

const Views = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AllRoutes />
    </Suspense>
  );
};

export default Views;
