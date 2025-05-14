import { FileType } from '@type/result-management/electoral-process/message-sending-list/message-sending-list-type';

export interface BartaSheetCandidateVoteCountsType {
  id?: number | string;
  idx?: number | string;
  candidateElectionDetailsId?: number | string;
  totalVoteCount?: number | string;
  challengedLegalVoteCount?: number | string;
  totalLegalVoteCount?: number | string;
  bartaSheetsId?: number | string;
  candidateName?: string;
  politicalPartyName?: string;
  symbolName?: string;
  candidateSerialNo?: number | string;
}

interface BartaSheetPollingCenterResultsType {
  id?: number | string;
  idx?: number | string;
  pollingCenterId?: number | string;
  pollingCenterResultsId?: number | string;
  pollingCenterNameBn?: string;
  pollingCenterSerial?: number | string;
  bartaSheetsId?: number | string;
}

export interface LatestResultsType {
  id?: number | string;
  idx?: number | string;
  electionScheduleId?: number | string;
  electionSettingsId?: number | string;
  electionTypeId?: number | string;
  candidateTypeId?: number | string;
  constituencyId?: number | string;
  regionId?: number | string;
  zillaId?: number | string;
  upazilaId?: number | string;
  municipalityId?: number | string;
  unionOrWardId?: number | string;
  unionWardId?: number | string;
  reservedWardId?: number | string;
  municipalityWardId?: number | string;
  rmo?: number | string;
  sheetSerial?: number | string;
  regionNameBn?: string;
  zillaNameBn?: string;
  upazilaNameBn?: string;
  municipalityNameBn?: string;
  constituencyNameBn?: string;
  unionOrWardNameBn?: string;
  unionWardNameBn?: string;
  reservedWardNameBn?: string;
  electionScheduleNameBn?: string;
  electionSettingsNameBn?: string;
  electionTypeNameBn?: string;
  candidateTypeNameBn?: string;
  file?: FileType;
  finalFile?: FileType;
  sheetStatus?: string;
  totalCenterCount?: number | string;
  totalVoterCount?: number | string;
  totalResultApprovedCenterCount?: number | string;
  totalLegalVoteCount?: number | string;
  totalIllegalVoteCount?: number | string;
  totalAbsentVoteCount?: number | string;
  totalCancelledCenterCount?: number | string;
  totalCancelledCenterVoterCount?: number | string;
  generatedBy?: string;
  generatedAt?: string;
  generatedByUserLoginId?: string;
  publishedBy?: string;
  publishedByUserLoginId?: number | string;
  publishedAt?: string;
  isActive?: boolean;
  isPublishedToUserApp?: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  bartaSheetCandidateVoteCounts?: BartaSheetCandidateVoteCountsType[];
  bartaSheetPollingCenterResults?: BartaSheetPollingCenterResultsType[];
}

export interface LatestResultsResponseType {
  data?: LatestResultsType[];
  status?: number;
  statusText?: string;
}

export interface LatestResultsPathParams {
  electionScheduleId: string | number;
  electionSettingsId?: string | number;
  candidateTypeId?: string | number;
}
