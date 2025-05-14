import { Pagination } from '@api/miscellaneous/types';

export interface VoterAreaType {
  id?: string | number;
  idx?: number | string;
  areaCode?: string;
  electionClass?: string;
  nameEn?: string;
  nameBn?: string;
  maleVoter?: string;
  femaleVoter?: string;
  thirdGenderVoter?: string;
  unionOrWardId?: number;
  unionOrWard?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
  };
  unionWard?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
  };
  zillaId?: number;
  zilla?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
  };
  upazilaId?: number;
  upazila?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
  };
  municipalityId?: number;
  municipality?: {
    id?: number;
    nameBn?: string;
    nameEn?: string;
  };
  updatedAt?: string;
}
export interface VoterAreaGetIdResponseType {
  data: VoterAreaType;
  status?: number;
}

export interface VoterAreaPaginationType extends Pagination {
  voterAreas: VoterAreaType[];
}

export interface VoterAreaGetResponseType {
  data: VoterAreaPaginationType;
  status?: number;
}
export interface DeleteVoterAreaResponse {
  data?: any;
  status?: number;
  statusText: string;
}

export interface BulkEdit {
  voterAreas: {
    id: number;
    unionWardId: number;
  }[];
}
