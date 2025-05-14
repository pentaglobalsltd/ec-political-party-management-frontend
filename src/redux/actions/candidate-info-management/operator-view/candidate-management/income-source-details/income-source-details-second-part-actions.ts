import {
  IncomeSourceDetailsSecondPart,
  IncomeSourceDetailsSecondPartPropsType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-second-part';
import {
  CREATE_INCOME_SOURCE_DETAILS_SECOND_PART,
  GET_INCOME_SOURCE_SECOND_PART_DETAILS,
} from './types/income-source-details-second-part';
import { UrlType } from '@type/url-type';

export const createIncomeSourceDetailsSecondPartRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  data,
}: IncomeSourceDetailsSecondPartPropsType) => {
  return {
    type: CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailId,
    } as const,
  };
};

export const createIncomeSourceDetailsSecondPartSuccess = (
  data: IncomeSourceDetailsSecondPart,
) => {
  return {
    type: CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const createIncomeSourceDetailsSecondPartFailed = () => {
  return {
    type: CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_FAILED,
  } as const;
};

export const createIncomeSourceDetailsSecondPartInitialState = () =>
  ({
    type: CREATE_INCOME_SOURCE_DETAILS_SECOND_PART.CREATE_INCOME_SOURCE_DETAILS_SECOND_PART_INITIAL_STATE,
  } as const);

export const getIncomeSourceDetailsSecondPartRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
}: UrlType) => {
  return {
    type: GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
    },
  } as const;
};

export const getIncomeSourceDetailsSecondPartSuccess = (
  data: IncomeSourceDetailsSecondPart,
) => {
  return {
    type: GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getIncomeSourceDetailsSecondPartFailed = () => {
  return {
    type: GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_FAILED,
  } as const;
};

export const getIncomeSourceDetailsSecondPartInitialState = () => {
  return {
    type: GET_INCOME_SOURCE_SECOND_PART_DETAILS.GET_INCOME_SOURCE_SECOND_PART_INITIAL_STATE,
  } as const;
};

export type IncomeSourceDetailsSecondPartActions =
  | ReturnType<typeof createIncomeSourceDetailsSecondPartRequest>
  | ReturnType<typeof createIncomeSourceDetailsSecondPartSuccess>
  | ReturnType<typeof createIncomeSourceDetailsSecondPartFailed>
  | ReturnType<typeof createIncomeSourceDetailsSecondPartInitialState>
  | ReturnType<typeof getIncomeSourceDetailsSecondPartRequest>
  | ReturnType<typeof getIncomeSourceDetailsSecondPartSuccess>
  | ReturnType<typeof getIncomeSourceDetailsSecondPartFailed>
  | ReturnType<typeof getIncomeSourceDetailsSecondPartInitialState>;
