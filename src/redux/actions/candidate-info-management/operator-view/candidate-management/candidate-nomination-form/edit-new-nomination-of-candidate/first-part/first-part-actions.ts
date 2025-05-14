import {
  FirstPartPropType,
  FirstPartType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { CREATE_FIRST_PART, GET_FIRST_PART } from './types';

export const createFirstPartRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: FirstPartPropType) => {
  return {
    type: CREATE_FIRST_PART.CREATE_FIRST_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    } as const,
  };
};

export const createFirstPartSuccess = (data: FirstPartType) => {
  return {
    type: CREATE_FIRST_PART.CREATE_FIRST_PART_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const createFirstPartFailed = (data: string) => {
  return {
    type: CREATE_FIRST_PART.CREATE_FIRST_PART_FAILED,
    payload: data,
  } as const;
};

export const getFirstPartRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_FIRST_PART.GET_FIRST_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getFirstPartSuccess = (data: FirstPartType) => {
  return {
    type: GET_FIRST_PART.GET_FIRST_PART_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getFirstPartFailed = () => {
  return {
    type: GET_FIRST_PART.GET_FIRST_PART_FAILED,
  } as const;
};

export const getFirstPartInitialState = () =>
  ({
    type: GET_FIRST_PART.GET_FIRST_PART_INITIAL_STATE,
  } as const);

export const createFirstPartInitialState = () =>
  ({
    type: CREATE_FIRST_PART.CREATE_FIRST_PART_INITIAL_STATE,
  } as const);

export type FirstPartActions =
  | ReturnType<typeof createFirstPartRequest>
  | ReturnType<typeof createFirstPartSuccess>
  | ReturnType<typeof createFirstPartFailed>
  | ReturnType<typeof createFirstPartInitialState>
  | ReturnType<typeof getFirstPartRequest>
  | ReturnType<typeof getFirstPartSuccess>
  | ReturnType<typeof getFirstPartFailed>
  | ReturnType<typeof getFirstPartInitialState>;
