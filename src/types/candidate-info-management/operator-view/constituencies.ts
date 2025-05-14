import { Pagination } from '@api/miscellaneous/types';

export interface ConstituencyType {
  id: number;
  nameEn?: string;
  nameBn?: string;
}

export interface ConstituenciesType extends Pagination {
  constituencies: ConstituencyType[];
}

export interface ConstituenciesTypeRes {
  data: ConstituenciesType;
  status?: number;
  statusText?: string;
}
