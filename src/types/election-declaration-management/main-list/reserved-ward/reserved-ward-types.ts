interface UnionOrWardsType {
  id?: number;
  municipalityWardId?: number;
  nameBn?: string;
  nameEn?: string;
  unionOrWardCode?: number;
}

export interface ReservedWardTypeListParams {
  page?: number;
  size?: number;
  code?: number;
  municipalityId?: number;
}

export interface ReservedWardCreateType {
  code?: number;
  upazilaId?: number;
  municipalityId?: number;
  nameBn?: string;
  nameEn?: string;
  rmo?: string;
  municipalityWardIds?: number[] | string;
  isActive?: boolean;
}

export interface ReservedWardType {
  id: number;
  code?: number;
  upazilaId?: number;
  upazilaNameBn?: string;
  upazilaNameEn?: string;
  municipalityId?: number;
  municipalityNameBn?: string;
  municipalityNameEn?: string;
  rmo?: string;
  nameBn?: string;
  nameEn?: string;
  municipalityWardIds?: number[];
  isActive?: boolean;
  unionOrWards?: UnionOrWardsType[];
}

export interface ReservedWardListType {
  page?: number;
  size?: number;
  total?: number;
  reservedWards?: ReservedWardType[];
}

export interface ReservedWardListResponse {
  data?: ReservedWardListType;
  status?: number;
  statusText?: string;
}
