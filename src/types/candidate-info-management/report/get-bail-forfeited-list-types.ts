import { Pagination } from '@api/miscellaneous/types';

export interface BailForfeitedOnSubmitSearchPropsType {
  electionTypeId?: number;
  electionScheduleId?: number;
  candidateTypeId?: number;
  zillaId?: number;
  municipalityId?: number;
  upazilaThanaId?: number;
  constituencyId?: number;
}

export interface BailForfeitedSearchPropsType {
  page?: number;
  size?: number;
  electionScheduleId: number;
  candidateTypeId?: number;
  zillaId?: number;
  constituencyId?: number;
}

export interface BailForfeitedItemType {
  id: number;
  electionScheduleId?: number;
  zillaId?: number;
  zillaNameBn?: string;
  electionMunicipality?: string;
  constituencyId?: number;
  constituency?: string;
  constituencyNameBn?: string;
  candidateTypeId?: number;
  candidateTypeNameBn?: string;
  candidateNameBn?: string;
  candidateNid?: string;
  phone?: string;
  totalCastedVote?: number | string;
  candidateVoteCount?: number | string;
  candidateVoteCountPercentage?: number | string;
}

export interface BailForfeitedListType extends Pagination {
  bailForfeitedList: BailForfeitedItemType[];
}

export interface BailForfeitedListResponseType {
  data: BailForfeitedListType;
  status?: number;
  statusText?: string;
}
