import { Pagination } from '@api/miscellaneous/types';

export interface PollingPersonnelLetterTypes {
  id?: number;
  instituteNameEn?: string;
  instituteNameBn?: string;
  totalBooth?: number;
  presidingOfficerAssignedNumber?: number;
  inchargePresidingOfficerAssignedNumber?: number;
  assistantPresidingOfficerAssignedNumber?: number;
  pollingOfficerAssignedNumber?: number;
}

export interface PollingPersonnelLetterSummaryProps extends Pagination {
  pollingCenterSummaries: PollingPersonnelLetterTypes[];
}

export interface GetPollingPersonnelLetterSummaryProps {
  data: PollingPersonnelLetterSummaryProps;
  status?: number;
  statusText?: string;
}
