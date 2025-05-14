import { CenterBasedResultHistoryPropsTypes } from '@type/result-management/result-monitoring/monitoring-overall-result-types';
import { PublishToUserAppUrlType } from '@type/url-type';
import { LatestResultsPathParams } from '@type/result-management/result-monitoring/latest-results-obtained/latest-results-obtained-types';

export const RESULT_MANAGEMENT = {
  // Result management
  GET_POLLING_CENTERS: ({
    scheduleId,
    electionSettingsId,
    candidateTypeId,
  }: any) =>
    `/election-schedules/${scheduleId}/election-settings/${electionSettingsId}/candidate-types/${candidateTypeId}/polling-centers`,
  GET_POLLING_CENTERS_DETAILS: ({
    electionScheduleId,
    electionSettingsId,
    userId,
  }: any) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/users/${userId}/polling-centers`,

  GET_POLLING_CENTERS_OP_ARO_OP: ({
    scheduleId,
    electionSettingsId,
    userId,
  }: {
    scheduleId: string | number;
    electionSettingsId: string | number;
    userId: string | number;
  }) =>
    `/election-schedules/${scheduleId}/election-settings/${electionSettingsId}/users/${userId}/polling-centers`,

  GET_POLLING_CENTER_RESULT_SUMMARY_FOR_OP: ({ scheduleId }: any) =>
    `/election-schedules/${scheduleId}/polling-centers/results/summary/op`,

  GET_POLLING_CENTER_RESULT_DASHBOARD_METRICS: ({
    scheduleId,
  }: {
    scheduleId?: string | number;
  }) =>
    `/election-schedules/${scheduleId}/polling-centers/results/dashboard/metrics`,

  GET_CANDIDATE_WISE_POLLING_CENTER_RESULTS: ({
    electionScheduleId,
    candidateTypeId,
  }: {
    electionScheduleId?: string | number;
    candidateTypeId?: string | number;
  }) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/polling-centers`,

  GET_POLLING_CENTER_RESULT_SUMMARY_FOR_OP_ADMIN: (
    scheduleId: number | string,
    userId: string,
  ) => `/election-schedules/${scheduleId}/users/${userId}/results/summary/op`,

  GET_RESULT_BY_CANDIDATES: ({ scheduleId, candidateTypeId, centerId }: any) =>
    `/election-schedules/${scheduleId}/candidate-types/${candidateTypeId}/polling-centers/${centerId}/candidates/results`,

  CREATE_RESULT_BY_CANDIDATE: ({
    electionScheduleId,
    candidateTypeId,
    pollingCenterId,
  }: any) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/polling-centers/${pollingCenterId}/candidates/results`,

  CREATE_BARTA_SHEET: ({
    electionScheduleId,
    electionSettingsId,
    userId,
  }: any) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}${
      userId ? `/users/${userId}` : ''
    }/barta-sheets`,

  CREATE_BARTA_SHEET_FOR_UNION: ({
    electionScheduleId,
    electionSettingsId,
    userId,
  }: any) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}${
      userId ? `/users/${userId}` : ''
    }/barta-sheets/for-union`,

  CANCEL_FINAL_BARTA_SHEET: (
    id: string | number,
    scheduleId: string | number,
  ) => `/election-schedules/${scheduleId}/barta-sheets/${id}/final/cancel`,

  // Publish to User App
  PUBLISH_TO_USER_APP: ({
    electionScheduleId,
    electionSettingsId,
  }: PublishToUserAppUrlType) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/results/publish-to-userapp`,

  // Publish to Rms Dashboard
  PUBLISH_TO_DASHBOARD: ({
    electionScheduleId,
    electionSettingsId,
  }: PublishToUserAppUrlType) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/results/publish-to-rms-dashboard`,

  BARTA_SHEET_HISTORY: (
    scheduleId: string | number,
    bartaSheetId: string | number,
  ) => `/election-schedules/${scheduleId}/barta-sheets/${bartaSheetId}/history`,

  GET_LATEST_RESULTS_OBTAINED: ({
    electionScheduleId,
  }: LatestResultsPathParams) =>
    `election-schedules/${electionScheduleId}/result/approved-by-aro`,
  GET_RESULT_OBSERVATION: ({ electionScheduleId, zillaId }: any) =>
    `/election-schedules/${electionScheduleId}/zillas/${zillaId}/result-observation`,
  GET_CENTER_BASED_RESULT_HISTORY: ({
    scheduleId,
    resultId,
  }: CenterBasedResultHistoryPropsTypes) =>
    `/election-schedules/${scheduleId}/polling-centers/results/${resultId}/history`,

  GET_DRAFT_RESULT: ({ electionScheduleId, settingsId }: any) =>
    `/election-schedules/${electionScheduleId}/election-settings/${settingsId}/results/draft`,

  // Result Status
  GET_RESULT_STATUSES: '/result-statuses',

  // Message Send List Status
  GET_MESSAGE_SEND_LIST_STATUSES: '/barta-sheets/statuses',

  // Message Send List
  GET_MESSAGE_SEND_LIST: (
    electionScheduleId: number | string,
    electionSettingsId: number | string | undefined, // TODO remove undefined
  ) =>
    `election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/barta-sheets`,

  // ফলাফল ও পরিস্থিতি পর্যালোচনা -> ফলাফল
  GET_OVERALL_SUMMARY: (
    electionScheduleId: string | number,
    electionSettingsId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/results/overall-summary`,

  // Final Barta sheet list for graphical observation page
  GET_MESSAGE_SEND_LIST_FINAL: (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/barta-sheets/final`,

  // ফলাফল ও পরিস্থিতি পর্যালোচনা -> ফলাফল -> প্রাপ্ত ফলাফল
  GET_RESULTS: (
    electionScheduleId: string | number,
    electionSettingsId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/candidates/results`,

  // Report > Time Based Result
  GET_TIME_BASED_REPORT: (
    electionScheduleId: number,
    electionSettingsId: number,
  ) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/polling-centers/results/by-submit-approval-time`,

  GET_POSTAL_BALLOT_CENTER_INFO: ({
    electionScheduleId,
    electionSettingsId,
  }: {
    electionScheduleId: number | string;
    electionSettingsId: number | string;
  }) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/postal-votes`,

  POST_POSTAL_BALLOT_CENTER_INFO: ({
    electionScheduleId,
    electionSettingsId,
  }: {
    electionScheduleId: number | string;
    electionSettingsId: number | string;
  }) =>
    `/election-schedules/${electionScheduleId}/election-settings/${electionSettingsId}/postal-votes`,

  // ফলাফল ব্যবস্থাপনা -> রিপোর্ট -> ১৮ তম ফর্ম
  GET_CONSOLIDATED_STATEMENT_PDF_DATA: (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/candidates-result`,

  // ফলাফল ব্যবস্থাপনা -> রিপোর্ট -> ১৯ তম ফর্ম
  GET_NINETEENTH_FORM: (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/result-return`,

  // ফলাফল ব্যবস্থাপনা -> রিপোর্ট -> নির্বাচিত ঘোষিত প্রার্থীগণের তালিকা
  GET_WINNING_CANDIDATES_REPORT: (electionScheduleId: string | number) =>
    `/election-schedules/${electionScheduleId}/results/winning-candidates`,

  // ফলাফল ব্যবস্থাপনা -> রিপোর্ট -> দল ভিত্তিক প্রতিবেদন
  GET_GROUP_BASED_REPORT: (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/party-wise-results`,

  // ফলাফল ব্যবস্থাপনা -> রিপোর্ট -> নির্বাচনের ফলাফল
  GET_ELECTION_RESULT_REPORT_PDF_DATA: (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/result-report`,

  // update polling center result status
  POLLING_CENTER_RESULT_STATUS_UPDATE: (
    centerId: number | string,
    resultId: number | string,
  ) => `/polling-centers/${centerId}/results/${resultId}/status`,

  // barta sheets
  GET_MESSAGE_SENDING_LIST: (
    scheduleId: number | string,
    electionSettingsId: number | string,
  ) =>
    `/election-schedules/${scheduleId}/election-settings/${electionSettingsId}/barta-sheets`,
  GET_MESSAGE_SEND: (scheduleId: number | string, id: number | string) =>
    `/election-schedules/${scheduleId}/barta-sheets/${id}`,
  UPDATE_MESSAGE_SEND: (scheduleId: number | string, id: number | string) =>
    `/election-schedules/${scheduleId}/barta-sheets/${id}`,
  UPDATE_MESSAGE_SEND_FINAL: (
    scheduleId: number | string,
    id: number | string,
  ) => `/election-schedules/${scheduleId}/barta-sheets/${id}/final`,

  // get polling center result summary for aro
  POLLING_CENTER_RESULT_SUMMARY_FOR_ARO: (
    scheduleId: string | number, // TODO
  ) => `election-schedules/${scheduleId}/polling-centers/results/summary/aro`,

  // get polling center result summary for ro
  POLLING_CENTER_RESULT_SUMMARY_FOR_RO: (
    scheduleId: string | number, //
  ) => `election-schedules/${scheduleId}/polling-centers/results/summary/ro`,

  // get polling center result summary for aro
  POLLING_CENTER_RESULT_SUMMARY_FOR_ARO_ADMIN: (
    scheduleId: string | number,
    userId: string,
  ) => `/election-schedules/${scheduleId}/users/${userId}/results/summary/aro`,

  // get polling center result summary for ro
  POLLING_CENTER_RESULT_SUMMARY_FOR_RO_ADMIN: (
    scheduleId: string | number,
    userId: string,
  ) => `/election-schedules/${scheduleId}/users/${userId}/results/summary/ro`,

  // get polling center result list
  POLLING_CENTER_RESULT_LIST: (
    scheduleId: number | string,
    electionSettings: number | string | undefined,
  ) =>
    `election-schedules/${scheduleId}/election-settings/${electionSettings}/polling-centers/results`,

  POLLING_CENTER_RESULT_LIST_RO: (
    scheduleId: number | string,
    electionSettings: number | string | undefined,
  ) =>
    `election-schedules/${scheduleId}/election-settings/${electionSettings}/polling-centers/results/ro`,
  // get polling center result list for aro
  POLLING_CENTER_RESULT_LIST_FOR_ARO: (
    scheduleId: number | string,
    electionSettings: number | string | undefined,
  ) =>
    `election-schedules/${scheduleId}/election-settings/${electionSettings}/polling-centers/results/aro`,

  // get polling center result list in result summary for aro    TODO
  POLLING_CENTER_LIST_FOR_ARO_SUMMARY: (
    scheduleId: number | string,
    candidateTypeId: number | string | undefined,
    userId?: number | string,
  ) =>
    `election-schedules/${scheduleId}/candidate-types/${candidateTypeId}${
      userId ? `/users/${userId}` : ''
    }/polling-centers`,

  // get polling center result list from admin
  POLLING_CENTER_RESULT_LIST_WITH_USER_ID_ARO: (
    scheduleId: number | string,
    userId: string,
    electionSettingsId?: number | string,
  ) =>
    `/election-schedules/${scheduleId}/election-settings/${electionSettingsId}/users/${userId}/polling-centers/results/aro`,

  // get polling center result list from admin
  POLLING_CENTER_RESULT_LIST_WITH_USER_ID_RO: (
    scheduleId: number | string,
    userId: string,
    electionSettingsId?: number | string,
  ) =>
    `/election-schedules/${scheduleId}/election-settings/${electionSettingsId}/users/${userId}/polling-centers/results/ro`,

  // get polling center result single info
  POLLING_CENTER_RESULT_SINGLE_INFO: (
    scheduleId: number | string,
    centerId: number | string,
    candidateTypeId: number | string,
  ) =>
    `/election-schedules/${scheduleId}/candidate-types/${candidateTypeId}/polling-centers/${centerId}/candidates/results`,

  // graphical observation pie chart
  GRAPHICAL_ANALYSIS: (
    scheduleId: number | string,
    candidateTypeId: number | string,
  ) =>
    `/election-schedules/${scheduleId}/candidate-types/${candidateTypeId}/results/graphical-analysis`,

  // graphical observation bar chart
  GRAPHICAL_POLLING_CENTER_SUMMARY: (
    scheduleId: number | string,
    candidateTypeId: number | string,
  ) =>
    `/election-schedules/${scheduleId}/candidate-types/${candidateTypeId}/polling-center-summary`,

  GET_ELECTION_EXPENSE_DATA: '/generate/pdf/funding-report',
};
