
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetPresentCaseState } from '../../types/affidavit-form/affidavit-step-one-state';
import { AffidavitStepOneActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';
import { GET_PRESENT_CASE } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/types';

const initialState: GetPresentCaseState = {
  request: false,
};

const getPresentCaseReducer = (
  state = initialState,
  actions: AffidavitStepOneActions,
): GetPresentCaseState => {
  switch (actions.type) {
    case GET_PRESENT_CASE.GET_PRESENT_CASE_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_PRESENT_CASE.GET_PRESENT_CASE_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({data: payload.data}),
      };
    case GET_PRESENT_CASE.GET_PRESENT_CASE_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default getPresentCaseReducer;
