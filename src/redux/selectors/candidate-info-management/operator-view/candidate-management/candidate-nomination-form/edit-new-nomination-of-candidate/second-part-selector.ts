import { SecondPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/second-part-state';
import { StoreType } from '@reducers/types';

export const getSecondPartState = (state: StoreType): SecondPartState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .candidateNominationForm.edit.secondPart;
