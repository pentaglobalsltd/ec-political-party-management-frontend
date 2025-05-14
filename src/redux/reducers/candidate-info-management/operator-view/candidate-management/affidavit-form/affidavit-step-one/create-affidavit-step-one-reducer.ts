import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateAffidavitStepOneState } from '../../types/affidavit-form/affidavit-step-one-state';
import { AffidavitStepOneActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';
import { CREATE_AFFIDAVIT_STEP_ONE } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/types';

const initialState: CreateAffidavitStepOneState = {
  request: false,
};

const createAffidavitStepOneReducer = (
  state = initialState,
  actions: AffidavitStepOneActions,
): CreateAffidavitStepOneState => {
  switch (actions.type) {
    case CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createAffidavitStepOneReducer;
