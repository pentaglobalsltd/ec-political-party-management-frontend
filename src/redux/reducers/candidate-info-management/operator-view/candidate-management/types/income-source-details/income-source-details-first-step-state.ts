import { ReduxRequest } from '@reducers/types/redux-request';
import {
  IncomeSourceDetailsType,
  OtherFundingsType,
  OwnEarningType,
  RelativeFundingsType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-first-part';

export interface CreateIncomeSourceDetailsState
  extends ReduxRequest<IncomeSourceDetailsType> {}

export interface GetIncomeSourceDetailsState
  extends ReduxRequest<IncomeSourceDetailsType> {}

export interface UpdateSelfFundingState extends ReduxRequest<OwnEarningType> {}

export interface UpdateRelativeFundingState
  extends ReduxRequest<RelativeFundingsType> {}

export interface UpdateOtherFundingState
  extends ReduxRequest<OtherFundingsType> {}

export interface DeleteSelfFundingState extends ReduxRequest<OwnEarningType> {}

export interface DeleteRelativeFundingState
  extends ReduxRequest<RelativeFundingsType> {}

export interface DeleteOtherFundingState
  extends ReduxRequest<OtherFundingsType> {}

export interface IncomeSourceDetailsState {
  createIncomeSourceDetails: CreateIncomeSourceDetailsState;
  getIncomeSourceDetails: GetIncomeSourceDetailsState;
  updateSelfFunding: UpdateSelfFundingState;
  updateRelativeFunding: UpdateRelativeFundingState;
  updateOtherFunding: UpdateOtherFundingState;

  deleteSelfFunding: DeleteSelfFundingState;
  deleteRelativeFunding: DeleteRelativeFundingState;
  deleteOtherFunding: DeleteOtherFundingState;
}
