import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export interface hookLiabilitiesProp extends UrlIdTypes {
  isGetLiabilities?: boolean;
}
export interface LiabilitiesType {
  notElectedBefore?: boolean;
  notReceivedLoans?: boolean;
  liabilities?: LiabilityChildType[];
  commitmentAchievements?: CommitmentAchievementChildType[];
  loans?: LoansType[];
  oath?: OathType;
}

export interface LiabilityChildrenType {
  liabilities: LiabilityChildType[];
}

export interface UpdateLiabilityChildPropsType extends UrlIdTypes {
  data: LiabilityChildType;
  liabilityId?: string | number;
}
export interface LiabilityChildPropsType extends UrlIdTypes {
  liabilityId?: string | number;
}
export interface CommitmentAchievementChildPropsType extends UrlIdTypes {
  commitmentAchievementId?: string | number;
}
export interface LiabilitiesPropsType extends UrlIdTypes {
  data: LiabilitiesType;
  status?: number;
  statusText?: string;
}
export interface UpdateCommitmentAchievementChildPropsType extends UrlIdTypes {
  data: LiabilityChildType;
  commitmentAchievementId?: string | number;
}
export interface CommitmentAchievementChildrenType {
  commitmentAchievements: CommitmentAchievementChildType[];
}

export interface LiabilityChildType {
  idx?: number | string;
  id?: number | string;
  natureLiabilitiesDebts?: string;
  amount?: string;
  file?: {
    documentId?: string;
    fileId?: string;
    filePath?: string;
    fileName?: string;
  };
}

export interface CommitmentAchievementChildType {
  idx?: number | string;
  id?: number | string;
  promises?: string;
  achievements?: string;
}
export interface LoansType {
  id?: string | number;
  serialNo?: number;
  loanType?: string;
  FinancialInstitutionName?: string;
  LoanAmount?: string;
  DefaultedLoanAmount?: string;
  RescheduledLoanDate?: string;
}
export interface OathType {
  holofnamaSubmissionDate?: string;
  magistrateNotaryPublic?: {
    name?: string;
    signingDate?: string;
  };
  identifierInfo?: {
    name?: string;
    presentAddress?: string;
    permanentAddress?: string;
  };
  candidateInfo?: {
    name?: string;
    fatherName?: string;
    spouseName?: string;
    presentAddress?: string;
    permanentAddress?: string;
    gender?: string;
  };
}
