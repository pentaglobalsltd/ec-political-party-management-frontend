import { FourthPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/fourth-part';
import { ReduxRequest } from '@reducers/types/redux-request';

export interface CreateFourthPartState extends ReduxRequest<FourthPartType> {}

export interface GetFourthPartState extends ReduxRequest<FourthPartType> {}

export interface FourthPartState {
  createFourthPart: CreateFourthPartState;
  getFourthPart: GetFourthPartState;
}
