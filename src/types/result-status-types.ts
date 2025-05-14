export interface ResultStatusType {
  status?: string;
  message?: string;
}

export interface ResultStatusListType {
  statuses?: ResultStatusType[];
}

export interface ResultStatusListTypeResponse {
  data?: ResultStatusListType;
  status?: number;
  statusText?: string;
}
