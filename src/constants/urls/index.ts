import {
  IBartaSheetParams,
  PollingCenterDetailsParams,
} from '@type/reports/reports-types';
import { CandidateInfoReportUrlType } from '@type/url-type';

import { AUTH } from './auth/auth';
import { CANDIDATE_INFO_MANAGEMENT } from './candidate-info-management/candidate-info-management';
import { CENTER_OFFICER_MANAGEMENT } from './center-officer-management/center-officer-management';
import { ELECTION_DECLARATION_MANAGEMENT } from './election-declaration-management/election-declaration-management';
import { RESULT_MANAGEMENT } from './result-management/result-management';
import { USER_MANAGEMENT } from './user-management/user-management';
import { VOTE_CENTER_MANAGEMENT } from './vote-center-management/vote-center-management';
import { UpazilaThanaConstituenciesParams } from '@api/miscellaneous/core-api/constituency/constituencies-by-upazila-thana';

export const URLS = {
  // Auth URLs
  ...AUTH,

  // Election Declaration Management URLs
  ...ELECTION_DECLARATION_MANAGEMENT,

  // Vote Center Management URLs
  ...VOTE_CENTER_MANAGEMENT,

  // Center Officer Management URLs
  ...CENTER_OFFICER_MANAGEMENT,

  // Candidate Info Management URLs
  ...CANDIDATE_INFO_MANAGEMENT,

  // Result Management URLs
  ...RESULT_MANAGEMENT,

  // User Management URLs
  ...USER_MANAGEMENT,

  ADD_NEW_CANDIDATE_NOMINATION: 'candidate/register',

  GET_PDF_DATA: '/generate/pdf',
  GET_CANDIDATES_COMMUNICATION_PDF_DATA: '/candidate/contact',
  GET_NOMINATION_PAPER_INFORMATION_PDF_DATA: '/nomination/paper/information',
  GET_VALID_NOMINATED_CANDIDATE_PDF_DATA: '/legally/nominated/candidate/info',
  GET_ELECTED_CANDIDATES_PDF_DATA:
    '/elected-by-without-competition/candidate/info',
  GET_CONTESTING_CANDIDATES_PDF_DATA: '/opponent/candidate/info',
  GET_CIB_REPORT_PDF_DATA: '/candidate/cib/report',
  GET_BARTA_SHEET_PDF_DATA: (bartaParams: IBartaSheetParams) =>
    `/election-schedules/${bartaParams.electionScheduleId}/candidate-types/${bartaParams.candidateTypeId}/barta-sheets`,

  GET_ELECTION_SCHEDULE_REPORT: '/election-schedule',
  GET_CWNSC_REPORT_PDF_DATA: '/constituency-wise-nomination-status-counts',
  GET_PPWNSC_REPORT_PDF_DATA: '/political-party-wise-nomination-status-counts',
  GET_CWNSC_REPORT_LIST: (id: number | string) =>
    `/election-schedule/${id}/constituency-wise-nomination-status-counts`,
  GET_PPWNSC_REPORT_LIST: (id: number | string) =>
    `/election-schedule/${id}/political-party-wise-nomination-status-counts`,
  GET_BAIL_FORFEITED_LIST: (electionScheduleId: number) =>
    `/election-schedules/${electionScheduleId}/bail-forfeited-list`,

  GET_POLLING_CENTER_DETAILS_PDF_DATA: (params: PollingCenterDetailsParams) =>
    `/election-schedules/${params.electionScheduleId}/polling-center-details`,

  GET_POLLING_CENTER_DETAILS_SUMMARY_PDF_DATA: (
    params: PollingCenterDetailsParams,
  ) =>
    `/election-schedules/${params.electionScheduleId}/polling-center-stats/summary`,

  GET_CANDIDATE_STATUS_HISTORY_LIST: (
    id: number | string,
    detailsId: number | string,
  ) =>
    `/election-settings/${id}/candidate-election-details/${detailsId}/status-log?id=${id}&detailsId=${detailsId}`,

  GET_ACKNOWLEDGEMENT_RECEIPT: '/acknowledgment/receipt',
  GET_ACCEPTANCE_REJECTION_NOMINATION_PDF: '/acceptance/rejection/nomination',
  CREATE_DOCUMENT_SERVICE: '/document',
  CREATE_PUBLIC_DOCUMENT_SERVICE: '/public-document',

  GET_STATUSES: '/statuses',
  GET_NOMINATION_STATUSES: '/nomination/statuses',
  GET_NOMINATION_STEPS: '/nomination/steps',

  GET_POLLING_CENTER_AGGREGATED: '/polling-centers-aggregated',
  GET_POLLING_CENTERS_LIST: '/polling-centers',
  GET_AVAILABLE_POLLING_CENTERS: (id: string | number) =>
    `election-schedules/${id}/available-polling-centers`,
  GET_ELECTION_TYPE: '/election-types',
  GET_ELECTION_SCHEDULES: (electionId: string | number) =>
    `/election-types/${electionId}/election-schedules`,
  GET_UPCOMING_ELECTION_SCHEDULES: '/election-schedules/upcoming',

  GET_VOTER_TYPES: '/voter-types',

  GET_CANDIDATE_TYPES_ONS: '/candidate-types',

  GET_ELECTION_CANDIDATE_TYPES: (electionId: string | number) =>
    `/election-types/${electionId}/candidate-types`,
  GET_ELECTION_SCHEDULES_ZILLAS: (electionSchedulesId: string | number) =>
    `/election-schedules/${electionSchedulesId}/zillas`,
  GET_ELECTION_SCHEDULES_CANDIDATE_TYPE_ZILLAS: (
    electionSchedulesId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/election-schedules/${electionSchedulesId}/candidate-types/${candidateTypeId}/zillas`,
  GET_ELECTION_SCHEDULES_ZILLAS_ONS: (
    electionSchedulesId: string | number,
    electionSchedulesRegionsId: string | number,
  ) =>
    `/election-schedules/${electionSchedulesId}/regions/${electionSchedulesRegionsId}/zillas`,
  GET_ELECTION_SCHEDULES_REGIONS_ONS: (electionSchedulesId: string | number) =>
    `/election-schedules/${electionSchedulesId}/regions`,

  GET_ELECTION_SCHEDULES_CONSTITUENCIES: (
    electionSchedulesId: string | number,
    electionSchedulesZillaId: string | number,
  ) =>
    `/election-schedules/${electionSchedulesId}/zillas/${electionSchedulesZillaId}/constituencies`,
  GET_ELECTION_SCHEDULES_CANDIDATE_TYPE_CONSTITUENCIES: (
    electionSchedulesId: string | number,
    electionSchedulesZillaId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/election-schedules/${electionSchedulesId}/candidate-types/${candidateTypeId}/zillas/${electionSchedulesZillaId}/constituencies`,
  GET_ELECTION_AREA_REORGANIZED: '/election-area-reorganized',

  GET_NOMINATION_LIST: (electionSettingsId: string | number) =>
    `/election-settings/${electionSettingsId}/candidate-election-full-details`,

  // candidate confirmation personal info

  GET_CANDIDATE_ELECTION_STATISTICS: ({
    electionTypeId,
    scheduleId,
  }: {
    electionTypeId: number | string;
    scheduleId: number | string;
  }) =>
    `/election-types/${electionTypeId}/election-schedules/${scheduleId}/candidate-election-stats`,

  GET_CANDIDATE_PAYMENT_TABLE: ({
    electionTypeId,
    scheduleId,
  }: {
    electionTypeId: number | string;
    scheduleId: number | string;
  }) =>
    `/election-types/${electionTypeId}/election-schedules/${scheduleId}/candidate-payment-stats`,

  GET_POLITICAL_PARTIES: '/political-parties',
  GET_BANKS: '/banks',
  GET_ELECTION_SCHEDULES_WITH_DATE: (electionId: string | number) =>
    `/election-types/${electionId}/election-schedules-with-date`,

  REPORT_USER_DETAILS: ({ userId }: CandidateInfoReportUrlType) =>
    `user-profile-details/${userId}`,

  SETTINGS_SPECIFIC_LOCATION_UPAZILLAS: '/upazilas',
  SETTINGS_SPECIFIC_LOCATION_UPAZILLAS_UNION_WARDS: (
    upazilaId: string | number,
  ) => `/upazilas/${upazilaId}/unions-or-wards`,
  SETTINGS_SPECIFIC_LOCATION_UPAZILLAS_MUNICIPALITIES: (
    upazilaId: string | number,
  ) => `/upazilas/${upazilaId}/municipalities`,
  SETTINGS_SPECIFIC_LOCATION_MUNICIPALITIES_UNION_WARDS: (
    upazilaId: string | number,
    municipalityId: string | number,
  ) =>
    `/upazilas/${upazilaId}/municipalities/${municipalityId}/unions-or-wards`,

  GET_UNION_WARDS_BY_CONSTITUENCY_UPAZILLA: (
    constituenciesId: number | string,
  ) => `/constituencies/constituencies/${constituenciesId}/unions-or-wards`,

  GET_MUNICIPALITIES_BY_SCHEDULE_CANDIDATE_ZILLA: ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
  }: {
    electionScheduleId: string | number;
    candidateTypeId: string | number;
    zillaId: string | number;
  }) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/zillas/${zillaId}/municipalities`,

  GET_UPAZILAS_OR_THANAS: ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
  }: {
    electionScheduleId: string | number;
    candidateTypeId: string | number;
    zillaId: string | number;
    municipalityId: string | number;
  }) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/zillas/${zillaId}/municipalities/${municipalityId}/upazilas-or-thanas`,

  GET_UPAZILA_OR_THANA_CONSTITUENCIES: ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
    upazilaThanaId,
  }: UpazilaThanaConstituenciesParams) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/zillas/${zillaId}/municipalities/${municipalityId}/upazilas-or-thanas/${upazilaThanaId}/constituencies`,

  GET_UNION_BY_UPAZILA: (id: string | number) =>
    `/upazilas/${id}/union-or-wards`,

  GET_RESERVED_WARDS_WITH_SETTINGS: (
    electionScheduleId: string | number,
    electionSchedulesZillaId: string | number,
    municipalityId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/zillas/${electionSchedulesZillaId}/municipalities/${municipalityId}/reserved-wards/with-settings`,

  GET_UNION_OR_WARDS_BY_MUNICIPALITIES_ZILLAS: (
    electionScheduleId: string | number,
    zillaId: string | number,
    municipalityId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/zillas/${zillaId}/municipalities/${municipalityId}/unions-or-wards`,
  GET_UNION_OR_WARDS_BY_ELECTION_TYPE_SCHEDULE_ZILLA_UPAZILA: (
    electionTypeId: string | number,
    electionScheduleId: string | number,
    zillaId: string | number,
    upazilaId: string | number,
  ) =>
    `/election-type/${electionTypeId}/election-schedules/${electionScheduleId}/zillas/${zillaId}/upazilas/${upazilaId}/union-or-wards`,

  GET_MUNICIPALITIES_BY_SCHEDULES_ZILLAS: (
    electionScheduleId: string | number,
    zillaId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/zillas/${zillaId}/municipalities`,

  GET_UPAZILAS_BY_ZILLAS: (
    electionTypeId: string | number,
    electionScheduleId: string | number,
    zillaId: string | number,
  ) =>
    `/election-type/${electionTypeId}/election-schedules/${electionScheduleId}/zillas/${zillaId}/upazilas`,
  GET_UNION_OR_WARDS_BY_ELECTION_SCHEDULE_CANDIDATE_TYPES_ZILLA_UPAZILLAS: (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
    zillaId: string | number,
    upazilaId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/zillas/${zillaId}/upazilas/${upazilaId}/union-or-wards`,
  GET_UPAZILAS_BY_ELECTION_SCHEDULE_CANDIDATE_TYPES_ZILLAS: (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
    zillaId: string | number,
  ) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/zillas/${zillaId}/upazilas`,
  SCHEDULE_WISE_DATA_PUBLISH: (scheduleId: string | number) =>
    `/election-schedules/${scheduleId}`,

  SCHEDULE_WISE_DATA_PUBLISH_GET: (scheduleId: string | number) =>
    `/election-schedules/${scheduleId}`,

  SETTING_WISE_DATA_PUBLISH: (settingId: string | number) =>
    `/election-settings/${settingId}`,

  DATA_PROVIDER_HISTRY: (scheduleId: string | number) =>
    `/election-schedules/${scheduleId}/provider-history`,

  POLLING_INSTITUTE_DATA_PUBLISH: `/polling-center-institutes`,
};
