import NoMatch from '@containers/no-match';
import VoterArea from '@containers/vote-center-management/main-list/voter-areas';
import VoteCenterAddition from '@containers/vote-center-management/center-management/vote-center-addition';
import NewCenter from '@containers/vote-center-management/center-management/vote-center-addition/new-vote-center';
import CreateVoterArea from '@containers/vote-center-management/main-list/voter-areas/components/create-voter-area';
import PollingInstitute from '@containers/vote-center-management/center-management/polling-institute';
import CreatePollingInstitute from '@containers/vote-center-management/center-management/polling-institute/CreatePollingInstitute';
import PollingCenterDetailsReport from '@containers/vote-center-management/report/gazetted-polling-center-details';
import HelpLine from '@containers/user-management/helpline';

import { PATH } from '@constants/paths';
import { RouteType } from '../types';
import { USER_TYPES } from '@constants/user-types';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import CreateEditCenter from '@containers/vote-center-management/center-management/vote-center-addition/new-vote-center/create-edit';

const voteCenterRoutes = (
  permissionsArray: string[],
  userType?: string,
): RouteType[] => [
  {
    id: '1.4.1',
    index: true,
    element:
      userType === USER_TYPES.OPERATOR ? (
        <VoteCenterAddition />
      ) : permissionsArray.includes(
          VOTE_CENTER_MANAGEMENT.MAIN_LIST_DROPDOWN,
        ) ? (
        <VoterArea />
      ) : (
        <VoteCenterAddition />
      ),
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.4.2',
    path: PATH.VOTER_AREA, // ভোটার এলাকা
    children: [
      {
        id: '1.4.2.1',
        index: true,
        element: <VoterArea />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      {
        id: '1.4.2.2',
        path: PATH.CREATE_VOTER_AREA,
        element: <CreateVoterArea />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.4.2.3',
        path: PATH.EDIT_VOTER_AREA,
        element: <CreateVoterArea />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.4.3',
    path: PATH.VOTE_CENTER_ADDITION, // ভোটকেন্দ্র সংযোজন
    children: [
      // 1 - ভোটকেন্দ্রের তালিকা
      {
        id: '1.4.3.1',
        index: true,
        element: <VoteCenterAddition />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },

      // 2
      {
        id: '1.4.3.2',
        path: PATH.NEW_CENTER,

        children: [
          {
            id: '1.4.3.2.1',
            index: true,
            element: <NewCenter />, // main index
            redirection: <NoMatch />,
            permissions: {
              auth: ['token'],
            },
          },

          // create
          {
            id: '1.4.3.2.2',
            path: PATH.NEW_CENTER_CREATE,
            element: <CreateEditCenter />,
            redirection: <NoMatch />,
            permissions: {
              auth: ['token'],
            },
          },

          // edit
          {
            id: '1.4.3.2.3',
            path: PATH.NEW_CENTER_EDIT,
            element: <CreateEditCenter />, //  edit
            redirection: <NoMatch />,
            permissions: {
              auth: ['token'],
            },
          },
        ],
      },
    ],
  },
  

  {
    id: '1.4.6',
    path: PATH.POLLING_INSTITUTE, // ভোটকেন্দ্র সংযোজন
    children: [
      {
        id: '1.4.6.1',
        index: true,
        element: <PollingInstitute />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.4.6.2',
        path: PATH.CREATE_POLLING_INSTITUTE,
        element: <CreatePollingInstitute />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.4.6.3',
        path: PATH.EDIT_POLLING_INSTITUTE,
        element: <CreatePollingInstitute />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },

  // রিপোর্ট
  {
    id: '1.4.7',
    path: PATH.POLLING_CENTER_DETAILS_REPORT, // গেজেটেড ভোটকেন্দ্রের তালিকা ও সার-সংক্ষেপ
    element: <PollingCenterDetailsReport />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },

  {
    id: '1.4.8',
    path: PATH.HELPLINE,
    element: <HelpLine />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
];

export default voteCenterRoutes;
