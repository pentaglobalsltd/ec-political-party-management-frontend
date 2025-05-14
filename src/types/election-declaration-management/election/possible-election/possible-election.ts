export interface Region {
  id?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface Regions {
  regions?: Region[];
}

export interface RegionsRes {
  data?: Regions;
  status?: number;
  statusText?: string;
}

export interface Rmo {
  id?: number | string;
  nameBn?: string;
  nameEn?: string;
}

export interface Rmos {
  rmos?: Rmo[];
}

export interface RmosRes {
  data?: Rmos;
  status?: number;
  statusText?: string;
}

export interface ElectionCalenderList {
  electionScheduleNameBn?: string;
  candidateTypeNameBn?: string;
  firstMeetingDate?: string;
  nextDateOfElection?: string;
  nextDateOfReElection?: string;
  isCaseAvailable?: false;
  zillaNameBn?: string;
  upazilaNameBn?: string;
  constituencyNameBn?: string;
  municipalityNameBn?: string;
  unionOrWardNameBn?: string;
}

export interface ElectionCalenderEventSettings {
  tingsName?: string;
  settingsName?: string;
  candidateTypeNameBn?: string;
  firstMeetingDate?: string;
  nextDateOfElection?: string;
  nextDateOfReElection?: string;
  isCaseAvailable?: boolean;
  zillaNameBn?: string;
  upazilaNameBn?: string;
  constituencyNameBn?: string;
  municipalityNameBn?: string;
  unionOrWardNameBn?: string;
}
export interface ElectionCalenderEventDetails {
  declarationDate?: string;
  nominationSubmissionDate?: string;
  nominationSelectionStartDate?: string;
  nominationSelectionEndDate?: string;
  appealSubmissionDate?: string;
  appealJudgementDate?: string;
  nominationWithdrawalDate?: string;
  symbolAssignationDate?: string;
  voteCastingStartTime?: string;
  voteCastingEndTime?: string;
  electionDate?: string;
  gazetteDate?: string;
  settings?: ElectionCalenderEventSettings[];
}
export interface ElectionCalenderEvent {
  eventName?: string;
  label?: string;
  date?: string;
  eventDate?: string;
  eventType?: string;
  eventDetails?: ElectionCalenderEventDetails;
}

export interface ElectionCalenderListPagination {
  page?: number;
  size?: number;
  total?: number;
  electionDetails?: ElectionCalenderList[];
}
export interface ElectionCalenderEventsPagination {
  page?: number;
  size?: number;
  total?: number;
  events: ElectionCalenderEvent[];
}
export interface ElectionCalenderListRes {
  data?: ElectionCalenderListPagination;
  status?: number;
  statusText?: string;
}
export interface ElectionCalenderEventsRes {
  data?: ElectionCalenderEventsPagination;
  status?: number;
  statusText?: string;
}
export interface ElectionCalenderParams {
  page?: number;
  size?: number;
  electionTypeId?: string | number;
  candidateTypeId?: string | number;
  regionId?: string | number;
  zillaId?: string | number;
  upazilaId?: string | number;
  unionOrWardId?: string | number;
  year?: string;
  month?: string;
  fromDate?: string;
  toDate?: string;
  isYearlyEvents?: boolean;
  isMonthlyEvents?: boolean;
}
