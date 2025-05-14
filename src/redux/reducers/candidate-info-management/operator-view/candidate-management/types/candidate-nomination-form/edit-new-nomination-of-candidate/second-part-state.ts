import { SecondPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/second-part';
import { ReduxRequest } from '@reducers/types/redux-request';

export interface CreateSecondPartState extends ReduxRequest<string> {}

export interface GetSecondPartState extends ReduxRequest<SecondPartType> {}

export interface UpdateSecondPartState extends ReduxRequest<SecondPartType> {}

export interface SecondPartState {
  createSecondPart: CreateSecondPartState;
  getSecondPart: GetSecondPartState;
  updateSecondPart: UpdateSecondPartState;
}
