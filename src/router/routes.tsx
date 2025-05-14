import CenterOfficerLayoutView from '@containers/layout/center-officer-management-layout';

import Home from '@containers/home';
import NoMatch from '@containers/no-match';
import SignIn from '@containers/auth/sign-in';
import ResetPassword from '@containers/auth/reset-password';
import UpdatePassword from '@containers/auth/update-password';

import { PATH } from '@constants/paths';
import { RouteType } from './types';
import politicalPartyRoutes from './political-party';
import symbolRoutes from './symbol';

const routes = (): RouteType[] => [
  {
    id: '2',
    path: PATH.SIGN_IN,
    element: <SignIn />,
  },

  {
    id: '4',
    path: PATH.RESET_PASSWORD,
    element: <ResetPassword />,
  },

  {
    id: '1',
    path: `${PATH.HOME}`,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
    children: [
      {
        id: '1.1',
        index: true,
        element: <Home />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.5',
        path: PATH.POLITICAL_PARTY,
        element: <CenterOfficerLayoutView />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
        children: politicalPartyRoutes(),
      },
      {
        id: '1.6',
        path: PATH.SYMBOL,
        element: <CenterOfficerLayoutView />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
        children: symbolRoutes(),
      },
      // update password
      {
        id: '1.9',
        path: PATH.UPDATE_PASSWORD,
        element: <UpdatePassword />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  {
    id: '5',
    path: '*',
    element: <NoMatch />,
  },
];

export { routes };
