export const VOTE_CENTER_MANAGEMENT_ROUTES = {
  VOTE_CENTER_MANAGEMENT: '/vote-center-management',
  ADD_VOTE_CENTER: 'add-vote-center',
  UPDATE_VOTE_CENTER: 'update-vote-center',

  // Union Ward
  UNION_WARD: 'union-ward',
  ADD_UNION_WARD: 'add',
  EDIT_UNION_WARD: (id: string | number) => `${id}`,

  // Voter Area
  VOTER_AREA: 'voter-area',
  CREATE_VOTER_AREA: '/vote-center-management/voter-area/create',
  EDIT_VOTER_AREA: (id: string | number) =>
    `/vote-center-management/voter-area/${id}`,

  // Vote Center Addition
  VOTE_CENTER_ADDITION: 'vote-center-addition',
  VOTE_CENTER_ADDITION_EDIT: '/vote-center-management/vote-center-addition/',
  NEW_CENTER: '/vote-center-management/vote-center-addition/new-center',

  NEW_CENTER_CREATE: ({
    electionSettingsId,
    unionOrWardId,
    pollingInstituteId,
  }: {
    electionSettingsId: string | number;
    unionOrWardId: string | number;
    pollingInstituteId: string | number;
  }) => `create/${electionSettingsId}/${unionOrWardId}/${pollingInstituteId}`,

  NEW_CENTER_EDIT: ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
  }: {
    electionSettingsId: string | number;
    unionOrWardId: string | number;
    pollingCenterId: string | number;
  }) => `edit/${electionSettingsId}/${unionOrWardId}/${pollingCenterId}`,

  NEW_CENTER_EDIT_FROM_VOTER_TALIKA: ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
  }: {
    electionSettingsId: string | number;
    unionOrWardId: string | number;
    pollingCenterId: string | number;
  }) =>
    `new-center/edit/${electionSettingsId}/${unionOrWardId}/${pollingCenterId}`,

  // Polling Institute
  POLLING_INSTITUTE: 'polling-institute',
  CREATE_POLLING_INSTITUTE: 'create',
  EDIT_POLLING_INSTITUTE: (id: string | number) => `${id}`,

  // Polling Center Details Report
  POLLING_CENTER_DETAILS_REPORT: 'polling-center-details-report',
};
