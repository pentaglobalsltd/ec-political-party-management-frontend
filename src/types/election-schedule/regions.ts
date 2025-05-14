import { Pagination } from '@api/miscellaneous/types';

export interface ElectionSchedulesRegion {
  id?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface ElectionSchedulesRegions extends Pagination {
  regions?: ElectionSchedulesRegion[];
}

export interface ElectionSchedulesRegionsRes {
  data?: ElectionSchedulesRegions;
  status?: number;
  statusText?: string;
}
