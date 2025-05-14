export interface MunicipalityType {
  id: number | string;
  municipalityCode?: number;
  zillaId?: number;
  zillaNameBn?: string;
  zillaNameEn?: string;
  rmoEn?: string;
  rmoBn?: string;
  nameEn?: string;
  nameBn?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMunicipalityType {
  municipalityCode?: number;
  zillaId?: number;
  rmoEn?: string;
  nameBn?: string;
  nameEn?: string;
  upazilaIds?: number[];
}

export interface MunicipalitiesFilter {
  districtId?: number | string;
  rmoEn?: string;
  page?: number;
  size?: number;
  regionId?: number | string;
  municipalityIds?: string;
}
