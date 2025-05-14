import { CandidatePersonalInformationState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-personal-information-state';
import { StoreType } from '@reducers/types';

export const getCandidatePersonalInformationState = (
  state: StoreType,
): CandidatePersonalInformationState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .candidatePersonalInformation;
