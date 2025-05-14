export interface PollingPersonnelAllocate {
  pollingCenterId?: number;
  pollingPersonnelId?: number;
  numberOfBooth?: number;
  userTypeCode?: string;
  isIncharge?: boolean;
}

export interface CreatePollingPersonnelAllocate {
  data: PollingPersonnelAllocate;
  status?: number;
  statusText?: string;
}
export interface DeletePollingPersonnelAllocate {
  data?: any;
  status?: number;
  statusText?: string;
}
