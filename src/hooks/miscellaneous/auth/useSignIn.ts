import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  signInRequest,
  signInRestoreRequest,
} from '@actions/auth/auth-actions';
import { LS_KEYS } from '@constants/local-store';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@helpers/redux';
import { SignInState } from '@reducers/types/auth-state';
import { getSignInState } from '@selectors/auth-selector';
import { getStorage, removeStorage } from '@utils/local-store';
import { CommonAuthReturnType } from './useKcWrapper';
import useSignOut from './useSignOut';
import useUserInfo from './useUserInfo';

export const useSignIn = (): CommonAuthReturnType => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    signOutHook,
    restoreSignOut,
    isSuccess: signOutSuccess,
  } = useSignOut();

  const {
    clearDecodedJwtToken,
    userType,
    email,
    name,
    sub,
    preferred_username,
    realmAccess,
  } = useUserInfo();

  const data = useAppSelector<SignInState>(getSignInState);

  const requested = data.request;
  const isSuccess = Boolean(data.success);
  const isFailed = Boolean(data.failed);

  const authData = data?.data || null;

  const token = getStorage(LS_KEYS.AUTH_TOKEN) || undefined; // ask riad bhai
  const authenticated = !!token; // ask riad bhai

  const login = () => {
    navigate(ROUTES.SIGN_IN);
  };

  const signIn = (options: { username: string; password: string }) => {
    dispatch(
      signInRequest({
        username: options?.username,
        password: options?.password,
      }),
    );
  };

  const restoreSignIn = () => {
    dispatch(signInRestoreRequest());
  };

  const logout = () => {
    signOutHook();
  };

  useEffect(() => {
    if (signOutSuccess) {
      restoreSignIn();
      restoreSignOut();

      removeStorage(LS_KEYS.AUTH_TOKEN);
      removeStorage(LS_KEYS.REFRESH_TOKEN);
      clearDecodedJwtToken();

      navigate(ROUTES.SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signOutSuccess]);

  return {
    keycloak: {
      login,
      logout,
      token,
      authenticated,

      subject: sub,
      realmAccess,
      tokenParsed: {
        userType,
        email,
        name,
        sub,
        preferred_username,
      },

      signIn,
      requested,
      isSuccess,
      isFailed,
      authData,
    },
  };
};
