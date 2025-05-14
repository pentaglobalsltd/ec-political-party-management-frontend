export interface PollingInstitutesType {
  id: number | string;
  regionId?: number | string;
  zillaId?: number | string;
  upazilaId?: number | string;
  municipalityId?: number | string;
  instituteTypeId?: number | string;
  buildingTypeId?: number | string;
  unionOrWardId?: number | string;
  zilla?: {
    zillaId?: number | string;
    nameEn?: string;
    nameBn?: string;
  };
  upazila?: {
    upazilaId?: number | string;
    nameEn?: string;
    nameBn?: string;
    code?: string;
  };
  unionOrWard?: {
    unionOrWardId?: number | string;
    nameEn?: string;
    nameBn?: string;
    code?: string;
  };
  nameEn?: string;
  nameBn?: string;

  addressBn?: string;
  addressEn?: string;

  headName?: string; // why it's not like -> headNameBn, headNameEn ??

  headContactNo?: string;
  noOfEmployee?: number | string;
  noOfFloor?: number | string;
  noOfRoom?: number | string;
  hasElectricity?: boolean;
  hasWater?: boolean;
  hasToilet?: boolean;
  hasBoundary?: boolean;
  surroundings?: string;
  distanceFromCenter?: string;
  waysToReach?: string;
  isSensitive?: boolean;
  hasSufficientSunshine?: boolean;
  hasOpenSpace?: boolean;
  isFloodAffectedArea?: boolean;
  comments?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  lat?: string | number;
}

export interface PollingInstitutesTypeRes {
  data?: {
    page?: number;
    size?: number;
    total?: number;
    pollingInstitute?: PollingInstitutesType[];
  };
  status?: number;
}
