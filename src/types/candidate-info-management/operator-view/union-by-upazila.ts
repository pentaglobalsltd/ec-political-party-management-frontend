import { Pagination } from '@api/miscellaneous/types';

export interface SingleUnionByUpazilaType {
  id: number;
  zillaId: number;
  zillaNameBn: string;
  zillaNameEn: string;
  code: number;
  geoCode: number;
  municipalityWardId: number;
  upazilaId: number;
  upazilaNameBn: string;
  upazilaNameEn: string;
  municipalityId: number;
  municipalityNameBn: string;
  municipalityNameEn: string;
  nameEn: string;
  nameBn: string;
  rmoEn: string;
  rmoBn: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UnionByUpazilaType extends Pagination {
  unionsOrWards: SingleUnionByUpazilaType[];
}

export interface UnionByUpazilaTypeRes {
  data: UnionByUpazilaType;
  status?: number;
  statusText?: string;
}
