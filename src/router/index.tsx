'use client';

import { Route, Routes } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { routes } from './routes';

import { RouteType } from './types';
import { AllowedComponent } from './AllowedComponent';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useUserInfo from '@hooks/miscellaneous/auth/useUserInfo';
import { getStorage, setStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';
import { postRefreshToken } from '@api/miscellaneous/auth/auth';

export const AppRouter = () => {
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const { logout, isSuccess } = keycloak;

  const { decodeJwtToken } = useUserInfo();

  useEffect(() => {
    if (isSuccess) {
      decodeJwtToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    decodeJwtToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let maxTime: any;

    if (import.meta.env.VITE_AUTH_GRANT_FLOW !== 'true') {
      const currentAuthToken = getStorage(LS_KEYS.AUTH_TOKEN);

      const currentAuthTokenExpiresIn = parseInt(
        localStorage.getItem(LS_KEYS.AUTH_TOKEN + '_expiresIn') || '-1',
      );

      if (currentAuthToken && currentAuthTokenExpiresIn > 0) {
        const accessTokenOneMinLess = currentAuthTokenExpiresIn - 1 * 60 * 1000;

        const timeDiff = accessTokenOneMinLess - new Date().getTime();

        maxTime = setInterval(async () => {
          getNewAccessToken();
        }, timeDiff);
      }
    }

    return () => {
      clearInterval(maxTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const getNewAccessToken = async () => {
    const refreshToken = await getStorage(LS_KEYS.REFRESH_TOKEN);

    if (refreshToken) {
      postRefreshToken(refreshToken).then((res) => {
        setStorage(
          LS_KEYS.AUTH_TOKEN,
          res?.data?.access_token,
          res?.data?.expires_in,
        );
      });
    } else {
      logout();
    }
  };

  const buildRoute = (route: RouteType): ReactNode | null => {
    if (route === undefined || null) return null;
    const {
      id,
      children,
      path,
      element,
      redirection,
      permissions,
      index: idx,
    } = route;

    return idx ? (
      <Route
        index
        key={id}
        element={AllowedComponent(element, redirection, permissions)}
      />
    ) : (
      <Route
        path={path}
        key={id}
        element={AllowedComponent(element, redirection, permissions)}
      >
        {children ? (
          children.length && children.map((child) => buildRoute(child))
        ) : (
          <></>
        )}
      </Route>
    );
  };

  return (
    <Routes>
      {permissionsArray
        ? routes().map((route: RouteType) => buildRoute(route))
        : null}
    </Routes>
  );
};
