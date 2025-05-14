export interface RoReportFilterOptionType {
  id?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface ElectionSettingsType {
  settingsId?: string | number;
  constituencyId?: number;
  unionOrWardId?: number;
  constituencyNameBn?: string;
  constituencyNameEn?: string;
  candidateTypeId?: string;
}

export interface GetRoReportFiltersType {
  id?: number | string;
  userId?: string;
  nameBn?: string;
  nameEn?: string;
  userTypeCode?: string;
  email?: string;
  loginId?: string;
  isActive?: boolean;
  affiliation?: string;
  regions?: RoReportFilterOptionType[];
  agencyId?: number | string;
  electionTypes?: RoReportFilterOptionType[];
  electionSchedules?: RoReportFilterOptionType[];
  candidateTypes?: RoReportFilterOptionType[];
  zillas?: RoReportFilterOptionType[];
  electionSettings?: ElectionSettingsType[];
  municipalities?: RoReportFilterOptionType[];
  unionOrWards?: RoReportFilterOptionType[];
  upazilas?: RoReportFilterOptionType[];
}

export interface GetRoReportFiltersTypeRes {
  data?: GetRoReportFiltersType;
  status?: number;
  statusText?: string;
}
