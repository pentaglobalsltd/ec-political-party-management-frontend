export interface ElectionSettingsSearchProps {
  electionScheduleId?: number | string;
  candidateTypeId?: number | string;
  regionId?: number | string;
  zillaId?: number | string;
  upazilaId?: number | string;
  upazilaIds?: number[];
  constituencyId?: number | string;
  municipalityId?: number | string;
  unionOrWardId?: number | string;
  unionWardId?: number | string;
  municipalityWardIds?: number[];
  reservedWardIds?: number[];
  electionSettingsIds?: number[];
}

export interface ElectionSettingsType {
  id?: number;
  nameBn?: string;
  nameEn?: string;
  electionTypeId?: number;
  electionScheduleId?: number;
  electionScheduleName?: string;
  candidateTypeId?: number;
  candidateTypeName?: string;
  regionId?: number;
  regionName?: string;
  zillaId?: number;
  zillaName?: string;
  upazilaId?: number;
  upazilaName?: string;
  constituencyId?: number;
  constituencyName?: string;
  municipalityId?: number;
  municipalityName?: string;
  unionOrWardId?: number;
  unionOrWardName?: string;
  unionWardId?: number;
  unionReservedWardId?: number;
  unionReservedWardName?: string;
  unionWardName?: string;
  municipalityWardId?: number;
  municipalityWardName?: string;
  reservedWardId?: number;
  reservedWardName?: string;
  isVoterAreaDivided?: boolean;
  isResultFromTab?: boolean;
  votingType?: string;
  dateOfNominationSubmission?: string;
  scheduleFile?: File;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ElectionSettingsResponseType {
  data: {
    electionSettings: ElectionSettingsType[];
    page: number;
    size: number;
    total: number;
  };
  status?: number;
  statusText?: string;
}
