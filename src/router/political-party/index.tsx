import { PATH } from '@constants/paths';
import PoliticalParty from '@containers/center-officer-management/controller-list/political-party';
import CreatePoliticalParty from '@containers/center-officer-management/controller-list/political-party/CreatePoliticalParty';
import EditPoliticalParty from '@containers/center-officer-management/controller-list/political-party/EditPoliticalParty';
import NoMatch from '@containers/no-match';
import { RouteType } from '../types';

const politicalPartyRoutes = (): RouteType[] => [
  {
    id: '1.5.1.1',
    index: true,
    element: <PoliticalParty />,
    redirection: <NoMatch />,
  },
  {
    id: '1.5.1.2',
    path: PATH.CREATE_POLITICAL_PARTY,
    element: <CreatePoliticalParty />,
    redirection: <NoMatch />,
  },
  {
    id: '1.5.1.3',
    path: PATH.EDIT_POLITICAL_PARTY,
    element: <EditPoliticalParty />,
    redirection: <NoMatch />,
  },
];

export default politicalPartyRoutes;
