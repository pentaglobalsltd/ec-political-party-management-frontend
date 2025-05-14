import { RouteType } from '../types';
import { PATH } from '@constants/paths';
import { USER_TYPES } from '@constants/user-types';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import NoMatch from '@containers/no-match';

import Results from '@containers/result-management/electoral-process/results';
import MessageSendList from '@containers/result-management/electoral-process/message-send-list';
import ResultAndSituationReview from '@containers/result-management/electoral-process/results-and-situation-review';
import MessageSendListPrepare from '@containers/result-management/electoral-process/message-send-list-prepare';
import CenterList from '@containers/result-management/electoral-process/center-list';
import VoteCenterHalt from '@containers/result-management/electoral-process/vote-center-halt';

import MonitoringOverallResults from '@containers/result-management/results-monitoring/monitoring-overall-results';
import CenterBasedMonitoringResults from '@containers/result-management/results-monitoring/center-based-monitoring-results';
import LatestResults from '@containers/result-management/results-monitoring/latest-results';
import GraphicalObservation from '@containers/result-management/results-monitoring/graphical-observation';
import ConsolidatedStatement from '@containers/result-management/report/consolidated-statement';
import DraftResults from '@containers/result-management/results-monitoring/draft-results';
import ResultsReturnLog from '@containers/result-management/results-monitoring/results-return-log';
import ResultsPublishedOnWebsite from '@containers/result-management/results-monitoring/results-published-on-website';
import TimeBasedResult from '@containers/result-management/report/time-based-result';
import GroupBasedReport from '@containers/result-management/report/group-based-report';
import SubmitResults from '@containers/result-management/controller-list/submit-results';
import ElectionResult from '@containers/result-management/report/election-result';
import MessageSendListPublish from '@containers/result-management/electoral-process/message-send-list-publish';
import ResultPublish from '@containers/result-management/electoral-process/results/components/result-publish';
import HelpLine from '@containers/user-management/helpline';
import MessageSendListPublishAndView from '@containers/result-management/electoral-process/message-send-list-publish/component/publish-page';
import { ResultSummary } from '@containers/result-management/electoral-process/results-summary';
import { CenterBasedResultHistory } from '@containers/result-management/results-monitoring/center-based-monitoring-results/components/center-based-result-history';
import { MessageSendListHistory } from '@containers/result-management/electoral-process/message-send-list/components/message-send-list-history';
import PostalBallot from '@containers/result-management/electoral-process/postal-ballot';
import NineteenthFormReport from '@containers/result-management/report/nineteenth-form-report';
import WinningCandidatesReport from '@containers/result-management/report/winning-candidates';
import SubmitResultsSummary from '@containers/result-management/electoral-process/submit-results-summary';
import { SubmitResultDashboard } from '@containers/result-management/controller-list/submit-results-dashboard';
import { ResultDashboard } from '@containers/result-management/electoral-process/results-dashboard';

const resultManagementRoutes = (
  permissionsArray: string[],
  userType: string | undefined,
): RouteType[] => [
  {
    id: '1.7.1',
    index: true,
    element:
      userType === USER_TYPES.ADMIN &&
      permissionsArray.includes(
        RESULT_MANAGEMENT.RESULT_MONITORING_GRAPHICAL_OBSERVATION_DASHBOARD,
      ) ? (
        <GraphicalObservation /> // Admin (all admins with permission will view this after entering RMS)
      ) : permissionsArray.includes(
          RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_SUBMIT_MENU,
        ) ? (
        <SubmitResultDashboard /> // OP (all op with permission will view this after entering RMS)
      ) : permissionsArray.includes(
          RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_MENU,
        ) ? (
        <ResultDashboard /> // ARO (all aro with permission will view this after entering RMS)
      ) : permissionsArray.includes(
          RESULT_MANAGEMENT.ELECTION_PROCESS_BARTA_SHEET_LIST,
        ) ? (
        <MessageSendList /> // RO (all ro with permission will view this after entering RMS)
      ) : (
        <MessageSendList />
      ),
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.2',
    path: PATH.RESULTS,
    children: [
      {
        id: '1.7.2.1',
        index: true,
        element: <Results />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.7.2.2', // ফলাফল প্রকাশ
        path: PATH.RESULT_PUBLISH,
        element: <ResultPublish />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.7.3',
    path: PATH.MESSAGE_SENDING_LIST_PREPARE,
    element: <MessageSendListPrepare />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  // Message send list
  {
    id: '1.7.4',
    path: PATH.MESSAGE_SEND_LIST,
    children: [
      {
        id: '1.7.4.1',
        index: true,
        element: <MessageSendList />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.7.4.2',
        path: PATH.MESSAGE_SEND_LIST_HISTORY,
        element: <MessageSendListHistory />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  // Message send list publish
  {
    id: '1.7.5',
    path: PATH.MESSAGE_SEND_LIST_PUBLISH,
    children: [
      {
        id: '1.7.5.1',
        index: true,
        element: <MessageSendListPublish />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.7.5.2',
        path: PATH.MESSAGE_SEND_PUBLISH,
        element: <MessageSendListPublishAndView />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.7.6',
    path: PATH.RESULT_AND_SITUATION_ANALYSIS,
    element: <ResultAndSituationReview />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.7',
    path: PATH.VOTE_CENTER_HALT,
    element: <VoteCenterHalt />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.8',
    path: PATH.CENTER_LIST,
    element: <CenterList />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.9',
    path: PATH.CONSOLIDATED_STATEMENET,
    element: <ConsolidatedStatement />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.10',
    path: PATH.ELECTION_RESULT,
    element: <ElectionResult />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.11',
    path: PATH.TIME_BASED_RESULT,
    element: <TimeBasedResult />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.12',
    path: PATH.GROUP_BASED_REPORT,
    element: <GroupBasedReport />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.13',
    path: PATH.MONITORING_OVERALL_RESULTS,
    element: <MonitoringOverallResults />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.14',
    path: PATH.CENTER_BASED_MONITORING_RESULTS,
    children: [
      {
        id: '1.7.14.1',
        index: true,
        element: <CenterBasedMonitoringResults />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.7.14.2',
        path: PATH.CENTER_BASED_RESULT_PUBLISH,
        element: <ResultPublish />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.7.14.4',
        path: PATH.CENTER_BASED_RESULT_PUBLISH_ADMIN,
        element: <ResultPublish />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.7.14.3',
        path: PATH.CENTER_BASED_RESULT_HISTORY,
        element: <CenterBasedResultHistory />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.7.15',
    path: PATH.LATEST_RESULTS_OBTAINED,
    element: <LatestResults />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.16',
    path: PATH.GRAPHICAL_OBSERVATION,
    element: <GraphicalObservation />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.17',
    path: PATH.DRAFT_RESULTS,
    element: <DraftResults />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.18',
    path: PATH.RESULTS_RETURN_LOG,
    element: <ResultsReturnLog />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.19',
    path: PATH.RESULTS_PUBLISHED_ON_WEBSITE,
    element: <ResultsPublishedOnWebsite />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.20',
    path: PATH.POSTAL_BALLOT,
    element: <PostalBallot />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.21',
    path: PATH.HELPLINE, // হেল্পলাইন
    element: <HelpLine />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.22',
    path: PATH.SUBMIT_RESULTS_SUMMARY, // ফলাফল দাখিল সারাংশ

    element: <SubmitResultsSummary />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.23',
    path: PATH.RESULTS_SUMMARY,
    children: [
      {
        id: '1.7.23.1',
        index: true,
        element: <ResultSummary />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
      {
        id: '1.7.23.2',
        path: PATH.RESULT_SUMMARY_PUBLISH,
        element: <ResultPublish />,
        redirection: <NoMatch />,
        permissions: {
          auth: ['token'],
        },
      },
    ],
  },
  {
    id: '1.7.24',
    path: PATH.NINETEENTH_FORM,
    element: <NineteenthFormReport />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.25',
    path: PATH.WINNING_CANDIDATES,
    element: <WinningCandidatesReport />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.26',
    path: PATH.SUBMIT_RESULTS,
    element: <SubmitResults />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
  {
    id: '1.7.27',
    path: PATH.SUBMIT_RESULTS_FROM_DASHBOARD,
    element: <SubmitResults />,
    redirection: <NoMatch />,
    permissions: {
      auth: ['token'],
    },
  },
];

export default resultManagementRoutes;
