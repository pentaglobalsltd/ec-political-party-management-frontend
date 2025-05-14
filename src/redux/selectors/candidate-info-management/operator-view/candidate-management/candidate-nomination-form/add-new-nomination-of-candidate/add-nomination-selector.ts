import { AddNominationState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/add-new-nomination-of-candidate/add-nomination-state';
import { StoreType } from '@reducers/types';

export const getAddNominationState = (state: StoreType): AddNominationState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .candidateNominationForm.add;
