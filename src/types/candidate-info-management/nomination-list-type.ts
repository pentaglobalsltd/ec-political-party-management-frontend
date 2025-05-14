import { Pagination } from '@api/miscellaneous/types';

export interface NominationListSearchProps {
  candidateNameOrNid?: string;
  electionTypeId?: number;
  electionScheduleId?: number;
  candidateTypeId?: number;
  zillaId?: number;
  upazilaId?: number;
  municipalityId?: number;
  constituencyId?: number;
  unionsOrWardsId?: number;
  unionOrWardId?: number;
  nominationStatusCodes?: number | number[] | string;
  paymentType?: string;
  isSelfNomination?: boolean;
  isNominationComplete?: boolean;
  isPersonalInfoComplete?: boolean;
  isHolofnamaComplete?: boolean;
  isAttachmentComplete?: boolean;
  isCandidateElectionExpenseComplete?: boolean;
  isAssetIncomeExpenditureComplete?: boolean;
  candidateSerialOrder?: boolean;
  bengaliAlphabetOrder?: boolean;
  electionSettingsId?: number | string;
  userId?: string;
}
export interface NominationListResponseType {
  data: NominationListType;
  status?: number;
  statusText?: string;
}
export interface NominationListType extends Pagination {
  candidateInformation: NominationType[];
  nominations: NominationType[];
}
export interface FileType {
  documentId: string;
  fileId?: string;
  filename?: string;
  fileType?: string;
  filePath?: string;
}
export interface IndividualCandidateElectionDetails {
  data: NominationType;
  status?: number;
  statusText?: string;
}
export interface NominationType {
  id?: string | number;
  attachmentExists?: boolean;
  isVerified?: boolean;
  isSelected?: boolean;
  supporterSerialNo?: string;
  electionSettingsId?: number;
  candidateElectionDetailsId?: number;
  electionApplicantId?: number;
  tin?: string;
  voterArea?: string;
  candidateName?: string;
  proposerSerialNo?: number;
  proposerVoterNo?: string;
  proposerVoterArea?: string;
  proposerName?: string;
  supporterName?: string;
  supporterVoterNo?: string;
  supporterVoterArea?: string;
  fatherOrHusbandName?: string;
  motherName?: string;
  spouseName?: string;
  nid?: string;
  dob?: string;
  age?: string | number;
  proposerNid?: string;
  supporterNid?: string;
  voterNo?: string;
  serialNo?: string;
  lastUpdatedDate?: string;
  candidateType?: string;
  phone?: string;
  email?: string;
  telephone?: string;
  nominationPercentage?: string;
  personalInfoPercentage?: string;
  holofnamaPercentage?: string;
  presentAddress?: string;
  permanentAddress?: string;
  electionZilla?: string;
  nominationStatusId?: number;
  nominationStatusCode?: number;
  nominationStatus?: string;
  statusComment?: string;
  statusFile?: FileType;
  symbolId?: number;
  symbolFile?: FileType;
  chalanNo?: number;
  chalanDate?: string;
  bankName?: string;
  bankBranchName?: string;
  chalanStatus?: string;
  jamanatAmount?: number | string;
  paymentType?: string;
  chalanZilla?: string;
  chalanRegion?: string;
  chalanFile?: FileType;
  voterListFile?: FileType;
  constituency?: string;
  electionType?: string;
  electionTypeId?: number | string;
  electionScheduleId?: string | number;
  politicalParty?: string;
  candidateVoterNoCorrect?: boolean;
  proposerVoterNoCorrect?: boolean;
  supporterVoterNoCorrect?: boolean;
  isCandidateAgeCorrect?: boolean;
  candidateTypeId?: string;
  finalSubmissionDate?: string;
  formSerialNo?: string;
  isSelfNomination?: boolean;
  candidateNameEn?: string;
  fatherNameEn?: string;
  motherNameEn?: string;
}
export interface NominationStatusCountType {
  supporterSerialNo?: string;
  id?: number;
  electionScheduleId?: number;
  politicalParty?: string;
  onlineDraft?: number;
  onlineSubmission?: number;
  draft?: number;
  receiptAcknowledgement?: number;
  acceptance?: number | string;
  selectionCancellation?: number | string;
  candidateConfirmation?: number;
  verification?: number;
  appealValid?: number | string;
  appealCancellation?: number | string;
  withdrawal?: number | string;
  symbolAllocated?: number | string;
  total?: number | string;
  totalAcceptanceAppealValid?: number | string;
  allCancelSum?: number | string;
}
