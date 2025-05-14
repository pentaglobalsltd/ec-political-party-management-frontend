import { DocumentServiceType } from '@type/documents/document-service-type';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export interface hookAffidavitStepOneProp extends UrlIdTypes {
  isGetAffidavitStepOne?: boolean;
}
export interface CandidatePersonalInfo {
  name?: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  educationalQualification?: string;
  occupationDescription?: string;
  noPresentCriminalCase?: boolean;
  noPastCriminalCase?: boolean;
  constituency?: string;
  candidateType?: string;
  electionType?: string;
  municipalityName?: string;
}
export interface PresentCaseType {
  idx?: number | string;
  id?: number | string;
  accusedCase?: string;
  courtName?: string;
  caseNumber?: string;
  caseStatus?: string;
  caseFile?: DocumentServiceType;
}

export interface PastCaseType {
  idx?: number | string;
  id?: number | string;
  accusedCase?: string;
  courtName?: string;
  caseNumber?: string;
  caseStatus?: string;
  caseFile?: DocumentServiceType;
}

export interface IncomeSourceType {
  id?: number | string;
  serialNo?: number | string;
  label?: string;
  selfIncome?: string;
  dependentIncome?: string;
}
export interface AffidavitStepOneType {
  candidatePersonalInfo?: CandidatePersonalInfo;
  presentCases?: PresentCaseType[];
  pastCases?: PastCaseType[];
  incomeSources?: IncomeSourceType[];
}

export interface AllPresentCaseType {
  cases?: PresentCaseType[];
}

export interface AffidavitStepOnePropsType extends UrlIdTypes {
  data: AffidavitStepOneType;
  status?: number;
  statusText?: string;
}

export interface PresentCaseUrlType extends UrlIdTypes {
  caseId?: string | number;
}

export interface UpdatePresentCasePropsType extends UrlIdTypes {
  data: PresentCaseType;
  caseId?: string | number;
}
