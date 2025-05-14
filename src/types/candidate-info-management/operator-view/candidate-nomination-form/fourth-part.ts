import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export interface FourthPartMapDataType {
  candidateName?: string;
  constituencyId?: number;
  isElectedBefore?: boolean | null;
  pastElectionInfo?: string | null;
  pastElectionName?: string | null;
}

export interface FourthPartType {
  isElectedBefore: string;
  candidateName?: string;

  pastElectionName?: string;
  pastElectionInfo?: string;
  candidatePastElectionInfo?: {
    pastElectionName?: string;
    pastElectionInfo?: string;
  };

  constituencyName?: string;
  candidatePresentElectionInfo?: {
    constituencyId?: number;
    constituency?: {
      id?: number;
      nameEn?: string;
      nameBn?: string;
    };
  };
}
export interface FourthPartPropType extends UrlIdTypes {
  data: FourthPartType;
  status?: number;
  statusText?: string;
}
