import { GetAffidavitStepOneState } from '../../types/affidavit-form/affidavit-step-one-state';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import AffidavitStepOneType, {
  PresentCaseType,
} from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';
import { AffidavitStepOneActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';
import {
  GET_AFFIDAVIT_STEP_ONE,
  GET_ALL_PRESENT_CASE,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/types';

const initialState: GetAffidavitStepOneState = {
  request: false,
};

function mapAffidateCase(data: AffidavitStepOneType) {
  return {
    ...data,
    presentCases: data?.presentCases?.map((item: PresentCaseType) => ({
      ...item,
      idx: item.id,
    })),
    pastCases: data?.pastCases?.map((item: PresentCaseType) => ({
      ...item,
      idx: item.id,
    })),
  };
}

const getAffidavitStepOneReducer = (
  state = initialState,
  actions: AffidavitStepOneActions,
): GetAffidavitStepOneState => {
  switch (actions.type) {
    case GET_AFFIDAVIT_STEP_ONE.GET_AFFIDAVIT_STEP_ONE_REQUEST:
      return {
        ...getRequestingState({ data: {} }),
      };
    case GET_AFFIDAVIT_STEP_ONE.GET_AFFIDAVIT_STEP_ONE_SUCCESS: {
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: mapAffidateCase(payload.data) }),
      };
    }
    case GET_AFFIDAVIT_STEP_ONE.GET_AFFIDAVIT_STEP_ONE_FAILED:
      return {
        ...getFailedState({ data: {} }),
      };
    case GET_ALL_PRESENT_CASE.GET_ALL_PRESENT_CASE_SUCCESS: {
      const { payload } = actions as any;
      if (payload.caseType === 'PRESENT') {
        return {
          ...getSuccessState({
            data: {
              ...state.data,
              presentCases: payload.data?.map((item: PresentCaseType) => ({
                ...item,
                idx: item.id,
              })),
            },
          }),
        };
      } else {
        return {
          ...getSuccessState({
            data: {
              ...state.data,
              pastCases: payload.data?.map((item: PresentCaseType) => ({
                ...item,
                idx: item.id,
              })),
            },
          }),
        };
      }
    }
    default:
      return state;
  }
};

export default getAffidavitStepOneReducer;
