import { Pagination } from '@api/miscellaneous/types';

export interface UserProfiles {
  id?: number;
  userId?: string;
  name?: string;
  nameBn?: string;
  nameEn?: string;
  userTypeCode?: string;
  email?: string;
  affiliation?: string;
  password?: string;
  loginId?: string;
  isActive?: boolean;
  electionScheduleId?: number;
  electionSettingsIds?: number[];
  pollingCenterIds?: number[] | number;
  electionTypeId?: number;
  regionId?: number;
  zillaId?: number;
  upazilaId?: number[] | number;
  upazilaIds?: number[] | number;
  unionOrWardId?: number[] | number;
  unionOrWardIds?: number[];
  agencyId?: number;
  reeditNomination?: boolean;
  municipalityIds?: number;
  electionSettingsForMunicipalityExists?: boolean;
}
export interface ResetPasswordTypes {
  password?: string;
}
export interface ResetPasswordPropTypes {
  data: ResetPasswordTypes;
  status?: number;
}
export interface UserProfilesPaginated extends Pagination {
  userProfiles: UserProfiles[];
}

export interface GetUserProfiles {
  data: UserProfilesPaginated;
  status?: number;
  statusText?: string;
}

export interface CreateUserProfilesTypes {
  data?: UserProfiles;
  status?: number;
  statusText?: string;
}
export interface BulkUserProfiles {
  userTypeCode?: string;
  electionScheduleId?: number | string;
  constituencyElectionSettingsId?: string;
  electionSettingsId?: string | number;
  municipalityId?: string | number;
  sortBy?: string;
  sortOrder?: string;
  loginId?: string;
}

export interface UserActivationStatus {
  enabled?: boolean;
}

export interface UserActivationStatusProps {
  data?: UserActivationStatus;
  status?: number;
  statusText?: string;
}

export interface CreateBulkUserProfiles {
  data?: BulkUserProfiles;
  status?: number;
  statusText?: string;
}

export interface ReeditNominationPermission {
  userId: string;
  isActive: boolean;
}
