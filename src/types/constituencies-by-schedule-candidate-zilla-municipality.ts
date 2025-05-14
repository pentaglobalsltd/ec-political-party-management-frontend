import { Pagination } from '@api/miscellaneous/types';

export interface SingleConstituencyTypeByScheduleCandidateZillaMunicipality {
  id: number;
  nameBn: string;
  nameEn: string;
  electionSettingsId: number;
  candidateTypeId: number;
  electionTypeId: number;
}

export interface ConstituencyTypeByScheduleCandidateZillaMunicipality
  extends Pagination {
  constituencies: SingleConstituencyTypeByScheduleCandidateZillaMunicipality[];
}

export interface ConstituencyTypeByScheduleCandidateZillaMunicipalityRes {
  data: ConstituencyTypeByScheduleCandidateZillaMunicipality;
  status?: number;
  statusText?: string;
}
