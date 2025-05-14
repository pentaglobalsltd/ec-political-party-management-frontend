import {
  CREATE_SECOND_PART,
  GET_SECOND_PART,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/types';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  SecondPartPropType,
  SecondPartType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/second-part';

export const createSecondPartRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: SecondPartPropType) => {
  return {
    type: CREATE_SECOND_PART.CREATE_SECOND_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    },
  } as const;
};

export const createSecondPartSuccess = (data: SecondPartType) => {
  return {
    type: CREATE_SECOND_PART.CREATE_SECOND_PART_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const createSecondPartFailed = (data: string) => {
  return {
    type: CREATE_SECOND_PART.CREATE_SECOND_PART_FAILED,
    payload: data,
  } as const;
};

export const getSecondPartRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_SECOND_PART.GET_SECOND_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getSecondPartSuccess = (data: SecondPartType) => {
  return {
    type: GET_SECOND_PART.GET_SECOND_PART_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const getSecondPartFailed = () => {
  return {
    type: GET_SECOND_PART.GET_SECOND_PART_FAILED,
  } as const;
};

export const getSecondPartInitialState = () =>
  ({
    type: GET_SECOND_PART.GET_SECOND_PART_INITIAL_STATE,
  } as const);

export const createSecondPartInitialState = () => {
  return {
    type: CREATE_SECOND_PART.CREATE_SECOND_PART_INITIAL_STATE,
  } as const;
};
export type SecondPartActions =
  | ReturnType<typeof createSecondPartRequest>
  | ReturnType<typeof createSecondPartSuccess>
  | ReturnType<typeof createSecondPartFailed>
  | ReturnType<typeof createSecondPartInitialState>
  | ReturnType<typeof getSecondPartRequest>
  | ReturnType<typeof getSecondPartSuccess>
  | ReturnType<typeof getSecondPartFailed>
  | ReturnType<typeof getSecondPartInitialState>;
