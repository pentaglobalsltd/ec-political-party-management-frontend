import { PATH } from '@constants/paths';
import Symbol from '@containers/center-officer-management/controller-list/symbol';
import CreateSymbol from '@containers/center-officer-management/controller-list/symbol/components/add-symbol/CreateSymbol';
import NoMatch from '@containers/no-match';
import { RouteType } from '../types';

const symbolRoutes = (): RouteType[] => [
  {
    id: '1.6.1.1',
    index: true,
    element: <Symbol />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.6.1.2',
    path: PATH.CREATE_SYMBOL,
    element: <CreateSymbol />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.6.1.3',
    path: PATH.EDIT_SYMBOL,
    element: <CreateSymbol />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
];

export default symbolRoutes;
