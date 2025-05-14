export interface CandidateType {
  id: number;
  nameEn?: string;
  nameBn?: string;
  electionTypeId?: number;
  electionTypeNameBn?: string;
  electionTypeNameEn?: string;
  priorityLevel?: number;
  jamanatAmount?: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CandidateTypes {
  page?: number;
  size?: number;
  total?: number;
  candidateTypes: CandidateType[];
}

export interface CandidateTypesResProp {
  data: CandidateTypes;
  status?: number;
  statusText?: string;
}
