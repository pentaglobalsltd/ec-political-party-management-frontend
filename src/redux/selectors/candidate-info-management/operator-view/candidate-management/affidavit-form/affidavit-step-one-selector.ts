import { AffidavitStepOneState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/affidavit-step-one-state';
import { StoreType } from '@reducers/types';

export const getAffidavitStepOneState = (
  state: StoreType,
): AffidavitStepOneState =>
  state.candidateInfoManagement.operatorView.candidateManagement.affidavitForm
    .affidavitStepOne;
