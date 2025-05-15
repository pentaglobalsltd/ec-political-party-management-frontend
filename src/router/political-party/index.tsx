import PoliticalParty from '@containers/center-officer-management/controller-list/political-party';
import NoMatch from '@containers/no-match';
import { RouteType } from '../types';

const politicalPartyRoutes = (): RouteType[] => [
  {
    id: '1.1',
    index: true,
    element: <PoliticalParty />,
    redirection: <NoMatch />,
  },
];

export default politicalPartyRoutes;
