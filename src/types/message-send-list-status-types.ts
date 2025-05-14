export interface MessageSendStatusType {
  sheetStatus: string;
  message: string;
}

export interface MessageSendListStatusType {
  page?: number;
  size?: number;
  total?: number;
  statuses?: MessageSendStatusType[];
}

export interface MessageSendListStatusResponseType {
  data?: MessageSendListStatusType;
  status?: number;
  statusText?: string;
}
