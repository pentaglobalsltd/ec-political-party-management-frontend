export interface TimeBasedResultQueryParams {
  zillaId: number;
  candidateTypeId?: number;
  municipalityId?: number;
  upazilaId?: number;
  constituencyId?: number;
  unionOrWardId?: number;
}

export interface TimeBasedResultListParams {
  electionScheduleId: number;
  electionSettingsId: number;
  page?: number;
  size?: number;
}

export interface TimeBasedResult {
  id: number;
  centerSerial?: number;
  centerNameBn?: string;
  zillaNameBn?: string;
  upazilaNameBn?: string;
  unionOrWardNameBn?: string;
  resultSubmitTime: string;
  resultPublishTime: string;
}

export interface TimeBasedResultList {
  page?: number;
  size?: number;
  total?: number;
  results?: TimeBasedResult[];
}

export interface TimeBasedResultListResponse {
  data?: TimeBasedResultList;
  status?: number;
  statusText?: string;
}
