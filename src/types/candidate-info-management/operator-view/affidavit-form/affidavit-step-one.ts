import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { DocumentServiceType } from '@type/documents/document-service-type';

export interface hookAffidavitStepOneProp extends UrlIdTypes {
  isGetAffidavitStepOne?: boolean;
}
export interface CandidatePersonalInfo {
  name?: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  dob?: string;
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
  // caseType?: string,
  accusedCase?: string;
  courtName?: string;
  caseNumber?: string;
  caseStatus?: string;
  caseFile?: DocumentServiceType;
}

export interface PastCaseType {
  idx?: number | string;
  id?: number | string;
  // caseType?: string,
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

export interface CreateAffidavitStepOnePropsType extends UrlIdTypes {
  data: AffidavitStepOneType;
}

export interface PresentCaseUrlType extends UrlIdTypes {
  caseId?: string | number;
}

export interface UpdatePresentCasePropsType extends UrlIdTypes {
  data: PresentCaseType;
  caseId?: string | number;
}

export default AffidavitStepOneType;
