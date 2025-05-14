import { SelectOptionArray } from '@type/selection-option-type';
import { Dispatch, SetStateAction, createContext } from 'react';
import {
  ButtonStates,
  ModalStates,
} from '../components/submit-form/modals/types';
import { DownloadFileIdType } from '@type/documents/attach-file';

export interface ContextDataSubmitResult {
  candidateType?: number;
  selectedCandidateSettings?: SelectOptionArray;
  selectedCenterId?: number;
  selectedWardId?: number;
  // selectedUpElectionSettingsId?: number; //for union parishad all candidates election settings
  // selectedUpUnionOrWardId?: number; // only for members-> to hold the union or ward data

  selectedUpUnionOrWardId?: number; // to hold the union-or-ward data -> only for union parishad election (all 3 candidates)
  selectedUpWardId?: number; // to hold the ward data -> only for union parishad member-candidates (general & reserve member)

  selectedUpazilaId?: number;

  contextPollingCenters: any[];

  contextResultByCandidates?: {
    candidateVoteCounts?: any[];
    commentByAro: any;
    fileFromOp: any;
    id?: number;
    pollingCenter?: any; // no longer need this, bcz backend changed their approach
    status?: string;
    totalAbsentVoteCount?: number;
    totalIllegalVoteCount?: number;
    totalLegalVoteCount?: number;
  };

  isSuccessResult?: boolean;

  contextResultSummaryOp?: {
    pollingCenterCount?: any[];
    resubmittedPollingCenters?: any[];
    totalPollingCenterCount?: number;
  };
}

export type TypeResetContextDataForCandidate = Dispatch<
  SetStateAction<ContextDataSubmitResult | undefined>
>;

interface SubmitResultContextType {
  contextData: ContextDataSubmitResult;
  setContextData: TypeResetContextDataForCandidate;

  modalStates: ModalStates;
  updateModalStates: ({
    errorText,
    isErrorModalOpen,
    isPreviewModalOpen,
    isSubmitModalOpen,
  }: ModalStates) => void;

  submitBtnStates: ButtonStates;
  updateButtonStates: ({
    disableButton,
    isSubmitBtnLoading,
    submittedData,
  }: ButtonStates) => void;

  fileUploadDisable: boolean;
  setFileUploadDisable: Dispatch<SetStateAction<boolean>>;

  fileUrl: string | undefined;
  resetFileUrl: () => void;
  downloadAttachFileHandler: ({
    documentId,
    fileId,
    formatId,
    fileType,
    generateLinkOnly,
  }: DownloadFileIdType) => void;
}

export const SubmitResultContext = createContext<
  SubmitResultContextType | undefined
>(undefined);
