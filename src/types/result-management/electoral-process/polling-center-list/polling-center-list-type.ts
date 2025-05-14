export interface PollingCenterListParamsForARO {
  page?: number;
  size?: number;
  electionSettingsIds: string;
  electionTypeId?: number;
  electionScheduleId?: number;
  zillaId?: number;
  unionOrWardId?: number;
  unionWardId?: number;
  isActive?: boolean;
}

export interface PollingCenterType {
  id: number;
  electionScheduleId?: number;
  electionScheduleNameBn?: string;
  electionScheduleNameEn?: string;
  electionSettingsId?: number;
  descriptionBn?: string;
  descriptionEn?: string;
  numberOfBooth?: number;
  serial?: number;
  electionTypeId?: number;
  candidateTypeId?: number;
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
  unionWardNameBn?: string;
  unionWardNameEn?: string;
  voterAreaCode?: string;
  voterAreaNameEn?: string;
  voterAreaNameBn?: string;
  constituencyNameBn?: string;
  constituencyNameEn?: string;
  pollingInstituteId?: number;
  pollingInstituteNameBn?: string;
  pollingInstituteNameEn?: string;
  isTabCenter?: boolean;
  isEvmCenter?: boolean;
  voterType?: string;
  totalMaleVoter?: number;
  totalFemaleVoter?: number;
  totalThirdGenderVoter?: number;
  totalVoter?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PollingCenterListForAROType {
  page?: number;
  size?: number;
  total?: number;
  pollingCenters?: PollingCenterType[];
}

export interface PollingCenterListResponseForARO {
  data?: PollingCenterListForAROType;
  status?: number;
  statusText?: string;
}
