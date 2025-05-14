import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export interface ThirdPartType {
  candidatePersonalInfo?: candidatePersonalInfoType;
  candidatePoliticalInfo?: candidatePoliticalInfoType;
}
export interface ThirdPartPropType extends UrlIdTypes {
  data: ThirdPartType;
  status?: number;
  statusText?: string;
}

export interface candidatePersonalInfoType {
  name?: string;
  nid?: string;
  fatherOrHusbandName?: string;
  gender?: string;
  maritalStatus?: string;
  motherName?: string;
  candidateAddress?: string;
  permanentAddress?: string;

  voterNo?: string;
  serialNo?: string;

  regionId?: number;
  regionName?: number;
  region?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  zillaId?: number;
  zillaName?: number;
  zilla?: {
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

  upazilaId?: number;
  upazilaName?: number;
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

  unionOrWardId?: number;
  unionOrWardName?: number;
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
  voterAreaName?: number;
  voterArea?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };

  bankId?: number;
  bankName?: number;
  bankAccountNo?: string;
  bankBranchName?: string;
  bank?: {
    accountNo?: string;
    id?: number;
    nameEn?: string;
    nameBn?: string;
    bankBranchName?: string;
  };

  tin?: string;
}
export interface candidatePoliticalInfoType {
  politicalPartyId?: number;
  politicalParty?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
    preferredSymbolId?: number;
    preferredSymbolNameEn?: string;
    preferredSymbolNameBn?: string;
    symbolNameEn?: string;
    symbolNameBn?: string;
  };

  symbolId?: number | number;

  preferredSymbol?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
  };
}
