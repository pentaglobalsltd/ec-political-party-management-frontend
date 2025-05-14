import { UrlType } from '@type/url-type';

export interface IncomeSourceDetailsSecondPart {
  candidateElectionDetailsId?: number;
  createdAt?: string;
  createdBy?: string;
  id?: number;
  updatedAt?: string;
  updatedBy?: string;
  expenses?: ExpenseType[];
}

export interface ExpenseType {
  size?: number;
  values?: ExpenseValuesType[];
  multiple?: boolean;
  label?: string;
  key?: string;
  order?: number;
}

export interface ExpenseValuesType {
  key?: string;
  label?: string;
  order?: number;
  value?: string;
}
export interface IncomeSourceDetailsSecondPartPropsType extends UrlType {
  data?: IncomeSourceDetailsSecondPart;
}
