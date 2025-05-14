export interface MessageSendingListParams {
  page?: number;
  size?: number;
  scheduleId: string | number;
  electionSettingsId: string | number;
  sheetStatus?: string;
}

export interface MessageSendingType {
  id: number;
  electionScheduleId?: number;
  electionSettingsId?: number;
  electionTypeId?: number;
  candidateTypeId?: number;
  constituencyId?: number;
  regionId?: number;
  zillaId?: number;
  upazilaId?: number;
  municipalityId?: number;
  unionOrWardId?: number;
  unionWardId?: number;
  rmo?: string;
  sheetSerial?: number;
  regionNameBn?: string;
  zillaNameBn?: string;
  upazilaNameBn?: string;
  municipalityNameBn?: string;
  constituencyNameBn?: string;
  unionOrWardNameBn?: string;
  unionWardNameBn?: string;
  electionScheduleNameBn?: string;
  electionTypeNameBn?: string;
  candidateTypeNameBn?: string;
  file?: FileType;
  finalFile?: FileType;
  sheetStatus?: string;
  totalCenterCount?: number;
  totalVoterCount?: number;
  totalResultApprovedCenterCount?: number;
  totalLegalVoteCount?: number;
  totalIllegalVoteCount?: number;
  totalCancelledCenterCount?: number;
  totalCancelledCenterVoterCount?: number;
  generatedBy?: string;
  generatedAt?: string;
  generatedByUserLoginId?: string;
  publishedBy?: string;
  publishedByUserLoginId?: string;
  publishedAt?: string;
  isActive?: true;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  bartaSheetCandidateVoteCounts?: {
    id?: number;
    candidateElectionDetailsId?: number;
    totalVoteCount?: number;
    bartaSheetsId?: number;
    candidateName?: string;
    politicalPartyName?: string;
    symbolName?: string;
    candidateSerialNo?: number;
  }[];
  bartaSheetPollingCenterResults?: {
    id?: number;
    pollingCenterId?: number;
    pollingCenterNameBn?: string;
    pollingCenterSerial?: number;
    bartaSheetsId?: number;
  }[];
}

export interface FileType {
  documentId: string;
  fileId?: string;
  filename?: string;
  fileType?: string;
}

export interface MessageSendingListType {
  page?: number;
  size?: number;
  total?: number;
  bartaSheets?: MessageSendingType[];
}

export interface MessageSendingListResponse {
  data: MessageSendingListType;
  status: number;
  statusText: string;
}
