export interface ElectionType {
  id?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface ElectionTypes {
  electionTypes?: ElectionType[];
}

export interface ElectionTypeRes {
  data?: ElectionTypes;
  status?: number;
  statusText?: string;
}
