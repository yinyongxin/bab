import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppSelector,
  useAppDispatch,
  AppThunkDispatch,
  initialUserState,
} from '@/store';
import { REDIRECT_URL_KEY } from '@/constants/app.constant';
import { useNavigate } from 'react-router-dom';
import useQuery from './useQuery';
import {
  authControllerSignIn,
  menusControllerGetAllByFilter,
  MenusResultDto,
  MenuTypeEnum,
  SignInDto,
  TreeMenuDataDto,
} from '@/client';
import { setMenus } from '@/store/slices/auth/menusSlice';
import useAppConfig from '@/store/hook/useAppConfig';

type Status = 'success' | 'failed';

// 递归构建树
const buildMenusTree = (
  list: MenusResultDto[],
  parent?: string,
): TreeMenuDataDto[] => {
  return list
    .filter((itemAuthMenu) => itemAuthMenu.parent === parent)
    .map((menu) => ({
      ...menu,
      children: buildMenusTree(list, menu._id),
    }));
};

/**
 * 更新菜单
 */
const updateMenus = async (menus: string[], dispatch: AppThunkDispatch) => {
  const allMenus = await menusControllerGetAllByFilter({
    body: {},
  });
  /** 有权限的菜单 */
  const authMenus =
    allMenus.data
      ?.map((item) => ({
        ...item,
        createdTime: undefined as unknown as Date,
        updatedTime: undefined as unknown as Date,
      }))
      ?.filter((menu) => menus.includes(menu._id)) || [];
  /** 导航菜单 */
  const navigationMenus = authMenus.filter(
    ({ menuType }) => menuType !== MenuTypeEnum.FUNCTION_AREA,
  );
  dispatch(
    setMenus({
      list: authMenus,
      tree: buildMenusTree(authMenus, ''),
      navigationTree: buildMenusTree(navigationMenus, ''),
    }),
  );
};

function useAuth() {
  const [appConfig] = useAppConfig();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, signedIn } = useAppSelector((state) => state.auth.session);
  const query = useQuery();

  const signIn = async (
    values: SignInDto,
  ): Promise<
    | {
        status: Status;
        message: string;
      }
    | undefined
  > => {
    try {
      const signRes = await authControllerSignIn({
        body: values,
      });
      const { data, error } = signRes;
      if (!data) {
        return {
          status: 'failed',
          message: (error as any).message,
        };
      }
      updateMenus(data.menus, dispatch);
      const { access_token, userInfo } = data;
      dispatch(
        signInSuccess({
          token: access_token,
          refreshToken: '',
          expireTime: 0,
        }),
      );
      dispatch(
        setUser({
          ...userInfo,
          avatar: `${appConfig.fileBaseUrl}${userInfo.avatar}`,
          createdTime: userInfo.createdTime.toString(),
          updatedTime: userInfo.updatedTime.toString(),
        }),
      );
      const redirectUrl = query.get(REDIRECT_URL_KEY);
      navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
      return {
        status: 'success',
        message: '',
      };
    } catch (errors: any) {
      return {
        status: 'failed',
        message: '登录失败',
      };
    }
  };

  const signUp = async () => {};

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    dispatch(setUser(initialUserState));
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    // await apiSignOut()
    handleSignOut();
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signUp,
    signOut,
  };
}

export default useAuth;
