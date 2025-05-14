import { ELECTION } from './election';
import { MAIN_LIST } from './main-list';

export const ELECTION_SCHEDULE_MANAGEMENT = {
  //Election
  ELECTION,

  //Election Process
  ELECTION_PROCESS: {
    ADD_SCHEDULE_INFO: {
      ELECTION_TYPE: 'addScheduleInfoElectionType',
      ELECTION_NAME: 'addScheduleInfoElectionName',
      CANDIDATE_TYPE: 'addScheduleInfoCandidateType',
      DISTRICT: 'addScheduleInfoDistrict',
      SEAT: 'addScheduleInfoSeat',
      REARRANGE_SEAT: 'addScheduleInfoRearrangeSeat',
      CASE: 'addScheduleInfoCase',
    },
  },

  //Main List
  MAIN_LIST,

  //Others
  OTHERS: {
    ELECTION_TYPE: {
      ELECTION_TYPE_BN: 'nameBn',
      ELECTION_TYPE_EN: 'nameEn',
    },
    INSTITUTION_BUILDING_TYPE: {
      BUILDING_ID: 'id',
      BUILDING_CATEGORY_BN: 'nameBn',
      BUILDING_CATEGORY_EN: 'nameEn',
    },
    INSTITUTE_TYPE: {
      CREATE_INSTITUTE_TYPE: {
        INSTITUTE_TYPE_ID: 'id',
        INSTITUTE_TYPE_EN: 'nameEn',
        INSTITUTE_TYPE_BN: 'nameBn',
      },
    },
  },

  CREATE_ELECTION_INFO: {
    ELECTION_DATE: 'nextDateOfElection',
    RESULT_GAZETTE_DATE: 'gazettePublishDate',
    RESULT_GAZETTE_FILE: 'gazettePublishFile',
    SWEAR_DATE: 'swearDate',
    SWEAR_FILE: 'swearFile',
    FIRST_MEETING_DATE: 'firstMeetingDate',
    FIRST_MEETING_FILE: 'firstMeetingFile',
    LATEST_CASE_DETAIL: 'caseLastInfo',
    LATEST_CASE_FILE: 'caseLastInfoFile',
    ELECTORAL_AREA_REORGANIZED: 'electionAreaReorganized',
    NEXT_ELECTION_DATE: 'nextDateOfElection',
    NEXT_GENERAL_ELECTION_DATE: 'nextDateOfReElection',
  },
};
