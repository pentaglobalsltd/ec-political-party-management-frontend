import { IncomeSourceDetailsState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/income-source-details/income-source-details-first-step-state';
import { StoreType } from '@reducers/types';

export const getIncomeSourceDetailsState = (
  state: StoreType,
): IncomeSourceDetailsState =>
  state.candidateInfoManagement.operatorView.candidateManagement
    .incomeSourceDetails.firstPart;
