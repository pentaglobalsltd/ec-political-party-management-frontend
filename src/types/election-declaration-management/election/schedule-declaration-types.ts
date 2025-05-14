import { Pagination } from '@api/miscellaneous/types';
import { DocumentServiceType } from '@type/documents/document-service-type';

export interface GetElectionDetailsList {
  id?: number;
  electionScheduleId?: number;
  electionTypeId?: string;
  name?: string;
  nameEn?: string;
  nameBn?: string;
  dateOfDeclaration?: string;
  dateOfNominationSubmission?: string;
  dateOfNominationSelectionStart?: string;
  dateOfNominationSelectionEnd?: string;
  dateOfAppealSubmission?: string;
  dateOfAppealJudgement?: string;
  dateOfNominationWithdrawal?: string;
  dateOfAssignedSymbol?: string;
  dateOfElection?: string;
  dateOfGazette?: string;
  voteCastingStartTime?: string;
  voteCastingEndTime?: string;
  isOnlineNomination?: boolean;
  fileOfSchedule?: DocumentServiceType;
  fileOfOthers?: DocumentServiceType;
  scheduleComment?: string;
  minimumAge?: number;
  dateOfAgeComparedFrom?: string;
  totalRegion?: number;
  totalDistrict?: number;
  totalPollingCenter?: number;
  totalPollingBooth?: number;
  totalSeat?: number;
  totalReturningOfficer?: number;
  totalAssistantReturningOfficer?: number;
  totalPollingOfficer?: number;
  isByElection?: boolean;
  seatVacancyDate?: string;
  byElectionReasons?: string;
  byElectionComments?: string;
  isElectionClosed?: boolean;
  estimatedFirstMeetingDate?: string;
  isActive?: boolean;
}

export interface GetElectionDetailsListPagination extends Pagination {
  electionSchedules: GetElectionDetailsList[];
}

export interface GetElectionDetailsListProps {
  data: GetElectionDetailsListPagination;
  status?: number;
  statusText?: string;
}

export interface DeleteElectionScheduleResponse {
  data?: any;
  status?: number;
  statusText?: string;
}
