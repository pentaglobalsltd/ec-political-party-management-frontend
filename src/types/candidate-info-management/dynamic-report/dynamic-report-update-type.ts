export interface UpdateDynamicQueryApi {
  reportId: string;
  nameBn?: string;
  nameEn?: string;
  tag?: string;
  queryValue?: string;
}

export interface UpdateDynamicQuery {
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

export interface UpdateDynamicQueryRes {
  data?: UpdateDynamicQuery;
  status?: number;
}
