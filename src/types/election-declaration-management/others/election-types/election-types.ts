import { Pagination } from '@api/miscellaneous/types';

export interface ElectionType {
  id: number;
  nameBn?: string;
  nameEn?: string;
  term?: number;
}

export interface ElectionTypeList extends Pagination {
  electionTypes: ElectionType[];
}
