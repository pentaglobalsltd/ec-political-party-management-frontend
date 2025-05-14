export interface CreateDynamicQueryApi {
  nameBn?: string;
  nameEn?: string;
  tag?: string;
  queryValue?: string;
}

export interface CreateDynamicQuery {
  id?: number;
  nameBn?: string;
  nameEn?: string;
  conditionList?: string[];
  tag?: string;
  queryValue?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDynamicQueryRes {
  data?: CreateDynamicQuery;
  status?: number;
}
