import { MunicipalityConstituenciesParams } from '@api/miscellaneous/core-api/constituency/constituencies-by-schedule-candidate-zilla-municipality';
import { UpazilaThanaConstituenciesParams } from '@api/miscellaneous/core-api/constituency/constituencies-by-upazila-thana';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const ELECTION_DECLARATION_MANAGEMENT = {
  //Election Declaration Management
  GET_ELECTION_SCHEDULE: '/election-schedules',
  CREATE_ELECTION_SCHEDULE: '/election-schedules',
  UPDATE_ELECTION_SCHEDULE: (id: string | number) =>
    `/election-schedules/${id}`,

  GET_ELECTION_SETTINGS_AGGREGATED: '/election-settings-aggregated',
  CREATE_ELECTION_SETTINGS: '/election-settings',
  DELETE_ELECTION_SETTINGS: (id: string | number) => `/election-settings/${id}`,

  ELECTION_SETTINGS: `/election-settings`,

  DELETE_ELECTION_SCHEDULE: (id: string | number) =>
    `/election-schedules/${id}`,

  GET_ELECTION_SCHEDULE_BY_ID: (id?: string | number) =>
    `/election-schedules/${id}`,

  GET_ELECTION_SETTINGS_BY_ID: (electionSettingsId: string | number) =>
    `/election-settings-aggregated/${electionSettingsId}`,

  UPDATE_ELECTION_SETTINGS_BY_ID: ({ electionSettingsId }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}`,

  CREATE_ELECTION_SETTINGS_DETAILS: '/election-settings-details',
  GET_ELECTION_SETTINGS_DETAILS_BY_ID: (
    electionSettingsDetailsId: string | number,
  ) => `/election-settings-details/${electionSettingsDetailsId}`,

  GET_ELECTION_SETTINGS_DETAILS: '/election-settings-details',

  UPDATE_ELECTION_SETTINGS_DETAILS_BY_ID: (
    electionSettingsDetailsId: string | number,
  ) => `/election-settings-details/${electionSettingsDetailsId}`,

  ELECTION_MIGRATE: (electionScheduleId?: string | number) =>
    `/election-settings/election-schedule/${electionScheduleId}/migrate`,

  GET_BUILDING_TYPE: `/building-types`,
  GET_SINGLE_BUILDING_TYPE: (id: string | number) => `/building-types/${id}`,
  CREATE_BUILDING_TYPE: `/building-types`,
  UPDATE_BUILDING_TYPE: (id: string | number) => `/building-types/${id}`,

  // Master Region
  CREATE_REGION: '/regions',
  GET_REGIONS: '/regions',
  GET_REGION: (id: string | number) => `/regions/${id}`,
  UPDATE_REGION: (id: number | string) => `/regions/${id}`,

  // Master District
  CREATE_ZILLA: '/zillas',
  GET_ZILLAS: '/zillas',
  GET_ZILLA: (id: string | number) => `/zillas/${id}`,
  UPDATE_ZILLA: (id: number | string) => `/zillas/${id}`,

  // Master Subdistrict
  GET_UPAZILLAS_FROM_ZILLA: (id: string | number) => `/zillas/${id}/upazilas`,
  CREATE_UPAZILLA: '/upazilas',
  GET_SUB_DISTRICT: (id: string | number) => `/upazilas/${id}`,
  UPDATE_UPAZILLA: (id: string | number) => `/upazilas/${id}`,
  GET_SUB_DISTRICT_LIST: '/upazilas',
  GET_MUNICIPALITIES_FROM_ZILLA: (id: string | number) =>
    `/zillas/${id}/municipalities`,

  // Master Municipality
  CREATE_MUNICIPALITY: '/municipalities',
  GET_MUNICIPALITY: (id: string | number) => `/municipalities/${id}`,
  UPDATE_MUNICIPALITY: (id: string | number) => `/municipalities/${id}`,
  GET_MUNICIPALITIES: '/municipalities',
  GET_UPAZILLA_MUNICIPALITIES: (id: string | number) =>
    `/upazilas/${id}/municipalities`,

  // Master Reserved Union Ward
  GET_RESERVED_UNION_WARD: (municipality: number | string) =>
    `/municipalities/${municipality}/union-or-wards/for-reserved`,

  CREATE_UNIONS_OR_WARDS: '/unions-or-wards',
  UPDATE_UNIONS_OR_WARDS: (id: string | number) => `/unions-or-wards/${id}`,
  GET_UNIONS_OR_WARDS_BY_ID: (id: string | number) => `/unions-or-wards/${id}`,

  GET_REGION_CONSTITUENCIES: (
    electionTypeId: string | number,
    candidateTypeId: string | number,
  ) =>
    `/election-types/${electionTypeId}/candidate-types/${candidateTypeId}/election-wise-locations`,
  GET_DISTRICT_CONSTITUENCIES: (id: string | number) =>
    `/zillas/${id}/constituencies`,
  GET_CONSTITUENCIES_UPAZILA: '/constituencies/upazilas',
  GET_UNIONS_OR_WARDS: '/unions-or-wards',

  GET_UNIONS_WARDS: '/unions/wards',
  UPDATE_UNIONS_WARDS: (id: string | number) => `/unions/wards/${id}`,

  // Master RMO
  GET_RMOS: '/rmos',

  // Master Message List
  GET_MESSAGES: '/messages',
  CREATE_MESSAGES: '/messages/bulk-create',

  // Master Constituency Location
  GET_CONSTITUENCY_LOCATION_LIST: 'constituency-locations',
  CREATE_CONSTITUENCY_LOCATION_LIST: 'constituency-locations',
  GET_CONSTITUENCY_LOCATION: (id: number) => `constituency-locations/${id}`,
  UPDATE_CONSTITUENCY_LOCATION: (id: number) => `constituency-locations/${id}`,

  // Master Election Types
  GET_MASTER_ELECTION_TYPE_LIST: 'election-types',
  GET_MASTER_ELECTION_TYPE: (id: number) => `election-types/${id}`,
  UPDATE_MASTER_ELECTION_TYPE: (id: number) => `election-types/${id}`,

  // Master Candidate Types
  GET_MASTER_CANDIDATE_TYPE_LIST: 'candidate-types',
  GET_MASTER_CANDIDATE_TYPE: (id?: number | string) => `candidate-types/${id}`,
  UPDATE_MASTER_CANDIDATE_TYPE: (id: number) => `candidate-types/${id}`,

  // Master Institute Types
  GET_MASTER_INSTITUTE_TYPE_LIST: 'institute-types',
  GET_MASTER_INSTITUTE_TYPE: (id: number) => `institute-types/${id}`,
  UPDATE_MASTER_INSTITUTE_TYPE: (id: number) => `institute-types/${id}`,
  CREATE_MASTER_INSTITUTE_TYPE: 'institute-types',

  GET_CONSTITUENCIES: '/constituencies',

  GET_MUNICIPALITY_CONSTITUENCIES: ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
  }: MunicipalityConstituenciesParams) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/zillas/${zillaId}/municipalities/${municipalityId}/constituencies`,
  GET_CONSTITUENCIES_BY_ELECTION_SCHEDULE_CANDIDATE_TYPES_ZILLA_UPAZILLA_UNION_OR_WARDS:
    (
      electionScheduleId: string | number,
      candidateTypeId: string | number,
      zillaId: string | number,
      upazilaId: string | number,
      unionOrWardsId: string | number,
    ) =>
      `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/zillas/${zillaId}/upazilas/${upazilaId}/union-or-wards/${unionOrWardsId}/constituencies`,

  GET_UPAZILA_OR_THANA_CONSTITUENCIES: ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
    upazilaThanaId,
  }: UpazilaThanaConstituenciesParams) =>
    `/election-schedules/${electionScheduleId}/candidate-types/${candidateTypeId}/zillas/${zillaId}/municipalities/${municipalityId}/upazilas-or-thanas/${upazilaThanaId}/constituencies`,

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

  // Reserved Wards
  GET_RESERVED_WARD_LIST: '/reserved-wards',
  GET_RESERVED_WARD: (id: number | string) => `/reserved-wards/${id}`,
  CREATE_RESERVED_WARD: '/reserved-wards',
  UPDATE_RESERVED_WARD: (id: number | string) => `/reserved-wards/${id}`,

  // nomination letter
  GET_NOMINATION_LETTER_LIST: '/nomination-forms',
  // possible election
  GET_ELECTION_CALENDER_LIST: '/election-calendar-list',
  GET_ELECTION_CALENDER_EVENTS: '/election-calendar-events',

  // প্রধান তালিকা -> ইউনিয়ন পরিষদ সংরক্ষিত আসন
  GET_UNION_RESERVED_WARD: '/unions/reserved-wards',
  CREATE_UNION_RESERVED_WARD: '/unions/reserved-wards',
  UPDATE_UNION_RESERVED_WARD: (id: number | string) =>
    `/unions/reserved-wards/${id}`,
  DELETE_UNION_RESERVED_WARD: (id: number | string) =>
    `/unions/reserved-wards/${id}`,
};
