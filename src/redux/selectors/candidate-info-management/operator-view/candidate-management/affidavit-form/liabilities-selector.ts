import { LiabilitiesState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/liabilities-state';
import { StoreType } from '@reducers/types';

export const getLiabilitiesState = (state: StoreType): LiabilitiesState =>
  state.candidateInfoManagement.operatorView.candidateManagement.affidavitForm
    .liabilities;
