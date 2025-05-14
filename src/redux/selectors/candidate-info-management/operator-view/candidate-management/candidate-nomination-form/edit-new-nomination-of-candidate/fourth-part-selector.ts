import { FourthPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part-state';
import { StoreType } from '@reducers/types';

export const getCandidateNominationFormFourthPartState = (
  state: StoreType,
): FourthPartState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .candidateNominationForm.edit.fourthPart;
