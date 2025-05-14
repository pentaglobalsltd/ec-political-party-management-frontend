export interface ReservedWardsSelectOptionsType {
  label: string;
  value: number;
}

export interface SettingsSelectOptionsType {
  id: number;
  label: string;
  value: number;
  nameBn: string;
  nameEn: string;
  reservedWardId: number;
}

export interface ElectionSettingsForMunicipalityType {
  id: number;
  nameBn: string;
  nameEn: string;
}

export interface GeneralWardsType {
  id?: number;
  nameEn?: string;
  nameBn?: string;
  electionSettingsId?: number;
}

export interface ReservedWardsWithSettingsType {
  id?: number;
  nameEn?: string;
  nameBn?: string;
}

export interface SettingsType {
  id?: number;
  nameEn?: string;
  nameBn?: string;
  reservedWardId?: number;
}

export interface ReservedWardsWithSettingsResType {
  data?: {
    reservedWards: ReservedWardsWithSettingsType[];
    electionSettingsList: SettingsType[];
    electionSettingsForMunicipality?: ElectionSettingsForMunicipalityType;
    hasElectionSettingsForMunicipality?: boolean;
  };
  status?: number;
  statusText?: string;
}

export interface ReservedWardsWithSettingsApiResType {
  data?: ReservedWardsWithSettingsResType;
}
