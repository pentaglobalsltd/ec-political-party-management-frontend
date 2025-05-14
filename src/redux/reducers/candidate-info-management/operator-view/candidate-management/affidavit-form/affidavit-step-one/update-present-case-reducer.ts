import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { UpdatePresentCaseState } from '../../types/affidavit-form/affidavit-step-one-state';
import { AffidavitStepOneActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';
import { UPDATE_PRESENT_CASE } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/types';

const initialState: UpdatePresentCaseState = {
  request: false,
};

const updatePresentCaseReducer = (
  state = initialState,
  actions: AffidavitStepOneActions,
): UpdatePresentCaseState => {
  switch (actions.type) {
    case UPDATE_PRESENT_CASE.UPDATE_PRESENT_CASE_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case UPDATE_PRESENT_CASE.UPDATE_PRESENT_CASE_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: payload.data }),
      };
    case UPDATE_PRESENT_CASE.UPDATE_PRESENT_CASE_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default updatePresentCaseReducer;
