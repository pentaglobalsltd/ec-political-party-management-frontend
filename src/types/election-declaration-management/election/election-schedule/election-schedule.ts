export interface ElectionScheduleType {
  id?: number;
  electionTypeId?: number | string;
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
  isOnlineNomination?: string | boolean;
  fileOfSchedule?: any;
  fileOfOthers?: any;
  scheduleComment?: any;
  minimumAge?: number | string;
  dateOfAgeComparedFrom?: string;
  totalRegion?: number | string;
  totalDistrict?: number | string;
  totalPollingCenter?: number | string;
  totalPollingBooth?: number | string;
  totalSeat?: number | string;
  totalReturningOfficer?: number | string;
  totalAssistantReturningOfficer?: number | string;
  totalPresidingOfficer?: number | string;
  totalAssistantPresidingOfficer?: number | string;
  totalPollingOfficer?: number | string;
  isByElection?: boolean;
  parentElectionScheduleIds?: number[];
  seatVacancyDate?: string;
  parentElectionSchedules?: any[];
  byElectionReasons?: string;
  byElectionComments?: string;
  isElectionClosed?: boolean;
  estimatedFirstMeetingDate?: string;
  isActive?: string | boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetElectionScheduleResponse {
  data?: ElectionScheduleType;
  status?: number;
  statusText?: string;
}
