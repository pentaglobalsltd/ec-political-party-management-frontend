export interface CreateElectionSettingsType {
  id?: number;
  electionScheduleId?: number;
  candidateTypeId?: number;
  regionId?: number;
  zillaId?: number;
  upazilaId?: number;
  constituencyId?: number;
  municipalityId?: number;
  unionOrWardId?: number;
  unionWardId?: number;
  isVoterAreaDivided?: boolean;
  isResultFromTab?: boolean;
  votingType?: string;
  dateOfNominationSubmission?: string;
  scheduleFile?: {
    documentId?: string;
    fileId?: string;
    filename?: string;
    fileType?: string;
  };
}

export interface ElectionSettingsContextDataType {
  regionId?: number;
  regionName?: string;
  constituencyDetails: ElectionSettingsContextConstituencyDetailsTypeType[];
}

export interface ElectionSettingsContextConstituencyDetailsTypeType {
  zillaId?: number;
  zillaName?: string;
  constituencyId?: number;
  constituencyName?: string;
  settingsId?: number;
}

export interface CreateElectionSettingsTypes {
  electionSettings?: CreateElectionSettingsType[];
}

export interface ElectionSettingsResponse {
  data?: CreateElectionSettingsTypes[];
  status?: number;
  statusText?: string;
}

export interface DeleteElectionSettingsResponse {
  data?: any;
  status?: number;
  statusText: string;
}
export interface LocationWiseConstituenciesListType {
  constituencyId?: number;
  nameEn?: string;
  nameBn?: string;
  constituencyName?: string;
  settingsId?: number;
}
export interface LocationWiseConstituenciesZillasType {
  zillaId?: number;
  nameEn?: string;
  nameBn?: string;
  zillaName?: string;
  constituencyList?: LocationWiseConstituenciesListType[];
}
export interface LocationWiseConstituenciesRegionsType {
  regionId?: number;
  nameEn?: string;
  nameBn?: string;
  regionName?: string;
  zillaList?: LocationWiseConstituenciesZillasType[];
}

export interface LocationWiseTotalConstituenciesRegionsType {
  total?: number;
  totalSelected?: number;
  ElectionWiseConstituencies?: LocationWiseConstituenciesRegionsType[];
}
