import { FirstPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/first-part-state';
import { StoreType } from '@reducers/types';

export const getCandidateNominationFormFirstPartState = (
  state: StoreType,
): FirstPartState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .candidateNominationForm.edit.firstPart;
