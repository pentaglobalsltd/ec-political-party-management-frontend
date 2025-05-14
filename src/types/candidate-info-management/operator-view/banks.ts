import { Pagination } from '@api/miscellaneous/types';

export interface BankType {
  id: number;
  nameEn?: string;
  nameBn?: string;
}

export interface BanksType extends Pagination {
  banks: BankType[];
}

export interface BanksTypeRes {
  data: BanksType;
  status?: number;
  statusText?: string;
}
