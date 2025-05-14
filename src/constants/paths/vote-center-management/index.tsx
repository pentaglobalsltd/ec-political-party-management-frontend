export const VOTE_CENTER_MANAGEMENT_PATH = {
  VOTE_CENTER_MANAGEMENT: '/vote-center-management',
  ADD_VOTE_CENTER: 'add-vote-center',
  UPDATE_VOTE_CENTER: 'update-vote-center',

  // Union Ward
  UNION_WARD: 'union-ward',
  ADD_UNION_WARD: 'add',
  EDIT_UNION_WARD: ':id',

  // Voter Area
  VOTER_AREA: 'voter-area',
  CREATE_VOTER_AREA: 'create',
  EDIT_VOTER_AREA: ':id',

  // Vote Center Addition
  VOTE_CENTER_ADDITION: 'vote-center-addition',
  NEW_CENTER: 'new-center',
  NEW_CENTER_CREATE:
    'create/:electionSettingsId/:unionOrWardId/:pollingInstituteId',

  NEW_CENTER_EDIT: 'edit/:electionSettingsId/:unionOrWardId/:pollingCenterId',

  // Polling Institute
  POLLING_INSTITUTE: 'polling-institute',
  CREATE_POLLING_INSTITUTE: 'create',
  EDIT_POLLING_INSTITUTE: ':id',

  // Polling Center Details Report
  POLLING_CENTER_DETAILS_REPORT: 'polling-center-details-report',
};
