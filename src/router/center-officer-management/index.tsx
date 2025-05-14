import { PATH } from '@constants/paths';
import Symbol from '@containers/center-officer-management/controller-list/symbol';
import CreateSymbol from '@containers/center-officer-management/controller-list/symbol/components/add-symbol/CreateSymbol';
import NoMatch from '@containers/no-match';
import { RouteType } from '../types';
import PoliticalParty from '@containers/center-officer-management/controller-list/political-party';
import CreatePoliticalParty from '@containers/center-officer-management/controller-list/political-party/CreatePoliticalParty';
import EditPoliticalParty from '@containers/center-officer-management/controller-list/political-party/EditPoliticalParty';
import OrganizationList from '@containers/center-officer-management/controller-list/organization-list';
import CreateOrganizationList from '@containers/center-officer-management/controller-list/organization-list/components/CreateOrganizationList';
import OfficerList from '@containers/center-officer-management/controller-list/officer-list';
import CreateOfficerList from '@containers/center-officer-management/controller-list/officer-list/components/create-officer-list/CreateOfficerList';
import CenterBasedOfficerAllocation from '@containers/center-officer-management/controller-list/center-based-officer-distribution';
import CenterBasedOfficerList from '@containers/center-officer-management/controller-list/center-based-officer-list';
import CenterOfficerContactDetails from '@containers/center-officer-management/controller-list/center-officer-contact-details';
import EditOfficerList from '@containers/center-officer-management/controller-list/officer-list/components/edit-officer-list/EditOfficerList';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import HelpLine from '@containers/user-management/helpline';
import CenterOfficerSendSMS from '@containers/center-officer-management/send-sms';
import { isPermitted } from '@helpers/permission';

const centerOfficerRoutes = (permissionsArray: string[]): RouteType[] => [
  {
    id: '1.5.1.1',
    index: true,
    element: isPermitted(
      permissionsArray,
      CENTER_OFFICER_MANAGEMENT.POLITICAL_PARTY_VIEW,
    ) ? (
      <PoliticalParty />
    ) : (
      <OrganizationList />
    ),
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
  {
    id: '1.5.4',
    path: PATH.ORGANIZATION_LIST,
    children: [
      {
        id: '1.5.4.1',
        index: true,
        element: <OrganizationList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.5.4.2',
        path: PATH.CREATE_ORGANIZATION_LIST,
        element: <CreateOrganizationList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.5.4.3',
        path: PATH.EDIT_ORGANIZATION,
        element: <CreateOrganizationList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.5.5',
    path: PATH.OFFICER_LIST, //list of officers
    children: [
      {
        id: '1.5.5.1',
        index: true,
        element: <OfficerList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.5.5.2',
        path: PATH.CREATE_OFFICER,
        element: <CreateOfficerList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.5.5.3',
        path: PATH.EDIT_OFFICER,
        element: <EditOfficerList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.5.6',
    path: PATH.CENTER_BASED_OFFICER_DISTRIBUTION, //center based officers allocation
    element: <CenterBasedOfficerAllocation />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.5.7',
    path: PATH.CENTER_BASED_OFFICER_LIST, //center based officer list
    element: <CenterBasedOfficerList />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.5.8',
    path: PATH.CENTER_OFFICER_CONTACT_DETAILS, //center based officer list
    element: <CenterOfficerContactDetails />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.5.9',
    path: PATH.CENTER_OFFICER_SEND_SMS,
    element: <CenterOfficerSendSMS />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.5.10',
    path: PATH.HELPLINE,
    element: <HelpLine />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
];

export default centerOfficerRoutes;
