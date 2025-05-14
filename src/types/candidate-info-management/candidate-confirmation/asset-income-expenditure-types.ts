export interface AssetsType {
  id: number;
  homeTypeAndNo: string;
  position: string;
  assetType: string;
  otherAssetsName: string;
  approximatePrice: string;
  totalAmount: string;
}

export interface YearlyIncomesAndExpendituresType {
  id: number;
  totalApproximateIncome: number | string;
  totalApproximateExpenditure: number | string;
}

export interface AssetIncomeExpenditureType {
  constituencyNameAndNo: string;
  candidateName: string;
  candidateAddress: string;
  assets: AssetsType[];
  yearlyIncomesAndExpenditures: YearlyIncomesAndExpendituresType[];
}

export interface AssetIncomeExpenditureTypeRes {
  data: AssetIncomeExpenditureType;
  status?: number;
  statusText?: string;
}
