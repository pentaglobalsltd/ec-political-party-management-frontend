export const USER_MANAGEMENT_ROUTES = {
  USER_MANAGEMENT: '/user-management',

  // System User
  SYSTEM_USER_CREATE: 'create',
  EDIT_SYSTEM_USER: (userId: string | number) => `edit/${userId}`,
  PROFILE_EDIT_SYSTEM_USER: (userId: string | number) =>
    `/user-management/profile/edit/${userId}`,
  CREATE_SYSTEM_USER: (userId: string | number) => `create/${userId}`,

  // System Log
  SYSTEM_LOG: 'system-log',
  // Helpline
  HELPLINE: 'helpline',
};
