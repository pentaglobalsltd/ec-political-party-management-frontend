export interface ElectionSearchProps {
  electionTypeId?: number;
  electionScheduleId?: number;
}

export interface CenterOfficerManagementSearchProps {
  electionTypeId?: string | number;
  regionId?: string | number;
  zillaId?: string | number;
  upazilaId?: string | number;
  municipalityId?: string | number;
  rmoEn?: string;
  unionOrWardId?: string | number;
  unionOrWardIds?: string | number;
  pollingCenterId?: string | number;
  agencyId?: string | number;
  userTypeCode?: string;
  electionScheduleId?: string | number;
  statusId?: string | number;
  pollingCenterIds?: string | number;
  trainingDateTime?: string;
  trainingPlace?: string;
  goodsReceiptDateTime?: string;
  goodsDistributionDateTime?: string;
  name?: string;
  designation?: string;
  trainingRoom?: string;
  isActive?: boolean;
  nameBn?: string;
  agencyTypeIds?: number[];
}
export interface VoterAreaSearchProps {
  zillaId?: string | number;
  upazilaId?: string | number;
  municipalityId?: string | number;
  unionOrWardId?: string | number;
  areaCode?: string;
  nameBn?: string;
  isBulkEdit?: string | boolean;
}

export interface VoterAreaCodeValidateProps {
  zillaId?: string | number;
  areaCode?: string | number;
}
