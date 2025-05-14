export interface SelectOptionType {
  label: string;
  value: number;
}

export interface UnionOrWardsType {
  id?: number;
  unionOrWardCode?: number | string;
  rmoBn?: string;
  nameEn?: string;
  nameBn?: string;
}

export interface UnionOrWardsDataType {
  page?: number;
  size?: number;
  total?: number;
  data?: {
    unionsOrWards?: UnionOrWardsType[];
  };
  status?: number;
  statusText?: string;
}

export interface UnionOrWardsResType {
  data?: UnionOrWardsDataType;
}
