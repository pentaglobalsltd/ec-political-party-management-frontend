export interface ConstituencyFilter {
  page?: number;
  size?: number;
  constituencyId?: number;
}

export interface ConstituencyType {
  id: number;
  regionId?: number;
  regionNameBn?: string;
  regionNameEn?: string;
  zillaId?: number;
  zillaNameBn?: string;
  zillaNameEn?: string;
  constituencyId?: number;
  constituencyNameBn?: string;
  constituencyNameEn?: string;
  upazilaId?: number;
  upazilaCode?: string;
  upazilaNameBn?: string;
  upazilaNameEn?: string;
  unionOrWardId?: number;
  unionOrWardNameBn?: string;
  unionOrWardNameEn?: string;
}
