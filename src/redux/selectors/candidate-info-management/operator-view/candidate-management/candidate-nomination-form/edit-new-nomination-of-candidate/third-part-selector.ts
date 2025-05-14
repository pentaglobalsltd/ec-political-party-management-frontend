import { ThirdPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/third-part-state';
import { StoreType } from '@reducers/types';

export const getThirdPartState = (state: StoreType): ThirdPartState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .candidateNominationForm.edit.thirdPart;
