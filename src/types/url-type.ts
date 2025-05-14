export interface UrlType {
  electionSettingsId?: string | number;
  candidateElectionDetailId?: string | number;
  isGetPersonalInfo?: boolean;
  getOnMount?: boolean;
  personalAssetId?: string | number;
  yearlyIncomeExpenditureId?: string | number;
}

export interface CandidateInfoReportUrlType {
  userId?: string | number;
}

export interface PublishToUserAppUrlType {
  electionScheduleId?: string | number;
  electionSettingsId?: string | number;
}
