export interface ElectionSchedulesZilla {
  id?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface ElectionSchedulesZillas {
  zillas?: ElectionSchedulesZilla[];
}

export interface ElectionSchedulesZillasRes {
  data?: ElectionSchedulesZillas;
  status?: number;
  statusText?: string;
}
