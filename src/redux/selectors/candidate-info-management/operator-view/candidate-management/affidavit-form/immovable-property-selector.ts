import { ImmovablePropertyState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/immovable-property-state';
import { StoreType } from '@reducers/types';

export const getImmovablePropertyState = (
  state: StoreType,
): ImmovablePropertyState =>
  state.candidateInfoManagement.operatorView.candidateManagement.affidavitForm
    .immovableProperty;
