export interface ElectionSchedulesSubDistrict {
    id?: number | string;
    nameBn?: string;
    nameEn?: string;
    zillaId?: number | string;
    upazilaCode?: number | string;
  }
  
  export interface ElectionSchedulesSubDistricts {
    zillas?: ElectionSchedulesSubDistrict[];
  }
  
  export interface ElectionSchedulesSubDistrictsRes {
    data?: ElectionSchedulesSubDistricts;
    status?: number;
    statusText?: string;
  }
  