export interface MunicipalityBySchedulesZillasSelectOptionsType {
  label: string;
  value: number;
}

export interface MunicipalityBySchedulesZillasType {
  id?: number;
  municipalityCode?: number;
  rmoBn?: string;
  rmoEn?: string;
  nameEn?: string;
  nameBn?: string;
}

export interface MunicipalitiesBySchedulesZillasType {
  data?: {
    page?: number;
    size?: number;
    total?: number;
    municipalities?: MunicipalityBySchedulesZillasType[];
  };
  status?: number;
  statusText?: string;
}

export interface MunicipalitiesBySchedulesZillasTypeResType {
  data?: MunicipalitiesBySchedulesZillasType;
}
