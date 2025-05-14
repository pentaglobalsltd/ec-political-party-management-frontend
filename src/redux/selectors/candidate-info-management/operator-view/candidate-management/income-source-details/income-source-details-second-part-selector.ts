import { IncomeSourceDetailsSecondPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/income-source-details/income-source-details-second-step-state';
import { StoreType } from '@reducers/types';

export const getIncomeSourceDetailsSecondPartState = (
  state: StoreType,
): IncomeSourceDetailsSecondPartState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .incomeSourceDetails.secondPart;
