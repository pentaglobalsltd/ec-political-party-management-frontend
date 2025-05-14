export interface ElectionCandidateTypes {
  id?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface ElectionCandidateType {
  candidateTypes?: ElectionCandidateTypes[];
}

export interface ElectionCandidateTypesRes {
  data?: ElectionCandidateType;
  status?: number;
  statusText?: string;
}
