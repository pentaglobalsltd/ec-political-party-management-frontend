export interface UrlIdTypes {
  electionSettingsId?: string | number;
  candidateElectionDetailId?: string | number;
  isGetPersonalInfo?: boolean;
  getOnMount?: boolean;
}

export interface AssetsExceptHouseType {
  totalAmount?: string;
  otherLocation?: string;
  otherEstimatedValue?: string;
}

export interface HouseAssetsType {
  houseNatureNumber?: string;
  houseLocation?: string;
  houseValue?: string;
}

export interface OtherAssetsType {
  otherAssets?: string;
  otherAssetsValue?: string;
}

export interface YearlyIncomesAndExpendituresType {
  id?: number | string;
  totalIncome?: string;
  totalCost?: string;
  totalApproximateIncome?: string;
  totalApproximateExpenditure?: string;
}

export interface AssetsType {
  id?: number | string;
  idx?: number | string;
  constituencyNameAndNo?: string;
  candidateName?: string;
  candidateAddress?: string;
  assetsExceptHouse?: AssetsExceptHouseType[];
  houseAssets?: HouseAssetsType[];
  othersAssets?: OtherAssetsType[];
  incomeCost?: YearlyIncomesAndExpendituresType[];
  totalAmount?: string;
  position?: string;
  approximatePrice?: string;
  assetType?: string;
  homeTypeAndNo?: string;
  otherAssetsName?: string;
}

export interface GetAssetLiabilityPropsType {
  id?: number | string;
  idx?: number | string;
  constituencyNameAndNo?: string;
  candidateName?: string;
  candidateAddress?: string;
  assets?: AssetsType[];
  assetType?: string;
  yearlyIncomesAndExpenditures?: YearlyIncomesAndExpendituresType[];
}

export interface CreateAssetLiabilityPropsType extends UrlIdTypes {
  data: AssetsType;
}

export interface UpdateAssetType extends UrlIdTypes {
  idx?: number | string;
  data?: AssetsType;
  personalAssetId?: string | number;
  totalAmount?: string;
  otherLocation?: string;
  otherEstimatedValue?: string;
  yearlyIncomeExpenditureId?: string;
}

export interface UpdateYearlyIncomeType extends UrlIdTypes {
  id?: number | string;
  idx?: number | string;
  yearlyIncomeExpenditureId?: string | number;
  data?: AssetsType;
  totalApproximateIncome?: string;
  totalApproximateExpenditure?: string;
}

export interface DeleteAssetType extends UrlIdTypes {
  personalAssetId?: string | number;
}

export interface DeleteYearlyIncomeType extends UrlIdTypes {
  yearlyIncomeExpenditureId?: string | number;
}
