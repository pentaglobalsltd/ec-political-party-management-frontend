import { Pagination } from '@api/miscellaneous/types';

export interface UnionOrWardType {
  id: number;
  UnionOrWardCode?: number;
  upazilaId?: number;
  municipalityId?: number;
  rmo?: string;
  nameEn?: string;
  nameBn?: string;
}

export interface UnionOrWardsType extends Pagination {
  unionsOrWards: UnionOrWardType[];
}

export interface UnionOrWardsTypeRes {
  data: UnionOrWardsType;
  status?: number;
  statusText?: string;
}
