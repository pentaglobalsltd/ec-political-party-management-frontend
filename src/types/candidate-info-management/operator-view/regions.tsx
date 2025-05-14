import { Pagination } from '@api/miscellaneous/types';

export interface RegionType {
  id?: number;
  regionCode?: number;
  nameEn?: string;
  nameBn?: string;
}

export interface RegionsType extends Pagination {
  regions: RegionType[];
}

export interface RegionsTypeRes {
  data: RegionsType;
  status?: number;
  statusText?: string;
}
