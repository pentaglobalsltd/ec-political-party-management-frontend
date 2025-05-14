import ElectionDeclarationLayoutView from '@containers/layout/election-declaration-management-layout';
import electionDeclarationRoutes from './election-declaration-management';

import VoteCenterLayoutView from '@containers/layout/vote-center-management-layout';
import voteCenterRoutes from './vote-center-management';

import CenterOfficerLayoutView from '@containers/layout/center-officer-management-layout';
import centerOfficerRoutes from './center-officer-management';

import CandidateInfoLayoutView from '@containers/layout/candidate-info-management-layout';
import candidateInfoRoutes from './candidate-info-management';

import ResultManagementLayout from '@containers/layout/result-management';
import resultManagementRoutes from './result-management';

import UserLayoutView from '@containers/layout/user-management-layout';
import userRoutes from './user-management';

import Home from '@containers/home';
import NoMatch from '@containers/no-match';
import SignIn from '@containers/auth/sign-in';
import ResetPassword from '@containers/auth/reset-password';
import UpdatePassword from '@containers/auth/update-password';

import { PATH } from '@constants/paths';
import { RouteType } from './types';

const routes = (
  permissionsArray: string[],
  userType: string | undefined,
): RouteType[] => [
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
        id: '1.3',
        path: PATH.ELECTION_DECLARATION_MANAGEMENT,
        element: <ElectionDeclarationLayoutView />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
        children: electionDeclarationRoutes(permissionsArray),
      },
      {
        id: '1.4',
        path: PATH.VOTE_CENTER_MANAGEMENT,
        element: <VoteCenterLayoutView />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
        children: voteCenterRoutes(permissionsArray, userType),
      },
      {
        id: '1.5',
        path: PATH.CENTER_OFFICER_MANAGEMENT,
        element: <CenterOfficerLayoutView />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
        children: centerOfficerRoutes(permissionsArray),
      },
      {
        id: '1.6',
        path: PATH.CANDIDATE_INFO_MANAGEMENT,
        element: <CandidateInfoLayoutView />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
        children: candidateInfoRoutes(),
      },
      {
        id: '1.7',
        path: PATH.RESULT_MANAGEMENT,
        element: <ResultManagementLayout />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
        children: resultManagementRoutes(permissionsArray, userType),
      },
      {
        id: '1.8',
        path: PATH.USER_MANAGEMENT,
        element: <UserLayoutView />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
        children: userRoutes,
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
