export const RESULT_MANAGEMENT_PATH = {
  RESULTS: 'results',
  RESULT_PUBLISH: 'result-publish/:electionUserCandidateTypeId/:id',
  RESULT_SUMMARY_PUBLISH:
    'result-summary-publish/:id/:scheduleId/:candidateTypeId',

  CENTER_LIST: 'center-list',

  // Message Sending List Prepare
  MESSAGE_SENDING_LIST_PREPARE: 'message-sending-list-prepare',

  // Message Sheet List
  MESSAGE_SEND_LIST: 'message-send-list',
  MESSAGE_SEND_LIST_HISTORY:
    'message-send-list-history/:scheduleId/:bartaSheetId/:electionTypeId/:candidateTypeId',

  // Message Send Publish
  MESSAGE_SEND_LIST_PUBLISH: 'message-send-list-publish',
  MESSAGE_SEND_PUBLISH: ':id/:scheduleId',

  RESULT_AND_SITUATION_ANALYSIS: 'result-and-situation-analysis',
  VOTE_CENTER_HALT: 'vote-center-halt',

  RESULTS_MONITORING: 'results-monitoring',
  MONITORING_OVERALL_RESULTS: 'monitoring-overall-results',
  CENTER_BASED_MONITORING_RESULTS: 'center-based-monitoring-results',
  CENTER_BASED_RESULT_PUBLISH: 'center-based-result-publish/:id',
  CENTER_BASED_RESULT_PUBLISH_ADMIN:
    'center-based-result-publish/:id/:scheduleId/:candidateTypeId',
  CENTER_BASED_RESULT_HISTORY: `/result-management/center-based-monitoring-results/center-based-result-publish/:scheduleId/:resultId`,

  LATEST_RESULTS_OBTAINED: 'latest-results-obtained',
  GRAPHICAL_OBSERVATION: 'graphical-observation',
  DRAFT_RESULTS: 'draft-results',
  RESULTS_RETURN_LOG: 'results-return-log',
  RESULTS_PUBLISHED_ON_WEBSITE: 'results-published-on-website',

  CONSOLIDATED_STATEMENET: 'consolidated-statement',
  TIME_BASED_RESULT: 'time-based-result',
  GROUP_BASED_REPORT: 'group-based-report',
  ELECTION_RESULT: 'election-result',
  NINETEENTH_FORM: 'nineteenth-form',
  WINNING_CANDIDATES: 'winning-candidates',

  SUBMIT_RESULTS_FROM_DASHBOARD:
    '/result-management/submit-results/:candidateTypeId/:pollingCenterId/:electionSettingsId',
  SUBMIT_RESULTS: 'result-management/submit-results',
  SUBMIT_RESULTS_DASHBOARD: 'submit-results-dashboard',
  POSTAL_BALLOT: 'postal-ballot',
  SUBMIT_RESULTS_SUMMARY: 'submit-results-summary',
  RESULTS_SUMMARY: 'results-summary',
  HELPLINE: 'helpline',
};
