export interface ReEditPermissionType {
  id?: number;
  reeditPermission?: boolean;
}
export interface UpdateProfileTypes {
  username?: string;
  phone?: string;
  email?: string;
}
export interface GetUpdateProfileResTypes {
  data?: UpdateProfileTypes;
  status?: number;
}
