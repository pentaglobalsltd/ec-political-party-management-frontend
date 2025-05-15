import { PATH } from '@constants/paths';
import politicalPartyRoutes from './political-party';
import { RouteType } from './types';
import CenterOfficerLayoutView from '@containers/layout/center-officer-management-layout';

const routes = (): RouteType[] => [
  {
    id: '1',
    path: `${PATH.HOME}`,
    element: <CenterOfficerLayoutView />,
    children: politicalPartyRoutes(),
  },
];

export { routes };
