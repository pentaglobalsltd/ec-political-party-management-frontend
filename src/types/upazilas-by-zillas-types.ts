export interface UpazilasByZillasSelectOptionsType {
  label: string;
  value: number;
}

export interface UpazilaByZillasType {
  id?: number;
  upazilaCode?: number;
  nameEn?: string;
  nameBn?: string;
}

export interface UpazilasByZillasType {
  data?: {
    page: 1;
    size: 2;
    total: 10;
    upazilas: UpazilaByZillasType[];
  };
  status?: number;
  statusText?: string;
}

export interface UpazilasByZillasResType {
  data?: UpazilasByZillasType;
}
