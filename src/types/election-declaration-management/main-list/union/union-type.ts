import { Pagination } from '@api/miscellaneous/types';

export interface UnionOrWardType {
  id: number | string;
  unionOrWardCode?: number;
  zillaId: number;
  zillaNameBn: string;
  zillaNameEn: string;
  upazilaId?: number;
  upazilaNameBn?: string;
  upazilaNameEn?: string;
  municipalityId?: number | null;
  municipalityNameBn?: string | null;
  municipalityNameEn?: string | null;
  nameEn?: string;
  nameBn?: string;
  rmoEn?: string;
  rmoBn?: string;
  geoCode?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetUnionsOrWardsListPaginated extends Pagination {
  unionsOrWards: UnionOrWardType[];
}

export interface CreateUnionData {
  unionOrWardCode: number;
  upazilaId: number;
  municipalityId: number;
  nameBn: string;
  nameEn: string;
}

export interface GetUnionsOrWardsParams {
  UnionOrWardCode?: string;
  upazilaId?: string | number;
  regionId?: string | number;
  nameEn?: string;
  nameBn?: string;
  size?: number;
  page?: number;
}

export interface GetUnionOrWardsParamsData {
  UnionOrWardCode?: string;
  unionOrWardName?: string;
  regionId?: number;
  zillaId?: number;
  upazilaId?: number;
  nameEn?: string;
  nameBn?: string;
  size?: number;
  page?: number;
}
