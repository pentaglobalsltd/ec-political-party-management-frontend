export interface ZillaType {
  id: number;
  zillaCode?: number;
  regionId?: number;
  regionNameBn?: string;
  regionNameEn?: string;
  serialNo?: number;
  nameEn?: string;
  nameBn?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateZillaType {
  zillaCode?: number;
  regionId?: number;
  nameEn?: string;
  nameBn?: string;
}
