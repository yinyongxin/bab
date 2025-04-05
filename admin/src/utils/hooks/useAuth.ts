import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppSelector,
  useAppDispatch,
  setUserInfo,
  setUserId,
} from '@/store';
import appConfig from '@/configs/app.config';
import { REDIRECT_URL_KEY } from '@/constants/app.constant';
import { useNavigate } from 'react-router-dom';
import { SignInCredential, SignUpCredential } from '@/@types/auth';
import useQuery from './useQuery';
import { authControllerSignIn } from '@/client';

type Status = 'success' | 'failed';

function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, signedIn } = useAppSelector((state) => state.auth.session);
  const userId = useAppSelector((state) => state.auth.userInfo.userId);
  const query = useQuery();

  const signIn = async (
    values: SignInCredential,
  ): Promise<
    | {
        status: Status;
        message: string;
      }
    | undefined
  > => {
    try {
      const { data } = await authControllerSignIn({
        body: values,
      });
      if (!data) {
        return {
          status: 'failed',
          message: 'Invalid username or password',
        };
      }
      const { access_token, userInfo } = data;
      dispatch(setUserId(userInfo._id));
      dispatch(
        signInSuccess({
          token: access_token,
          refreshToken: '',
          expireTime: 0,
        }),
      );
      dispatch(
        setUser({
          username: userInfo.username,
          email: userInfo.email,
          role: userInfo.roles,
          phoneNumber: userInfo.phone,
          avatar: userInfo.avatar,
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
        message: errors?.response?.data?.description || errors.toString(),
      };
    }
  };

  const signUp = async (values: SignUpCredential) => {
    // try {
    //   await AuthService.signUp(values)
    //   return {
    //     status: 'success',
    //     message: ''
    //   }
    // } catch (errors: any) {
    //   return {
    //     status: 'failed',
    //     message: errors?.response?.data?.description || errors.toString()
    //   }
    // }
  };

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    dispatch(
      setUserInfo({
        googleLogin: false,
        name: '',
        role: '',
        email: '',
        userId,
      }),
    );
    dispatch(
      setUser({
        username: '',
        role: [],
        email: '',
      }),
    );
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
