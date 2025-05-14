import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetAllPresentCaseState } from '../../types/affidavit-form/affidavit-step-one-state';
import { AffidavitStepOneActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';
import { GET_ALL_PRESENT_CASE } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/types';

const initialState: GetAllPresentCaseState = {
  request: false,
};

const getAllPresentCaseReducer = (
  state = initialState,
  actions: AffidavitStepOneActions,
): GetAllPresentCaseState => {
  switch (actions.type) {
    case GET_ALL_PRESENT_CASE.GET_ALL_PRESENT_CASE_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_ALL_PRESENT_CASE.GET_ALL_PRESENT_CASE_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    case GET_ALL_PRESENT_CASE.GET_ALL_PRESENT_CASE_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default getAllPresentCaseReducer;
