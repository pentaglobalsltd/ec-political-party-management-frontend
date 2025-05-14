import { Pagination } from '@api/miscellaneous/types';

export interface SingleMunicipalityTypeByScheduleCandidateZilla {
  id: number;
  municipalityCode: number;
  rmoBn: string;
  rmoEn: string;
  nameEn: string;
  nameBn: string;
}

export interface MunicipalitiesTypeByScheduleCandidateZilla extends Pagination {
  municipalities: SingleMunicipalityTypeByScheduleCandidateZilla[];
}

export interface MunicipalitiesTypeByScheduleCandidateZillaRes {
  data: MunicipalitiesTypeByScheduleCandidateZilla;
  status?: number;
  statusText?: string;
}
// ByScheduleCandidateZilla
