import { DocumentServiceType } from '@type/documents/document-service-type';
import { UrlIdTypes } from './candidate-confirmation/url-id-types';

export interface ElectionApplicantTypes {
  id?: number;
  nominationStatusId?: number;
  candidateElectionDetailsId?: number;
  isCandidateInfoCorrect?: boolean;
  isProposerInfoCorrect?: boolean;
  isVerifierInfoCorrect?: boolean;
  isCandidatePersonalInfoCorrect?: boolean;
  isAttachmentCorrect?: boolean;
  isCandidateAgeCorrect?: boolean;
  isCandidateVoterNoCorrect?: boolean;
  isProposerVoterNoCorrect?: boolean;
  isSupporterVoterNoCorrect?: boolean;
  candidateSerial?: number;
  comments?: string;
  file?: DocumentServiceType;
  symbolId?: number;
  acknowledgmentSubmitter?: string;
  nominationSelectionDate?: string;
  nominationSelectionPlace?: string;
}

export interface ElectionApplicantResponseTypes {
  data: ElectionApplicantTypes;
  status?: number;
  statusText?: string;
}

export interface ElectionApplicantUpdateTypes extends UrlIdTypes {
  data: ElectionApplicantTypes;
}
