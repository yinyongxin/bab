import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppSelector,
  useAppDispatch,
  AppThunkDispatch,
  initialUserState,
} from '@/store';
import appConfig from '@/configs/app.config';
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
import { NavigationTree } from '@/@types/navigation';

type Status = 'success' | 'failed';
// 递归构建导航树
const buildNavigationTree = (
  list: MenusResultDto[],
  parent?: string,
): NavigationTree[] => {
  return list
    .filter((itemAuthMenu) => itemAuthMenu.parent === parent)
    .map((menu) => ({
      key: menu._id,
      path: menu?.path || '',
      title: menu.name,
      translateKey: '',
      icon: menu.icon,
      subMenu: buildNavigationTree(list, menu._id),
    }));
};

const buildAuthMenusTree = (
  list: MenusResultDto[],
  parent?: string,
): TreeMenuDataDto[] => {
  return list
    .filter((itemAuthMenu) => itemAuthMenu.parent === parent)
    .map((menu) => ({
      ...menu,
      children: buildAuthMenusTree(list, menu._id),
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
    allMenus.data?.filter((menu) => menus.includes(menu._id)) || [];
  dispatch(
    setMenus({
      list: authMenus,
      tree: buildAuthMenusTree(authMenus, ''),
      navigationTree: buildNavigationTree(
        authMenus.filter(
          ({ menuType }) => menuType !== MenuTypeEnum.FUNCTION_AREA,
        ),
        '',
      ),
    }),
  );
};

function useAuth() {
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
      dispatch(setUser(userInfo));
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
