import { Pagination } from '@api/miscellaneous/types';

export interface CandidateType {
  id: number;
  nameBn?: string;
  nameEn?: string;
  electionTypeId?: number;
  electionTypeNameBn?: string;
  electionTypeNameEn?: string;
  priorityLevel?: number;
  jamanatAmount?: number;
}

export interface CandidateTypeList extends Pagination {
  candidateTypes: CandidateType[];
}
