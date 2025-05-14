import { Pagination } from '@api/miscellaneous/types';

export interface ZillaType {
  id: number;
  zillaCode?: number;
  regionId?: number;
  serialNo?: number;
  nameEn?: string;
  nameBn?: string;
}

export interface ZillasType extends Pagination {
  zillas: ZillaType[];
}

export interface ZillasTypeRes {
  data: ZillasType;
  status?: number;
  statusText?: string;
}
