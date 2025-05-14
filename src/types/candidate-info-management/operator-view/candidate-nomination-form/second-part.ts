import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export interface SecondPartPropType extends UrlIdTypes {
  data: SecondPartType;
  status?: number;
  statusText?: string;
}
export interface SecondPartType {
  supporter: SecondPartChildType;
  candidateElectionAndPersonalDetails: candidateElectionAndPersonalDetailsType;
}

export interface candidateElectionAndPersonalDetailsType {
  name?: string;
  candidateAddress?: string;
  permanentAddress?: string;

  voterNo?: string;

  zillaName?: string;
  zilla?: {
    id?: string | number;
    nameBn?: string;
    nameEn?: string;
  };

  constituencyName?: string;
  constituency?: {
    id?: string | number;
    nameBn?: string;
    nameEn?: string;
  };

  candidateTypeName?: string;
  candidateType?: {
    id?: string | number;
    nameBn?: string;
    nameEn?: string;
  };

  electionSchedule?: {
    id?: string | number;
    nameBn?: string;
    nameEn?: string;
  };

  municipality?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };
}
export interface SecondPartChildType {
  id?: number;
  isAgree?: boolean;
  name?: string;
  voterNo?: string;
  nid?: string;
  dob?: string;
  serialNo?: number;

  regionId?: number;
  regionName?: number;
  region?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  zillaId?: number;
  zillaName?: string;
  zilla?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  constituencyId?: number;
  constituencyName?: string;
  constituency?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  upazilaId?: number;
  upazilaName?: string;
  upazila?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  rmoEn?: string;
  rmoName?: string;
  rmo?: {
    nameEn?: string;
    nameBn?: string;
  };

  municipalityId?: number;
  municipalityName?: string;
  municiaplity?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  unionOrWardId?: number;
  unionOrWardName?: string;
  unionOrWard?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  unionWardId?: number;
  unionWardName?: string;
  unionWard?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  voterAreaId?: number;
  voterAreaName?: string;
  voterArea?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  candidateType?: {
    id?: string | number;
    nameBn?: string;
    nameEn?: string;
  };
}
