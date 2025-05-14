export interface MappedDynamicReportType {
  id: number;
  idx: string;
  name: string;
  nameBn: string;
  nameEn: string;
  conditionList: string[];
  tag: string;
  queryValue: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DynamicReportType {
  id: number;
  nameBn: string;
  nameEn: string;
  conditionList: string[];
  tag: string;
  queryValue: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DivergentReportList {
  divergentReportList: DynamicReportType[];
}

export interface DynamicReportListingTypeRes {
  data: DivergentReportList;
  status: number;
}
