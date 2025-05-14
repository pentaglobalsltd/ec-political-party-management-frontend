import { Pagination } from '@api/miscellaneous/types';

export interface PollingCenterAggregatedType {
  id?: number;
  electionScheduleId?: number;
  electionSettingsId?: number;
  descriptionBn?: string;
  descriptionEn?: string;
  numberOfBooth?: number;
  serial?: number;
  electionTypeId?: number;
  candidateTypeNameBn?: string;
  candidateTypeNameEn?: string;
  regionId?: number;
  regionNameBn?: string;
  regionNameEn?: string;
  zillaId?: number;
  zillaNameBn?: string;
  zillaNameEn?: string;
  upazilaId?: number;
  upazilaNameBn?: string;
  upazilaNameEn?: string;
  municipalityId?: number;
  municipalityNameBn?: string;
  municipalityNameEn?: string;
  unionOrWardId?: number;
  unionOrWardNameBn?: string;
  unionOrWardNameEn?: string;
  pollingInstituteId?: number;
  pollingInstituteNameBn?: string;
  pollingInstituteName?: string;
  isSelected?: boolean;
}

export interface PollingCenterAggregatedPagination extends Pagination {
  pollingCenters: PollingCenterAggregatedType[];
}

export interface PollingCenterAggregatedPaginationProps {
  data: PollingCenterAggregatedPagination;
  status?: number;
  statusText?: string;
}

export interface PollingCenterType {
  id: number;
  serial?: number;
  nameEn?: string;
  nameBn?: string;
  electionScheduleId?: number;
  addressBn?: string;
  addressEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  numberOfBooth?: number;
  voterType?: string;
  isTabCenter?: boolean;
  isEvmCenter?: boolean;
  isActive?: boolean;
}

export interface PollingCenterPagination extends Pagination {
  pollingCenters: PollingCenterType[];
}

export interface PollingCenterPaginationProps {
  data: PollingCenterPagination;
  status?: number;
  statusText?: string;
}
