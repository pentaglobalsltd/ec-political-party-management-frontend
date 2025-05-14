export interface PollingCenterListFilter {
  scheduleId: number | string;
  status?: string;
  commonSearchParam?: string;
  constituencyId?: string | number;
  candidateTypeId?: string | number;
  userId?: string | number;
  zillaId?: string | number;
  upazilaId?: string | number;
  page?: number;
  size?: number;
  electionSettings?: string | number;
}

export interface PollingCenterListFilterWithUserId
  extends PollingCenterListFilter {
  userId: string;
  electionSettingsId?: string | number;
  electionTypeId?: string | number;
}
export interface PollingCenterInfo {
  scheduleId: number | string;
  centerId: number | string;
  candidateTypeId: number | string;
}

export interface PollingCenterType {
  id: number;
  pollingCenter: {
    id: number;
    electionScheduleId: number;
    electionScheduleNameBn: string;
    electionScheduleNameEn: string;
    electionSettingsId: number;
    descriptionBn: string;
    descriptionEn: string;
    numberOfBooth: number;
    serial: number;
    electionTypeId: number;
    candidateTypeNameBn: string;
    candidateTypeNameEn: string;
    regionId: number;
    regionNameBn: string;
    regionNameEn: string;
    zillaId: number;
    zillaNameBn: string;
    zillaNameEn: string;
    upazilaId: number;
    upazilaNameBn: string;
    upazilaNameEn: string;
    municipalityId: number;
    municipalityNameBn: null;
    municipalityNameEn: null;
    unionOrWardId: number;
    unionOrWardNameBn: null;
    unionOrWardNameEn: null;
    voterAreaNameEn: string;
    voterAreaNameBn: string;
    pollingInstituteId: number;
    pollingInstituteNameBn: null;
    pollingInstituteNameEn: null;
    isTabCenter: true;
    isEvmCenter: false;
    voterType: string;
    maleVoter: number;
    femaleVoter: number;
    totalVoter: number;
    isActive: true;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
  };
  totalLegalVoteCount: number;
  totalIllegalVoteCount: number;
  totalAbsentVoteCount: number;
  status: string;
  candidateTypeId: number;
}
