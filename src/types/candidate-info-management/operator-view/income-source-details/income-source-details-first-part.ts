import { UrlType } from '@type/url-type';

export interface OwnEarningType {
  id?: string;
  approximateAmount?: string;
  incomeSource?: string;
}

export interface EarningFromRelativeType {
  potentialAmount?: string;
  relativeName?: string;
  relativeAddress?: string;
  relation?: string;
  relativeIncomeSource?: string;
}
export interface DonationByRelativeType {
  potentialAmount?: string;
  relativeName?: string;
  relativeAddress?: string;
  relation?: string;
  relativeIncomeSource?: string;
}

export interface EaringFromOthersType {
  potentialAmount?: string;
  personName?: string;
  personAddress?: string;
}
export interface DonationByOthersType {
  potentialAmount?: string;
  personName?: string;
  personAddress?: string;
}

export interface MisecallenousEarningType {
  potentialAmount?: string;
  name?: string;
  address?: string;
  incomeSource?: string;
}

export interface IncomeSourceDetailsType {
  constituencyNameAndNo?: string;
  candidateName?: string;
  candidateAddress?: string;
  selfFunding?: OwnEarningType[];
  earningFromRelative?: EarningFromRelativeType[];
  donationByRelative?: DonationByRelativeType[];
  earningFromOthers?: OtherFundingsType[];
  donationByOthers?: OtherFundingsType[];
  miscellaneous?: OtherFundingsType[];
}

export interface SelfFundingsType {
  id?: string | number;
  idx?: string | number;
  incomeSource?: string;
  approximateAmount?: string;
}

export interface RelativeFundingsType {
  id?: string | number;
  idx?: string | number;
  approximateAmount?: string;
  relativeName?: string;
  relativeAddress?: string;
  relation?: string;
  relativeIncomeSource?: string;
  relativeFundingType?: string;
}

export interface OtherFundingsType {
  id?: string | number;
  idx?: string | number;
  approximateAmount?: string;
  personOrInstitutionName?: string;
  personOrInstitutionAddress?: string;
  incomeSource?: string;
  otherFundingType?: string;
}

export interface GetIncomeSourceDetails {
  constituencyNameAndNo?: string;
  candidateName?: string;
  candidateAddress?: string;
  selfFundings?: OwnEarningType[];
  relativeFundings?: RelativeFundingsType[];
  otherFundings?: OtherFundingsType[];
}

export interface CreateIncomeSourceDetailsType extends UrlType {
  data: IncomeSourceDetailsType;
}

export interface GetIncomeSourceDetailsResponseType extends UrlType {
  data: GetIncomeSourceDetails;
}

export interface UpdateSelfFundingType extends UrlType {
  data: OwnEarningType;
  selfFundingId?: string | number;
}

export interface SelfFundingURLType extends UrlType {
  selfFundingId?: string | number;
}

export interface UpdateRelativeFundingType extends UrlType {
  data: RelativeFundingsType;
  relativeFundingId?: string | number;
}

export interface RelativeFundingURLType extends UrlType {
  relativeFundingId?: string | number;
}

export interface UpdateOtherFundingType extends UrlType {
  data: OtherFundingsType;
  otherFundingId?: string | number;
}

export interface OtherFundingURLType extends UrlType {
  otherFundingId?: string | number;
}
