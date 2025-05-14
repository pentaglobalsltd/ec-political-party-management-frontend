import { Pagination } from '@api/miscellaneous/types';

export interface RMOType {
  nameEn?: string;
  nameBn?: string;
}

export interface RMOsType extends Pagination {
  rmos: RMOType[];
}

export interface RMOsTypeRes {
  data: RMOsType;
  status: number;
  statusText: string;
}
