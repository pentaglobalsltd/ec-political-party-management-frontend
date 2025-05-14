import { ReduxRequest } from '@reducers/types/redux-request';
import { IncomeSourceDetailsSecondPart } from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-second-part';
export interface CreateIncomeSourceDetailsSecondPartDetailsState
  extends ReduxRequest<IncomeSourceDetailsSecondPart> {}

export interface GetIncomeSourceDetailsSecondPartDetailsState
  extends ReduxRequest<IncomeSourceDetailsSecondPart> {}
export interface IncomeSourceDetailsSecondPartState {
  createIncomeSourceDetailsSecondPartDetails: CreateIncomeSourceDetailsSecondPartDetailsState;
  getIncomeSourceDetailsSecondPartDetails: GetIncomeSourceDetailsSecondPartDetailsState;
}
