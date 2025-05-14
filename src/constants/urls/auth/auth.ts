export const AUTH = {
  SIGN_IN: 'public/login',
  SIGN_OUT: 'private/logout',
  RESET_PASSWORD: 'public/reset-password',
  UPDATE_PASSWORD: 'private/reset-password',
  GET_NEW_ACCESS_TOKEN: 'private/renew-access-token',
  RE_EDIT_PERMISSION: (candidateElectionDetailsId?: string | number) =>
    `candidate-election-details/${candidateElectionDetailsId}`,
  UPDATE_PROFILE: (username?: string) => `/private/users/${username}/profile`,
  ROLES: (userId: string) => `private/users/${userId}/roles`,
};
