export interface SelfFundingType {
  id: number;
  approximateAmount: number | string;
  incomeSource: string;
}

export interface RelativeFundingType {
  id: number;
  approximateAmount: number | string;
  relativeName: string;
  relativeAddress: string;
  relation: string;
  relativeIncomeSource: string;
  relativeFundingType: string;
}

export interface OtherFundingType {
  id: number;
  approximateAmount: number | string;
  personOrInstitutionName: string;
  personOrInstitutionAddress: string;
  incomeSource: string;
  otherFundingType: string;
}

export interface ElectionExpensesFundingType {
  constituencyNameAndNo: string;
  candidateName: string;
  candidateAddress: string;
  selfFundings: SelfFundingType[];
  relativeFundings: RelativeFundingType[];
  otherFundings: OtherFundingType[];
}

export interface ElectionExpensesFundingTypeRes {
  data: ElectionExpensesFundingType;
  status?: number;
  statusText?: string;
}
