export interface StatusType {
  nameBn?: string;
  nameEn?: string;
}

export interface StatusesType {
  statuses?: StatusType[];
}

export interface StatusesTypeRes {
  data?: StatusesType;
  status?: number;
  statusText?: string;
}
