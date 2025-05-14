import { AttachFileState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/attach-file-state';
import { StoreType } from '@reducers/types';

export const getAttachFileState = (state: StoreType): AttachFileState =>
  state.candidateInfoManagement.operatorView.candidateManagement.attachFile;
