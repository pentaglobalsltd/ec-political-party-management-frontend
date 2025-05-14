import { AffidavitStepOneActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { DeletePresentCaseState } from '../../types/affidavit-form/affidavit-step-one-state';
import { DELETE_PRESENT_CASE } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/types';

const initialState: DeletePresentCaseState = {
  request: false,
};

const deletePresentCaseReducer = (
  state = initialState,
  actions: AffidavitStepOneActions,
): DeletePresentCaseState => {
  switch (actions.type) {
    case DELETE_PRESENT_CASE.DELETE_PRESENT_CASE_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case DELETE_PRESENT_CASE.DELETE_PRESENT_CASE_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    case DELETE_PRESENT_CASE.DELETE_PRESENT_CASE_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default deletePresentCaseReducer;
