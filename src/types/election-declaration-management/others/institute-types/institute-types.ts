import { Pagination } from '@api/miscellaneous/types';

export interface InstituteType {
  nameBn?: string;
  nameEn?: string;
}

export interface InstituteTypeList extends Pagination {
  instituteTypes: InstituteType[];
}

export interface InstituteTypeDataType {
  createdAt?: string;
  createdBy?: string;
  id?: number;
  nameBn?: string;
  nameEn?: string;
  updatedAt?: string;
  updatedBy?: string;
}
