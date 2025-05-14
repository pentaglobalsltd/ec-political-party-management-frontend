// import { FirstPartType } from '@type/candidate-info-management/candidate-confirmation/candidate-nomination-form/first-part';
import { ReduxRequest } from '@reducers/types/redux-request';
import { FirstPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';

export interface CreateFirstPartState extends ReduxRequest<string> {}

export interface GetFirstPartState extends ReduxRequest<FirstPartType> {}

export interface UpdateFirstPartState extends ReduxRequest<FirstPartType> {}

export interface FirstPartState {
  createFirstPart: CreateFirstPartState;
  getFirstPart: GetFirstPartState;
  updateFirstPart: UpdateFirstPartState;
}
