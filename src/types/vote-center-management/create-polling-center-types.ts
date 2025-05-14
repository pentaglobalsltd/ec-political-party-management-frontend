export interface CreatePollingCenterApi {
  electionSettingsId: number | string;
  unionOrWardId: number | string;
  reqBody: PollingCenterReqBodyType;
}

interface VoterAreaReqBodyType {
  id?: string | number;
  voterAreaId?: string | number;
  areaCode?: string | number;
  electionClass?: string;
  nameEn?: string;
  nameBn?: string;
  maleVoter?: string | number;
  femaleVoter?: string | number;
  thirdGenderVoter?: string | number;
  maleVoterSerialStart?: string | number;
  maleVoterSerialEnd?: string | number;
  femaleVoterSerialStart?: string | number;
  femaleVoterSerialEnd?: string | number;
  thirdGenderVoterSerialStart?: string | number;
  thirdGenderVoterSerialEnd?: string | number;
}

export interface PollingCenterReqBodyType {
  id?: string | number;
  electionSettingId?: string | number;
  unionOrWardId?: string | number;
  unionWardId?: string | number;
  serial?: string | number;
  instituteNameEn?: string;
  instituteNameBn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  voterType?: string;
  numberOfBooth?: string | number;
  numberOfTemporaryBooth?: string | number;
  isTemporary?: boolean;
  isTabCenter?: boolean;
  isEvmCenter?: boolean;
  pollingInstituteId?: string | number;
  isActive?: boolean;
  voterAreas?: VoterAreaReqBodyType[];
}

export interface PollingCenterResBodyType {
  data: PollingCenterReqBodyType;
  status: number;
}
