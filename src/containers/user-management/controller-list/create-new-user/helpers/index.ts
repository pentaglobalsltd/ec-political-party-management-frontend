import { USER_ROLE_TYPE } from '../../constants';
import {
  createOrEditOperatorUser,
  createOrEditReturningOfficer,
  createOrEditAssistantReturningOfficer,
  createOrEditPresidingOfficer,
  createOrEditAroOp,
} from './election-user-types';
import { createOrEditAdmin } from './system-user-types/admin-create-edit/admin';
import { createOrEditRegionalElectionOfficer } from './system-user-types/regional-election-officer /regional-election-officer';
import { createOrEditUpazilaThanaElectionOfficer } from './system-user-types/upazila-thana-election-officer/upazila-thana-election-officer';
import { createOrEditZillaElectionOfficer } from './system-user-types/zilla-election-officer/zilla-election-officer';

export interface SubmitMapperType {
  data: any;
  userId?: string | number;
  params: any;
  language: any;
  constituencyFromContext: any;
  electionSettingsFromContext: any;
  userProfileCreateData: (data: any) => void;
  updateUserProfileById: ({ userId, data }: any) => void;
}

export const mapSubmitSystemUserForm = (args: SubmitMapperType) => {
  const { data } = args;

  if (data.electionScheduleId) {
    data.electionScheduleId = parseInt(data.electionScheduleId);
  }
  if (data.electionTypeId) {
    data.electionTypeId = parseInt(data.electionTypeId);
  }
  if (data.regionId) {
    data.regionId = parseInt(data.regionId);
  }
  if (data.zillaId) {
    data.zillaId = parseInt(data.zillaId);
  }
  if (data.municipalityId) {
    data.municipalityId = parseInt(data.municipalityId);
  }

  switch (data.userTypeCode) {
    case USER_ROLE_TYPE.DATA_ENTRY_OFFICER:
      createOrEditOperatorUser(args);
      break;

    case USER_ROLE_TYPE.RETURNING_OFFICER:
      createOrEditReturningOfficer(args);
      break;

    case USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER:
      createOrEditAssistantReturningOfficer(args);
      break;

    case USER_ROLE_TYPE.PRESIDING_OFFICER:
      createOrEditPresidingOfficer(args);
      break;

    case USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR:
      createOrEditAroOp(args);
      break;

    //system users

    case USER_ROLE_TYPE.ADMIN:
      createOrEditAdmin(args);
      break;

    case USER_ROLE_TYPE.UPAZILA_THANA_ELECTION_OFFICER:
      createOrEditUpazilaThanaElectionOfficer(args);
      break;

    case USER_ROLE_TYPE.ZILLA_ELECTION_OFFICER:
      createOrEditZillaElectionOfficer(args);
      break;

    case USER_ROLE_TYPE.REGIONAL_ELECTION_OFFICER:
      createOrEditRegionalElectionOfficer(args);
      break;

    default:
      break;
  }
};
