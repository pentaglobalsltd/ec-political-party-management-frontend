import { Pagination } from '@api/miscellaneous/types';

export interface GetUnionWardType {
  id?: number;
  unionWardCode?: number;
  unionOrWard?: { id: number; nameEn: string; nameBn: string };
  unionWardId?: number;
  upazila?: { id: number; nameEn: string; nameBn: string };
  unionId?: number;
  unionNameBn?: string;
  unionNameEn?: string;
  upazilaId?: number;
  upazilaNameBn?: string;
  upazilaNameEn?: string;
  nameBn?: string;
  nameEn?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface GetUnionWardResponseType extends Pagination {
  status: number;
  data: GetUnionWardType;
}

export interface CreateUnionWardType {
  unionWardCode?: number;
  unionId?: number;
  upazilaId?: number;
  nameBn?: string;
  nameEn?: string;
}
export interface UpdateUnionWardType extends CreateUnionWardType {
  id: number;
}
export interface CreateUnionWardsResponse {
  data: CreateUnionWardType;
  status: number;
}

export interface UpdateUnionWardsResponse {
  data: UpdateUnionWardType;
  status: number;
}
export interface GetUnionWardListType extends Pagination {
  unionWards?: GetUnionWardType[];
}
export interface GetUnionWardListResponseType extends Pagination {
  status: number;
  data: GetUnionWardListType;
}

export interface UnionWardQueryParams {
  page?: number;
  size?: number;
  upazilaId?: number;

  unionId?: number;
  // unionWardIds?: number[];
  unionWardIds?: string;
  unionIds?: string;
  unionOrWardId?: number;
  unionWardCode?: number;
  nameBn?: string;
  nameEn?: string;
}

export interface DeleteUnionWard {
  data?: any;
  status?: number;
  statusText?: string;
}
