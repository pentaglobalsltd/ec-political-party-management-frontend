import { Pagination } from '@api/miscellaneous/types';

export interface UpazilaType {
  id: number;
  upazilaCode?: number;
  zillaId?: number;
  nameEn?: string;
  nameBn?: string;
}

export interface UpazilasType extends Pagination {
  upazilas: UpazilaType[];
}

export interface UpazilasTypeRes {
  data: UpazilasType;
  status?: number;
  statusText?: string;
}
