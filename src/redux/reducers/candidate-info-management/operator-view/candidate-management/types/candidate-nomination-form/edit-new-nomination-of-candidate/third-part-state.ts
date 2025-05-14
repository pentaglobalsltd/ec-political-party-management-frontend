import { ReduxRequest } from '@reducers/types/redux-request';
import { ThirdPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';

export interface CreateThirdPartState extends ReduxRequest<ThirdPartType> {}

export interface GetThirdPartState extends ReduxRequest<ThirdPartType> {}

export interface UpdateThirdPartState extends ReduxRequest<ThirdPartType> {}

export interface ThirdPartState {
  createThirdPart: CreateThirdPartState;
  getThirdPart: GetThirdPartState;
  updateThirdPart: UpdateThirdPartState;
}
