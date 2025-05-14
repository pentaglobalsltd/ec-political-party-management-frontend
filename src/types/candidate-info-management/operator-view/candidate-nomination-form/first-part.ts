import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export interface FirstPartPropType extends UrlIdTypes {
  data: FirstPartType;
  status?: number;
  statusText?: string;
}

export interface FirstPartType {
  proposer: FirstPartProposerType;
  candidateElectionAndPersonalDetails: FirstPartCandidateType;
}

export interface FirstPartProposerType {
  isAgree?: boolean;
  id?: number;
  dob?: number;
  voterNo?: string;
  nid?: string;
  name?: string;
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
  unionWardName?: number;
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
}

export interface FirstPartCandidateType {
  candidateId?: number;
  candidateType?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };
  name?: string;
  candidateAddress?: string;
  permanentAddress?: string;

  voterNo?: string;

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

  municipalityId?: number;
  municipalityName?: string;
  municipality?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };
}
