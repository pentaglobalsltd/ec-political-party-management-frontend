import { Pagination } from '@api/miscellaneous/types';
export interface UserType {
  id?: number;
  nameEn?: string;
  nameBn?: string;
  code?: string;
}

export interface UserTypes extends Pagination {
  userTypes: UserType[];
}

export interface UserTypesProps {
  data?: UserTypes;
  status?: number;
  statusText?: string;
}
