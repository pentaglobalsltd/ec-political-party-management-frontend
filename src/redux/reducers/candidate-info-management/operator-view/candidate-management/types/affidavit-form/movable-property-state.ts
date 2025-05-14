import { MovablePropertyType } from '@type/candidate-info-management/operator-view/affidavit-form/movable-property';
import { ReduxRequest } from '@reducers/types/redux-request';

export interface CreateMovablePropertyState
  extends ReduxRequest<MovablePropertyType> {}

export interface GetMovablePropertyState
  extends ReduxRequest<MovablePropertyType> {}

export interface UpdateMovablePropertyState
  extends ReduxRequest<MovablePropertyType> {}

export interface MovablePropertyState {
  createMovableProperty: CreateMovablePropertyState;
  getMovableProperty: GetMovablePropertyState;
  updateMovableProperty: UpdateMovablePropertyState;
}
