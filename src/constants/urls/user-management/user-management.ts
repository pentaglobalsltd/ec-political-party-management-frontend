export const USER_MANAGEMENT = {
  //User management service
  //user types
  GET_USER_TYPES: '/user-types',
  GET_ELECTION_SCHEDULE_USER_TYPES: (electionSchedulesId: string | number) =>
    `/election-schedule/${electionSchedulesId}/user-types`,
  CREATE_USER_PROFILE: '/user-profiles',
  GET_USER_PROFILE_LIST: '/user-profiles',
  GET_USER_PROFILE_BY_ID: (userId: string | number) =>
    `/user-profiles/${userId}`,
  CREATE_BULK_USER_PROFILE: '/user-profiles/bulk',
  UPDATE_USER_PROFILE_BY_ID: (userId: string | number) =>
    `/user-profiles/${userId}`,
  DELETE_USER_PROFILE_BY_ID: (userId: string | number) =>
    `/user-profiles/${userId}`,
  UPDATE_USER_RESET_PASSWORD: (userId: string | number) =>
    `/user-profiles/${userId}/reset-password`,
  GET_DOWNLOAD_CREDENTIALS: '/user-profiles/download-credentials',
  UPDATE_USER_ACTIVATION_STATUS: (userId: string | number) =>
    `/user-profiles/${userId}/user-activation-status`,
  REDDIT_NOMINATION_PERMISSION: '/reedit-nomination-permission',
  GET_OPERATORS_BY_ARO_USER_ID: (userId: string | number) =>
    `/user-profiles/${userId}/operators`,
};
