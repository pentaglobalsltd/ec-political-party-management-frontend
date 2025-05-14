import { Pagination } from '@api/miscellaneous/types';

export interface SubDistrictType {
  id: number | string;
  isThana?: boolean;
  upazilaCode?: number | string;
  zillaId?: number | string;
  zillaNameBn?: string;
  zillaNameEn?: string;
  nameBn?: string;
  nameEn?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubDistrictSearchProps {
  regionId?: number;
  zillaId?: number;
  upazilaId?: number;
}

export interface GetSubDistrictListPaginated extends Pagination {
  upazilas: SubDistrictType[];
}

export interface SubDistrictResponseType {
  data?: GetSubDistrictListPaginated;
  status?: number;
  statusText?: string;
}
