import { ReactNode } from 'react';
import { PermissionType } from './types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import SignIn from '@containers/auth/sign-in';

const tokenAuthNeeded = (authPermission: string[]): boolean =>
  authPermission.includes('token');

const AllowedComponent = (
  element?: ReactNode,
  redirection?: ReactNode,
  permissions?: PermissionType,
): ReactNode => {
  const { pathname } = useLocation();

  const {
    keycloak: { authenticated, login },
  } = useAuthWrapper();

  if (permissions && tokenAuthNeeded(permissions.auth)) {
    if (authenticated) {
      return element;
    } else {
      /** when the user has a invalid token
       * and tries to navigate to 'login' page. */
      if (pathname === ROUTES.SIGN_IN) {
        return redirection;
      }

      /** when the user has a invalid token and tries to navigate private routes,
       * we took them either keycloak's login page, or our own login page */
      if (import.meta.env.VITE_AUTH_GRANT_FLOW === 'true') {
        login();
      } else if (import.meta.env.VITE_AUTH_GRANT_FLOW !== 'true') {
        return <SignIn />;
      }
    }
  } else {
    return element;
  }
};

export { AllowedComponent };
