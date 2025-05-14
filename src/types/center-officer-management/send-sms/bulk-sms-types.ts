export interface BulkSMSRes {
  value?: number;
  textValue?: string;
}

export interface BulkSMSResType {
  data: BulkSMSRes;
  status?: number;
  statusText?: string;
}
