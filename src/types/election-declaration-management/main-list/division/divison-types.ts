import { Pagination } from '@api/miscellaneous/types';

export interface RegionType {
  id: number | string;
  regionCode?: number;
  nameBn?: string;
  nameEn?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetRegionListPaginated extends Pagination {
  regions: RegionType[];
}

export interface GetRegionListResponse {
  data?: GetRegionListPaginated;
  status?: number;
  statusText?: string;
}

export interface GetRegionResponse {
  data?: RegionType;
  status?: number;
  statusText?: string;
}

export interface SelectOptionType {
  label: string;
  value: number;
}

export interface CreateRegionType {
  regionCode?: number;
  nameBn?: string;
  nameEn?: string;
}
