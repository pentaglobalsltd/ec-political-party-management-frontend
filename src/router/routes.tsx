import CenterOfficerLayoutView from '@containers/layout/center-officer-management-layout';

import Home from '@containers/home';

import { PATH } from '@constants/paths';
import politicalPartyRoutes from './political-party';
import symbolRoutes from './symbol';
import { RouteType } from './types';

const routes = (): RouteType[] => [
  {
    id: '1',
    path: `${PATH.HOME}`,
    element: <Home />,
    children: [
      {
        id: '1.1',
        index: true,
        element: <Home />,
      },

      {
        id: '1.5',
        path: PATH.POLITICAL_PARTY,
        element: <CenterOfficerLayoutView />,

        children: politicalPartyRoutes(),
      },
      {
        id: '1.6',
        path: PATH.SYMBOL,
        element: <CenterOfficerLayoutView />,

        children: symbolRoutes(),
      },
    ],
  },
];

export { routes };
