import { ElectionSchedules } from '@type/election-schedule/election-schedules-types';

interface NameBnEn {
  id: number | string;
  nameEn?: string;
  nameBn?: string;
}

export interface PotentialPollingInstituteType {
  id: number | string;
  instituteName?: string;
  nameEn?: string;
  nameBn?: string;
  electionSchedule?: NameBnEn;
  zilla?: NameBnEn;
  upazila?: NameBnEn;
  unionOrWard?: NameBnEn;
  headName?: string;
  headContactNo?: string;
  noOfEmployee?: number | string;
  noOfFloor?: number | string;
  noOfRoom?: number | string;
  hasToilet?: boolean;
  surroundings?: string;
  distanceFromCenter?: number | string;
  waysToReach?: string;
  comments?: string;
}

export interface PotentialPollingCenterType {
  serial?: number | string | null;
  electionTypeId?: number | null;
  centerInstituteNameBn?: string | null;
  centerInstituteNameEn?: string | null;
  descriptionBn?: string | null;
  descriptionEn?: string | null;
  voterType?: number | string | null;
  addressBn?: string;
  addressEn?: string;
  numberOfBooth?: string | null;
  numberOfTemporaryBooth?: string | null;
  isTemporary?: string | boolean | null;
  isTabCenter?: string | boolean | null;
  isEvmCenter?: string | boolean | null;
  isActive?: boolean | null;
}

export interface PotentialVoterAreasType {
  isSelected?: boolean;
  id: number | string;
  areaCode?: number | string;
  name?: string;
  nameEn?: string;
  nameBn?: string;
  maleVoter?: number | string;
  femaleVoter?: number | string;
  thirdGenderVoter?: number | string;
  maleVoterSerialStart?: number | string | null;
  maleVoterSerialEnd?: number | string | null;
  femaleVoterSerialStart?: number | string | null;
  femaleVoterSerialEnd?: number | string | null;
  thirdGenderVoterSerialStart?: string | number;
  thirdGenderVoterSerialEnd?: string | number;
  voterAreaId?: string | number;
}

export interface PotentialPollingCentersTypeRes {
  data?: {
    pollingInstitute: PotentialPollingInstituteType;
    pollingCenter: PotentialPollingCenterType;
    voterAreas: PotentialVoterAreasType[];
  };
  status?: number;
}

export interface PotentialPollingCentersTypePollingServiceRes {
  data?: {
    pollingInstitute: PotentialPollingInstituteType;
    pollingCenter: PotentialPollingCenterType;
    electionSchedule: ElectionSchedules;
  };
  status?: number;
}
export interface PotentialPollingInstituteTypeRes {
  data?: {
    pollingInstitute: PotentialPollingInstituteType;
    electionSchedule: ElectionSchedules;
  };
  status?: number;
}

export interface VoterAreasTypeRes {
  data?: {
    voterAreas: PotentialVoterAreasType[];
  };
  status?: number;
}
