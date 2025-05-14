import { MovablePropertyState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/movable-property-state';
import { StoreType } from '@reducers/types';

export const getMovablePropertyState = (
  state: StoreType,
): MovablePropertyState =>
  state.candidateInfoManagement.operatorView.candidateManagement.affidavitForm
    .movableProperty;
