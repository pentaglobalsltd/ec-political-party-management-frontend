import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const RESULT_MANAGEMENT_ROUTES = {
  CONSOLIDATED_STATEMENET: 'consolidated-statement',
  TIME_BASED_RESULT: 'time-based-result',
  GROUP_BASED_REPORT: 'group-based-report',
  NINETEENTH_FORM: 'nineteenth-form',
  WINNING_CANDIDATES: 'winning-candidates',
  ELECTION_RESULT: 'election-result',

  RESULTS: 'results',
  RESULTS_PUBLISHED: (
    electionUserCandidateTypeId: number | string,
    id: string | number,
  ) =>
    `/result-management/results/result-publish/${electionUserCandidateTypeId}/${id}`,
  RESULTS_SUMMARY_PUBLISHED: (
    id: string | number,
    scheduleId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/result-management/results-summary/result-summary-publish/${id}/${scheduleId}/${candidateTypeId}`,

  CENTER_LIST: 'center-list',

  // Message Sending List Prepare
  MESSAGE_SENDING_LIST_PREPARE: 'message-sending-list-prepare',

  // Message Send List
  MESSAGE_SEND_LIST: 'message-send-list',
  MESSAGE_SEND_LIST_HISTORY: ({
    scheduleId,
    bartaSheetId,
    electionTypeId,
    candidateTypeId,
  }: {
    scheduleId: string | number;
    bartaSheetId: string | number;
    electionTypeId?: string | number;
    candidateTypeId?: string | number;
  }) =>
    `message-send-list-history/${scheduleId}/${bartaSheetId}/${electionTypeId}/${candidateTypeId}`,

  // Message Send Publish
  MESSAGE_SEND_LIST_PUBLISH: 'message-send-list-publish',
  MESSAGE_SEND_PUBLISH: (id: string | number, scheduleId: string | number) =>
    `${id}/${scheduleId}`,

  RESULT_AND_SITUATION_ANALYSIS: 'result-and-situation-analysis',
  VOTE_CENTER_HALT: 'vote-center-halt',

  RESULTS_MONITORING: 'results-monitoring',
  MONITORING_OVERALL_RESULTS: 'monitoring-overall-results',
  CENTER_BASED_MONITORING_RESULTS: 'center-based-monitoring-results',
  CENTER_BASED_RESULT_PUBLISH: (id: string | number) =>
    `/result-management/center-based-monitoring-results/center-based-result-publish/${id}`,

  CENTER_BASED_RESULT_PUBLISH_ADMIN: (
    id: string | number,
    scheduleId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/result-management/center-based-monitoring-results/center-based-result-publish/${id}/${scheduleId}/${candidateTypeId}`,
  CENTER_BASED_RESULT_HISTORY: ({ scheduleId, resultId }: UrlIdTypes) =>
    `/result-management/center-based-monitoring-results/center-based-result-publish/${scheduleId}/${resultId}`,

  LATEST_RESULTS_OBTAINED: 'latest-results-obtained',
  GRAPHICAL_OBSERVATION: 'graphical-observation',
  DRAFT_RESULTS: 'draft-results',
  RESULTS_RETURN_LOG: 'results-return-log',
  RESULTS_PUBLISHED_ON_WEBSITE: 'results-published-on-website',

  SUBMIT_RESULTS_FROM_DASHBOARD: (
    candidateTypeId?: string | number,
    pollingCenterId?: string | number,
    electionSettingsId?: string | number,
  ) =>
    `/result-management/submit-results/${candidateTypeId}/${pollingCenterId}/${electionSettingsId}`,
  SUBMIT_RESULTS: 'result-management/submit-results',
  SUBMIT_RESULTS_DASHBOARD: 'submit-results-dashboard',
  POSTAL_BALLOT: 'postal-ballot',
  SUBMIT_RESULTS_SUMMARY: 'submit-results-summary',
  RESULTS_SUMMARY: 'results-summary',
  HELPLINE: 'helpline',
};
