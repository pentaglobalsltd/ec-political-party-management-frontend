import { VoterAreaCodeValidateProps } from '@type/search-types';

export const VOTE_CENTER_MANAGEMENT = {
  // vote-center-management
  CREATE_VOTER_AREA: '/voter-areas',
  GET_VOTER_AREAS: '/voter-areas',
  UPDATE_VOTER_AREA: (id: number | string) => `/voter-areas/${id}`,
  UPDATE_VOTER_AREA_BULK_EDIT: `/voter-areas/bulk`,
  GET_VOTER_AREA_BY_ID: (id: number | string) => `/voter-areas/${id}`,
  DELETE_VOTER_AREA: (id: number | string) => `/voter-areas/${id}`,
  GET_VOTER_AREA_ONS: '/voter-areas',
  GET_VOTER_AREA_CODE_FROM_ZILLA: ({
    zillaId,
    areaCode,
  }: VoterAreaCodeValidateProps) =>
    `/zillas/${zillaId}/voter-areas/${areaCode}`,

  // Create Polling Institute (Vote Center Management -> Center Management -> Polling Institute)
  CREATE_POLLING_INSTITUTE: '/polling-institutes',
  GET_POLLING_INSTITUTE_BY_ID: (id: number | string) =>
    `/polling-institutes/${id}`,
  UPDATE_POLLING_INSTITUTE: (id: number | string) =>
    `/polling-institutes/${id}`,

  POLLING_CENTERS_AGGREGATED: `/polling-centers-aggregated`,
  POLLING_INSTITUTES: `/polling-institutes`,

  GET_POTENTIAL_POLLING_CENTER: ({
    electionSettingsId,
    unionOrWardId,
  }: {
    electionSettingsId: number | string;
    unionOrWardId: number | string;
  }) =>
    `/election-settings/${electionSettingsId}/union-or-wards/${unionOrWardId}/polling-center`,

  GET_POTENTIAL_POLLING_INSTITUTE: ({
    electionSettingsId,
    pollingInstituteId,
  }: {
    electionSettingsId: number | string;
    pollingInstituteId: number | string;
  }) =>
    `/election-settings/${electionSettingsId}/polling-institute/${pollingInstituteId}`,

  GET_POTENTIAL_VOTER_AREA: ({
    electionSettingsId,
  }: {
    electionSettingsId: number | string;
  }) => `/election-settings/${electionSettingsId}/voter-areas`,

  GET_POLLING_CENTER_BY_ID: ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
  }: {
    electionSettingsId: number | string;
    unionOrWardId: number | string;
    pollingCenterId: string | number;
  }) =>
    `/election-settings/${electionSettingsId}/union-or-wards/${unionOrWardId}/polling-center/${pollingCenterId}`,

  GET_POTENTIAL_POLLING_CENTER_BY_ID: ({
    electionSettingsId,
    pollingCenterId,
  }: {
    electionSettingsId: number | string;
    pollingCenterId: string | number;
  }) =>
    `/election-settings/${electionSettingsId}/polling-center/${pollingCenterId}`,

  GET_POTENTIAL_POLLING_CENTER_VOTER_AREA: ({
    electionSettingsId,
    pollingCenterId,
  }: {
    electionSettingsId: number | string;
    pollingCenterId: string | number;
  }) =>
    `/election-settings/${electionSettingsId}/polling-center/${pollingCenterId}/voter-areas`,

  UPDATE_POLLING_CENTER_BY_ID: ({ id }: { id: string | number }) =>
    `/polling-centers/${id}`,

  CREATE_POTENTIAL_POLLING_CENTER: ({
    electionSettingsId,
    unionOrWardId,
  }: {
    electionSettingsId: number | string;
    unionOrWardId: number | string;
  }) =>
    `/election-settings/${electionSettingsId}/union-or-wards/${unionOrWardId}/polling-center`,

  DELETE_POLLING_CENTER: ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
  }: {
    electionSettingsId: number | string;
    unionOrWardId: number | string;
    pollingCenterId: number | string;
  }) =>
    `/election-settings/${electionSettingsId}/union-or-wards/${unionOrWardId}/polling-center/${pollingCenterId}`,

  // Polling Center List (ARO View)
  GET_POLLING_CENTER_LIST_FOR_ARO: '/polling-centers',
};
