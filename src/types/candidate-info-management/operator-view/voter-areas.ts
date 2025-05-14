import { Pagination } from '@api/miscellaneous/types';

export interface VoterAreaType {
  id: number;
  electionClass?: string;
  zillaId?: number;
  upazilaId?: number;
  municipalityId?: number;
  unionOrWardId?: number;
  areaCode?: string;
  nameEn?: string;
  nameBn?: string;
  maleVoter?: number;
  femaleVoter?: number;
  totalVoter?: string;
}

export interface VoterAreasType extends Pagination {
  voterAreas: VoterAreaType[];
}

export interface VoterAreasTypeRes {
  data: VoterAreasType;
  status?: number;
  statusText?: string;
}
