export interface DraftResultType {
  id?: number | string;
  totalPollingCenters?: number;
  candidateName?: string;
  receivedVote?: number;
  totalIllegalVote?: number;
  attendancePercentage?: number;
}

export interface DraftResultListType {
  page?: number;
  size?: number;
  total?: number;
  draftResults?: DraftResultType[];
}

export interface DraftResultResponse {
  data?: DraftResultListType;
  status?: number;
  statusText?: string;
}
