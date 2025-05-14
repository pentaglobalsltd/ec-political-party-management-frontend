export interface PoliticalPartyType {
  id?: number;
  nameEn?: string;
  nameBn?: string;
  address?: string;
  regNo?: number;
  symbolId?: number;
  symbolNameBn?: string;
  symbolNameEn?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PoliticalPartiesType {
  page?: number;
  size?: number;
  total?: number;
  politicalParties: PoliticalPartyType[];
}
export interface PoliticalPartiesResProp {
  data: PoliticalPartiesType;
  status?: number;
  statusText?: string;
}
