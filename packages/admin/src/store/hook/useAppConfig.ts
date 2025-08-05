import { AppConfigState, setAppConfig } from '../slices/appConfig';
import { useAppDispatch, useAppSelector } from '.';

const useAppConfig = () => {
  const appConfig = useAppSelector((state) => state.appConfig);
  const dispatch = useAppDispatch();
  const updateAppConfig = (payload: Partial<AppConfigState>) => {
    dispatch(setAppConfig(payload));
  };
  return [appConfig, updateAppConfig] as const;
};
export default useAppConfig;
