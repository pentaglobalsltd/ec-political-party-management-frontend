import { Pagination } from '@api/miscellaneous/types';

export interface CenterSummary {
  id?: number;
  instituteName?: string;
  instituteNameEn?: string;
  instituteNameBn?: string;
  totalBooth?: number;
  presidingOfficerMaxNumber?: number;
  presidingOfficerAssignedNumber?: number;
  assistantPresidingOfficerMaxNumber?: number;
  assistantPresidingOfficerAssignedNumber?: number;
  pollingOfficerMaxNumber?: number;
  pollingOfficerAssignedNumber?: number;
  inchargePresidingOfficerMaxNumber?: number;
  inchargePresidingOfficerAssignedNumber?: number;
  availableBoothForAPO?: number[];
  availableBoothForPO?: number[];
}
export interface PollingPersonnels {
  pollingPersonnelCenter?: {
    id?: number;
    assignedDesignationBn?: string;
    assignedDesignationEn?: string;
    numberOfBooth?: number;
    isIncharge?: boolean;
    electionSchedule?: {
      id?: number;
      nameEn?: string;
      nameBn?: string;
    };
  };
  pollingCenter?: {
    id?: number;
    instituteNameEn?: string;
    instituteNameBn?: string;
  };
  pollingPersonnel?: {
    id?: number;
    nameEn?: string;
    nameBn?: string;
    agency?: {
      id?: number;
      nameEn?: string;
      nameBn?: string;
    };
    userTypeModel?: {
      id?: number;
      nameEn?: string;
      nameBn?: string;
      code?: string;
    };
    designation?: string;
    payScale?: {
      id?: number;
      nameEn?: string;
      nameBn?: string;
      maxValue?: number;
      minValue?: number;
    };
    basicSalary?: number;
  };
}
export interface PollingPersonnelsPagination extends Pagination {
  items: PollingPersonnels[];
}
export interface PollingCenterSummary {
  centerSummary: CenterSummary;
  pollingPersonnels: PollingPersonnelsPagination;
}
export interface GetPollingCenterSummaryProps {
  data: PollingCenterSummary;
  status?: number;
  statusText?: string;
}
