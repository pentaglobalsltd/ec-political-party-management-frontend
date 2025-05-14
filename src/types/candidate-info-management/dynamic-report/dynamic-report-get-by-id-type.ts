export interface DivergentReportByIdType {
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

export interface DynamicReportGetByIdTypeRes {
  data: DivergentReportByIdType;
  status: number;
}
