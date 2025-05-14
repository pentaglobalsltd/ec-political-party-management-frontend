export interface ElectionSchedulesConstituencies {
  id?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface ElectionSchedulesConstituencies {
  constituencies?: ElectionSchedulesConstituencies[];
}

export interface ElectionSchedulesConstituenciesRes {
  data?: ElectionSchedulesConstituencies;
  status?: number;
  statusText?: string;
}
