import { ImmovablePropertyType } from '@type/candidate-info-management/operator-view/affidavit-form/immovable-property';
import { ReduxRequest } from '@reducers/types/redux-request';

export interface CreateImmovablePropertyState
  extends ReduxRequest<ImmovablePropertyType> {}

export interface GetImmovablePropertyState
  extends ReduxRequest<ImmovablePropertyType> {}

export interface UpdateImmovablePropertyState
  extends ReduxRequest<ImmovablePropertyType> {}

export interface ImmovablePropertyState {
  createImmovableProperty: CreateImmovablePropertyState;
  getImmovableProperty: GetImmovablePropertyState;
  updateImmovableProperty: UpdateImmovablePropertyState;
}
