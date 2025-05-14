export interface ElectionSchedules {
  electionTypeId?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface ElectionSchedule {
  electionSchedules?: ElectionSchedules[];
}

export interface ElectionSchedulesRes {
  data?: ElectionSchedule;
  status?: number;
  statusText?: string;
}
