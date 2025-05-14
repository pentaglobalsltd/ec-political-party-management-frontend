export interface CandidateTypeWisePollingCenterCount {
  candidateTypeId?: number;
  candidateTypeNameBn?: string;
  forwardedByOpCount?: number;
  approvedByAroCount?: number;
  requestedByRoCount?: number;
  returnedByAroCount?: number;
  createdByOpCount?: number;
  totalCenterCount?: number;
  cancelledCenterCount?: number;
}
export interface ResubmittedPollingCenters {
  pollingCenterId?: number;
  pollingCenterNameEn?: string;
  pollingCenterNameBn?: string;
  pollingInstituteNameEn?: string;
  pollingInstituteNameBn?: string;
  pollingCenterSerial?: number;
  pollingCenterResultStatus?: string;
  candidateTypeId?: number;
  candidateTypeNameEn?: string;
  candidateTypeNameBn?: string;
  isVisible?: boolean;
}
export interface SubmitResultSummary {
  totalPollingCenterCount?: number;
  resubmittedPollingCenters?: ResubmittedPollingCenters[];
  candidateTypeWisePollingCenterCount?: CandidateTypeWisePollingCenterCount[];
}

export interface SubmitResultSummaryOpRes {
  data?: SubmitResultSummary;
  status?: number;
}
export interface PollingCenterDetails {
  id?: number;
  nameEn?: string;
  nameBn?: string;
  label?: string;
  serial?: number;
  status?: string;
  voterType?: string;
  maleVoter?: number;
  femaleVoter?: number;
  thirdGenderVoter?: number;
  totalVoter?: number;
  bgClassName?: string;
  subTextClassName?: string;
  titleTextColor?: string;
}
export interface PollingCenterDetailsList {
  pollingCenters?: PollingCenterDetails[];
}
export interface PollingCenterDetailsListRes {
  data?: PollingCenterDetailsList;
  status?: number;
}
export interface CandidateTypeWisePollingCenterDetails {
  id?: number;
  nameEn?: string;
  nameBn?: string;
  pollingCenterId?: number;
  descriptionBn?: string;
  serial?: number;
  status?: string;
  candidateTypeId?: number;
  electionSettingsId?: number;
  pollingInstituteNameBn?: string;
  voterType?: string;
  isActive?: boolean;
  maleVoter?: number;
  femaleVoter?: number;
  thirdGenderVoter?: number;
  totalVoter?: number;
  bgClassName?: string;
  subTextClassName?: string;
  titleTextColor?: string;
  label?: string;
}
export interface CandidateTypeWisePollingCenterDetailsList {
  pollingCenterResults: CandidateTypeWisePollingCenterDetails[];
  page?: number;
  size?: number;
  total: number;
}
export interface CandidateTypeWisePollingCenterDetailsListRes {
  data: CandidateTypeWisePollingCenterDetailsList;
  status?: number;
}
