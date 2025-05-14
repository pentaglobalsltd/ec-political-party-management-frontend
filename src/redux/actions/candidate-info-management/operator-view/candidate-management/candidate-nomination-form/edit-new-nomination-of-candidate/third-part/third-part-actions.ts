import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

import { CREATE_THIRD_PART, GET_THIRD_PART } from './types';
import {
  ThirdPartPropType,
  ThirdPartType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';

export const createThirdPartRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: ThirdPartPropType) => {
  return {
    type: CREATE_THIRD_PART.CREATE_THIRD_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    },
  } as const;
};

export const createThirdPartSuccess = (data: ThirdPartType) => {
  return {
    type: CREATE_THIRD_PART.CREATE_THIRD_PART_SUCCESS,
    payload: {
      data,
    },
  } as const;
};
export const createThirdPartFailed = () => {
  return {
    type: CREATE_THIRD_PART.CREATE_THIRD_PART_FAILED,
  } as const;
};

export const getThirdPartRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_THIRD_PART.GET_THIRD_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getThirdPartSuccess = (data: ThirdPartType) => {
  return {
    type: GET_THIRD_PART.GET_THIRD_PART_SUCCESS,
    payload: {
      data,
    },
  } as const;
};
export const getThirdPartFailed = () => {
  return {
    type: GET_THIRD_PART.GET_THIRD_PART_FAILED,
  } as const;
};

export const getThirdPartInitialState = () =>
  ({
    type: GET_THIRD_PART.GET_THIRD_PART_INITIAL_STATE,
  } as const);

export const createThirdPartInitialState = () => {
  return {
    type: CREATE_THIRD_PART.CREATE_THIRD_PART_INITIAL_STATE,
  } as const;
};

export type ThirdPartActions =
  | ReturnType<typeof createThirdPartRequest>
  | ReturnType<typeof createThirdPartSuccess>
  | ReturnType<typeof createThirdPartFailed>
  | ReturnType<typeof createThirdPartInitialState>
  | ReturnType<typeof getThirdPartRequest>
  | ReturnType<typeof getThirdPartSuccess>
  | ReturnType<typeof getThirdPartFailed>
  | ReturnType<typeof getThirdPartInitialState>;
