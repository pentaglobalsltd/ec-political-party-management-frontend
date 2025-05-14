import { FileType } from '@type/candidate-info-management/nomination-list-type';

export interface TotalTypes {
  candidateTypeId?: number;
  candidateTypeNameBn?: string;
  count?: number;
}
export interface ResultObservationTypes {
  totalPollingCenterCount?: number;
  totalCancelledPollingCenterCount?: number;
  totalSubmittedPollingCenterResultCount?: TotalTypes[];
  totalApprovedPollingCenterResultCount?: TotalTypes[];
  totalCreatedBartaSheetCount?: TotalTypes[];
  totalApprovedBartaSheetCount?: TotalTypes[];
  totalFinalizedBartaSheetCount?: TotalTypes[];
}

export interface ResultObservationModifiedTypes {
  id?: string | number;
  label?: string;
  description?: any;
  value?: any;
}

export interface CenterBasedResultHistoryPropsTypes {
  page?: number | string;
  size?: number;
  scheduleId: string | number;
  resultId: string | number;
}

export interface PollingCenterResultLogs {
  id: number;
  pollingCenterResultId?: number;
  pollingCenterId?: number;
  electionSettingsId?: number;
  candidateTypeId?: number;
  totalLegalVoteCount?: number;
  totalIllegalVoteCount?: number;
  totalAbsentVoteCount?: number;
  status?: string;
  fileFromOp?: FileType;
  commentByARO?: string;
  submittedBy?: string;
  approvedBy?: string;
  submittedAt?: string;
  approvedAt?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
