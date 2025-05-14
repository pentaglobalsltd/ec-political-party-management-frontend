export interface PollingCentersAggregatedType {
  id: number | string;
  electionScheduleId?: number | string;
  electionScheduleNameBn?: string;
  electionScheduleNameEn?: string;
  electionSettingsId?: number | string;
  descriptionBn?: string;
  descriptionEn?: string;
  numberOfBooth?: number | string;
  serial?: number | string;
  electionTypeId?: number | string;
  candidateTypeNameBn?: string;
  candidateTypeNameEn?: string;
  regionId?: number | string;
  regionNameBn?: string;
  regionNameEn?: string;
  zillaId?: number | string;
  zillaNameBn?: string;
  zillaNameEn?: string;
  upazilaId?: number | string;
  upazilaNameBn?: string;
  upazilaNameEn?: string;
  municipalityId?: number | string;
  municipalityNameBn?: string;
  municipalityNameEn?: string;
  unionOrWardId?: number | string;
  unionOrWardNameBn?: string;
  unionOrWardNameEn?: string;
  voterAreaNameEn?: string;
  voterAreaNameBn?: string;
  constituencyNameBn?: string;
  constituencyNameEn?: string;
  pollingInstituteId?: number | string;
  pollingInstituteNameBn?: string;
  pollingInstituteNameEn?: string;
  centerInstituteNameBn?: string;
  centerInstituteNameEn?: string;
  numberOfTemporaryBooth?: string | number;
  isTemporary?: boolean;
  isTabCenter?: boolean;
  isEvmCenter?: boolean;
  voterType?: string;
  totalMaleVoter?: number | string;
  totalFemaleVoter?: number | string;
  totalThirdGenderVoter?: number | string;
  totalVoter?: number | string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  voterAreaNameBnWithCode?: string;
  pollingInstituteLat?: string | number;
}

export interface PollingCentersAggregatedTypeRes {
  data?: {
    page?: number;
    size?: number;
    total?: number;
    pollingCenters?: PollingCentersAggregatedType[];
  };
  status?: number;
}
