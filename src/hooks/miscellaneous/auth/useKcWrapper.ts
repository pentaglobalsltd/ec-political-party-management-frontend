import { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import { removeStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';
import useUserInfo from './useUserInfo';

export interface CommonAuthReturnType {
  keycloak: {
    login: () => void;
    signIn: (options?: any) => void;
    logout: () => void;
    token: string | undefined;
    authenticated: boolean | undefined;
    tokenParsed?: {
      userType?: string;
      email?: string;
      name?: string;
      sub?: string;
      preferred_username?: string;
    };
    subject: string | undefined;
    realmAccess?: {
      roles?: string[];
    };

    requested?: boolean;
    isSuccess?: boolean;
    isFailed?: boolean;
    authData?: any;
  };
}

export const useKcWrapper = (): CommonAuthReturnType => {
  const { keycloak, initialized } = useKeycloak();

  const {
    logout: kcLogout,
    authenticated,
    login: kcLogin,
    token,
    tokenParsed,
    subject,
  } = keycloak;

  const { realmAccess, decodeJwtToken } = useUserInfo();

  const login = () => {
    kcLogin();
  };

  const signIn = (options: { email: string; password: string }) => {
    console.log(
      'inside KcWarapper signIn - nothing should happen here',
      options,
    );
    // dispatch(signInRequest(options.email, options.password));
  };

  const logout = async () => {
    await removeStorage(LS_KEYS.AUTH_TOKEN);
    kcLogout({ redirectUri: window.location.origin });
  };

  // this is how we should get the new access-token from KC
  useEffect(() => {
    if (initialized) {
      keycloak.onAuthRefreshSuccess = () => {
        console.log('Token refreshed successfully');
        console.log({ newKcToken: keycloak.token });
        decodeJwtToken(keycloak.token);
      };
    }

    return () => {
      keycloak.onAuthRefreshSuccess = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keycloak, initialized]);

  return {
    keycloak: {
      login,
      logout,
      token,
      authenticated,
      tokenParsed,
      realmAccess,
      subject,

      signIn,
    },
  };
};
