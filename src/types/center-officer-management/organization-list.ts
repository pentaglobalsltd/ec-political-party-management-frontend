import { Pagination } from '@api/miscellaneous/types';

export interface GetAgencyProps {
  id: number;
  idx: number;
  regionId?: number;
  zillaId?: number;
  upazilaId?: number;
  municipalityId?: number;
  unionOrWardId?: number;
  rmoEn?: string;
  agencyType?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };
  nameEn?: string;
  nameBn?: string;
  address?: string;
  addressBn?: string;
  addressEn?: string;
  email?: string;
  mobileNo?: string;
  isActive?: boolean | string;
}
export interface CreateAgencyProps {
  unionOrWardId?: number;
  agencyTypeId?: number;
  rmoEn?: string;
  nameEn?: string;
  nameBn?: string;
  addressBn?: string;
  addressEn?: string;
  email?: string;
  mobileNo?: string;
  isActive?: boolean;
}
export interface AgencyTypeProps {
  id?: number;
  nameEn?: string;
  nameBn?: string;
}

export interface AgencyTypeListProps extends Pagination {
  data: AgencyTypeProps[];
}

export interface AgencyTypesRes {
  data: AgencyTypes;
  status?: number;
  statusText?: string;
}

export interface AgencyTypes {
  agencyTypes: GetAgencyProps[];
}

export interface CreateAgencyPropsPagination extends Pagination {
  data: CreateAgencyProps;
  status?: number;
  statusText?: string;
  message?: string;
}

export interface GetAgencyByIdProps {
  data: GetAgencyProps;
  status?: number;
  statusText?: string;
}

export interface AgenciesListProps extends Pagination {
  agencies: GetAgencyProps[];
}
export interface AgenciesListGetProps {
  data: AgenciesListProps;
  status?: number;
  statusText?: string;
}
