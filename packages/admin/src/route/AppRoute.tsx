import { useEffect, useCallback, ComponentType } from 'react';
import { setCurrentRouteKey, useAppDispatch } from '@/store';
import { useLocation } from 'react-router-dom';

export type AppRouteProps<T> = {
  component: ComponentType<T>;
  routeKey: string;
};

const AppRoute = <T extends Record<string, unknown>>({
  component: Component,
  routeKey,
  ...props
}: AppRouteProps<T>) => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const handleLayoutChange = useCallback(() => {
    dispatch(setCurrentRouteKey(routeKey));
  }, [dispatch, routeKey]);

  useEffect(() => {
    handleLayoutChange();
  }, [location, handleLayoutChange]);

  return <Component {...(props as T)} />;
};

export default AppRoute;
