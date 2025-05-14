import { PATH } from '@constants/paths';
import Symbol from '@containers/center-officer-management/controller-list/symbol';
import CreateSymbol from '@containers/center-officer-management/controller-list/symbol/components/add-symbol/CreateSymbol';
import NoMatch from '@containers/no-match';
import { RouteType } from '../types';
import PoliticalParty from '@containers/center-officer-management/controller-list/political-party';
import CreatePoliticalParty from '@containers/center-officer-management/controller-list/political-party/CreatePoliticalParty';
import EditPoliticalParty from '@containers/center-officer-management/controller-list/political-party/EditPoliticalParty';

const politicalPartyRoutes = (): RouteType[] => [
  {
    id: '1.5.1.1',
    index: true,
    element: <PoliticalParty />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.5.2',
    path: PATH.POLITICAL_PARTY, // রাজনৈতিক দল
    children: [
      {
        id: '1.5.2.1',
        index: true,
        element: <PoliticalParty />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.5.2.2',
        path: PATH.CREATE_POLITICAL_PARTY,
        element: <CreatePoliticalParty />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.5.2.3',
        path: PATH.EDIT_POLITICAL_PARTY,
        element: <EditPoliticalParty />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.5.3',
    path: PATH.SYMBOL,
    children: [
      {
        id: '1.5.3.1',
        index: true,
        element: <Symbol />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.5.3.2',
        path: PATH.CREATE_SYMBOL,
        element: <CreateSymbol />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.5.3.3',
        path: PATH.EDIT_SYMBOL,
        element: <CreateSymbol />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
];

export default politicalPartyRoutes;
