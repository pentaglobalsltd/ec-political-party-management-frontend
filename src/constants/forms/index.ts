import { CANDIDATE_INFO_MANAGEMENT } from './candidate-info-management/candidate-info-management';
import { CENTER_OFFICER_MANAGEMENT } from './center-officer-management/center-officer-management';
import { ELECTION_SCHEDULE_MANAGEMENT } from './election-schedule-management';
import { USER_MANAGEMENT } from './user-management';
import { VOTE_CENTER_MANAGEMENT } from './vote-center-management/vote-center-management';
import { RESULT_MANAGEMENT } from './result-management/result-management';

export const FORM_FIELDS = {
  SIGN_IN: {
    USERNAME: 'username',
    PASSWORD: 'password',
  },

  RESET_PASSWORD: {
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
  },

  SEARCH_FIELD: 'searchField',

  APPLICATION_SEARCH: {
    ELECTION_TYPE: 'electionTypeId',
    ELECTION_SCHEDULE: 'electionScheduleId',
    CANDIDATE_TYPE: 'candidateTypeId',
    DIVISION: 'regionId',
    DISTRICT: 'zillaId',
    SUB_DISTRICT: 'upazilaId',
    CONSTITUENCY: 'constituencyId',
    UNION_WARD: 'unionWardId',
    STATUS: 'nominationStatusCodes',
    REARRANGE_SEAT: 'electionAreaReorganized',
    CASE: 'isCaseAvailable',
    RMO: 'rmoEn',
    CITY_CORPORATION: 'cityCorporation',
    UNION_OR_WARD: 'unionOrWardId',
    UNION_OR_WARDS: 'unionOrWardIds',
    MUNICIPALITY: 'municipalityId',
    INSTITUTE_NAME: 'agencyId',
    USER: 'userTypeCode',
    USER_ID: 'userId',
    LOG_TYPE: 'logType',
    DATE_FROM: 'fromDate',
    DATE_TO: 'toDate',
    YEAR: 'year',
    MONTH: 'month',
    RESULT_STATUS: 'status',
    RESULT_TYPE: 'resultType',
    ELECTION_MEAN: 'electionMean',
    RESULT_MEAN: 'resultMean',
    CENTER_NAME: 'centerName',
    ELECTION_MEDIUM: 'electionMedium',
    MESSAGE_SEND_LIST_STATUS: 'messageSendStatus',
    UPAZILA_THANA: 'upazilaThanaId',
    POLLING_CENTER: 'pollingCenterId',
    CENTER_TYPE: 'voterType',
    ELECTION_SETTINGS_IDS: 'electionSettingsIds',
    ELECTION_SETTINGS_ID: 'electionSettingsId',
    DISTRICT_BY_ELECTION_SETTINGS: 'districtElectionSettings',
    MUNICIPALITY_BY_ELECTION_SETTINGS: 'municipalityElectionSettings',
    UNION_BY_ELECTION_SETTINGS: 'unionElectionSettings',
    UPAZILA_BY_ELECTION_SETTINGS: 'upazilaElectionSettings',
    ELECTION_CONSTITUENCY_BY_ELECTION_SETTINGS:
      'electionConstituencyElectionSettings',
    ELECTION_SETTINGS_DEPENDENCY: 'electonSettingsDependency',
    DISTRIBUTED_OFFICER: 'isPersonnelExists',
    IS_ACTIVE: 'isActive',
    AGENCY_TYPE_IDS: 'agencyTypeIds',
    STATUS_ID: 'statusId',
    TRAINING_DATE_AND_TIME: 'trainingDateTime',
    TRAINING_PLACE: 'trainingPlace',
    TRAINING_ROOM: 'trainingRoom',
    GOODS_RECEIVED_DATE_AND_TIME: 'goodsReceiptDateTime',
    GOODS_DISTRIBUTION_DATE_AND_TIME: 'goodsDistributionDateTime',
    NAME: 'name',
    DESIGNATION: 'designation',
    DATE_OF_ELECTION: 'dateOfElection',
  },
  CENTER_OFFICER_MANAGEMENT_SEARCH: {
    REGION: 'regionId',
    DISTRICT: 'zillaId',
    CONSTITUENCY: 'constituencyId',
    SUBDISTRICT: 'upazilaId',
    SETTINGS_SPECIFIC_SUBDISTRICT: 'upazilaId',
    RMO: 'rmoEn',
    MUNICIPALITY: 'municipalityId',
    SETTINGS_SPECIFIC_MUNICIPALITY: 'municipalityId',
    UNION_OR_WARD: 'unionOrWardId',
    ELECTION_TYPE: 'electionTypeId',
    ELECTION_SCHEDULE: 'electionScheduleId',
    ELECTION_SCHEDULE_DISTRICT: 'zillaId',
    POLLING_CENTER: 'pollingCenterId',
    INSTITUTION_NAME: 'agencyId',
    DESIGNATION: 'userTypeCode',
    STATUS: 'status',
  },
  POLLING_PERSONNEL_LETTER_SEARCH: {
    CONSTITUENCY: 'constituencyId',
    SUBDISTRICT: 'upazilaId',
    SETTINGS_SPECIFIC_SUBDISTRICT: 'upazilaId',
    RMO: 'rmoEn',
    UNION_OR_WARD: 'unionOrWardId',
    ELECTION_TYPE: 'electionTypeId',
    ELECTION_SCHEDULE: 'electionScheduleId',
    ELECTION_SCHEDULE_DISTRICT: 'zillaId',
    POLLING_CENTER: 'pollingCenterId',
    STATUS: 'statusId',
    TRAINING_DATE_AND_TIME: 'trainingDateTime',
    TRAINING_PLACE: 'trainingPlace',
    TRAINING_ROOM: 'trainingRoom',
    GOODS_RECEIVED_DATE_AND_TIME: 'goodsReceiptDateTime',
    GOODS_DISTRIBUTION_DATE_AND_TIME: 'goodsDistributionDateTime',
    NAME: 'name',
    DESIGNATION: 'designation',
  },
  APPLICATION_SEARCH_REPORT: {
    ELECTION_TYPE: 'electionTypeId',
    ELECTION_NAME: 'electionScheduleId',
    CANDIDATE_TYPE: 'candidateTypeId',
    DISTRICT: 'zillaId',
    CONSTITUENCY: 'constituencyId',
    STATUS: 'nominationStatusCodes',
    UPAZILLA: 'upazilaId',
    UNION: 'unionOrWardIds',
    VOTER_TYPE: 'voterType',
    RESULT_STATUS: 'status',
  },

  MESSAGE_SEND_LIST_SEARCH: {
    ELECTION_TYPE: 'electionTypeId',
    ELECTION_NAME: 'electionScheduleId',
    CANDIDATE_TYPE: 'candidateTypeId',
    DISTRICT: 'zillaId',
    CONSTITUENCY: 'constituencyId',
    MESSAGE_SEND_STATUS: 'messageSendStatus',
  },

  // result management advanced search
  RESULT_SEARCH: {
    ELECTION_TYPE: 'electionTypeId',
    ELECTION_NAME: 'electionScheduleId',
    CANDIDATE_TYPE: 'candidateTypeId',
    DISTRICT: 'zillaId',
    CONSTITUENCY: 'constituencyId',
  },

  /* Election Schedule Management */
  ELECTION_SCHEDULE_MANAGEMENT,

  /* Vote Center Management */
  VOTE_CENTER_MANAGEMENT,

  /* Center Officer Management */
  CENTER_OFFICER_MANAGEMENT,

  /* Candidate Info Management */
  CANDIDATE_INFO_MANAGEMENT,

  /* User Management */
  USER_MANAGEMENT,

  /* Result Management*/
  RESULT_MANAGEMENT,
  RESULT_MANAGEMENT_COMMENT_BY_ARO: {
    COMMENT: 'commentByAro',
  },

  MAIN_LIST_SEARCH: {
    REGION: 'regionId',
    DISTRICT: 'zillaId',
    SUBDISTRICT: 'upazilaId',
    MUNICIPALITY: 'municipalityId',
    UNION_OR_WARD_CODE: 'UnionOrWardCode',
    UNION_OR_WARD_NAME: 'unionOrWardName',
    UNION_OR_WARD: 'unionOrWardId',
    INSTITUTE_NAME: 'agencyId',
    RMO: 'rmo',
    CONSTITUENCY: 'constituencyId',
    VOTER_AREA_CODE: 'areaCode',
  },
};
