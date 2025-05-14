import {
  CREATE_FOURTH_PART,
  GET_FOURTH_PART,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/types';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  FourthPartPropType,
  FourthPartType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/fourth-part';

export const createFourthPartRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: FourthPartPropType) => {
  return {
    type: CREATE_FOURTH_PART.CREATE_FOURTH_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    },
  } as const;
};

export const createFourthPartSuccess = (data: FourthPartType) => {
  return {
    type: CREATE_FOURTH_PART.CREATE_FOURTH_PART_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const createFourthPartFailed = () => {
  return {
    type: CREATE_FOURTH_PART.CREATE_FOURTH_PART_FAILED,
  } as const;
};

export const getFourthPartRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_FOURTH_PART.GET_FOURTH_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getFourthPartSuccess = (data: FourthPartType) => {
  return {
    type: GET_FOURTH_PART.GET_FOURTH_PART_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const getFourthPartFailed = () => {
  return {
    type: GET_FOURTH_PART.GET_FOURTH_PART_FAILED,
  } as const;
};

export const getFourthPartInitialState = () =>
  ({
    type: GET_FOURTH_PART.GET_FOURTH_PART_INITIAL_STATE,
  } as const);

export const createFourthPartInitialState = () => {
  return {
    type: CREATE_FOURTH_PART.CREATE_FOURTH_PART_INITIAL_STATE,
  } as const;
};

export type FourthPartActions =
  | ReturnType<typeof createFourthPartRequest>
  | ReturnType<typeof createFourthPartSuccess>
  | ReturnType<typeof createFourthPartFailed>
  | ReturnType<typeof createFourthPartInitialState>
  | ReturnType<typeof getFourthPartRequest>
  | ReturnType<typeof getFourthPartSuccess>
  | ReturnType<typeof getFourthPartFailed>
  | ReturnType<typeof getFourthPartInitialState>;
