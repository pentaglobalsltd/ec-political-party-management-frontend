import { Pagination } from '@api/miscellaneous/types';

export interface SingleUpazilaOrThana {
  id: number;
  upazilaCode: number;
  nameEn: string;
  nameBn: string;
}

export interface UpazilasOrThanas extends Pagination {
  upazilas: SingleUpazilaOrThana[];
}

export interface UpazilasOrThanasRes {
  data: UpazilasOrThanas;
  status?: number;
  statusText?: string;
}
