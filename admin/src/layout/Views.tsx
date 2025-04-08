import { Suspense } from 'react';
import appConfig from '@/configs/app.config';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  errorRoutes,
  protectedRoutes,
  publicRoutes,
} from '@/configs/routes.config';
import ProtectedRoute from '@/route/ProtectedRoute';
import AppRoute from '@/route/AppRoute';
import PublicRoute from '@/route/PublicRoute';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

const { authenticatedEntryPath } = appConfig;
const AllRoutes = () => {
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
                <AppRoute routeKey={route.key} component={route.component} />
              }
            />
          );
        })}
        <Route path="*" element={<Navigate replace to="/nothingFound" />} />
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
      {errorRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
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
