import {
  CreateIncomeSourceDetailsType,
  IncomeSourceDetailsType,
  OtherFundingURLType,
  OtherFundingsType,
  OwnEarningType,
  RelativeFundingURLType,
  RelativeFundingsType,
  SelfFundingURLType,
  UpdateOtherFundingType,
  UpdateRelativeFundingType,
  UpdateSelfFundingType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-first-part';
import {
  CREATE_INCOME_SOURCE_DETAILS,
  DELETE_OTHER_FUNDING,
  DELETE_RELATIVE_FUNDING,
  DELETE_SELF_FUNDING,
  GET_INCOME_SOURCE_DETAILS,
  UPDATE_OTHER_FUNDING,
  UPDATE_RELATIVE_FUNDING,
  UPDATE_SELF_FUNDING,
} from './types/income-source-details-first-part-actions';
import { UrlType } from '@type/url-type';

export const createIncomeSourceDetailsRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  data,
}: CreateIncomeSourceDetailsType) => {
  return {
    type: CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailId,
    } as const,
  };
};

export const createIncomeSourceDetailsSuccess = (
  data: IncomeSourceDetailsType,
) => {
  return {
    type: CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const createIncomeSourceDetailsFailed = () => {
  return {
    type: CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_FAILED,
  } as const;
};

export const createIncomeSourceDetailsInitialState = () =>
  ({
    type: CREATE_INCOME_SOURCE_DETAILS.CREATE_INCOME_SOURCE_DETAILS_INITIAL_STATE,
  } as const);

export const getIncomeSourceDetailsRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
}: UrlType) => {
  return {
    type: GET_INCOME_SOURCE_DETAILS.GET_INCOME_SOURCE_DETAILS_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
    },
  } as const;
};

export const getIncomeSourceDetailsSuccess = (
  data: IncomeSourceDetailsType,
) => {
  return {
    type: GET_INCOME_SOURCE_DETAILS.GET_INCOME_SOURCE_DETAILS_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getIncomeSourceDetailsFailed = () => {
  return {
    type: GET_INCOME_SOURCE_DETAILS.GET_INCOME_SOURCE_DETAILS_FAILED,
  } as const;
};

export const updateSelfFundingRequest = ({
  data,
  electionSettingsId,
  candidateElectionDetailId,
  selfFundingId,
}: UpdateSelfFundingType) =>
  ({
    type: UPDATE_SELF_FUNDING.UPDATE_SELF_FUNDING_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailId,
      selfFundingId,
    },
  } as const);

export const updateSelfFundingSuccess = (data: OwnEarningType) =>
  ({
    type: UPDATE_SELF_FUNDING.UPDATE_SELF_FUNDING_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateSelfFundingFailed = () =>
  ({
    type: UPDATE_SELF_FUNDING.UPDATE_SELF_FUNDING_FAILED,
  } as const);

export const updateRelativeFundingRequest = ({
  data,
  electionSettingsId,
  candidateElectionDetailId,
  relativeFundingId,
}: UpdateRelativeFundingType) =>
  ({
    type: UPDATE_RELATIVE_FUNDING.UPDATE_RELATIVE_FUNDING_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailId,
      relativeFundingId,
    },
  } as const);

export const updateRelativeFundingSuccess = (data: RelativeFundingsType) =>
  ({
    type: UPDATE_RELATIVE_FUNDING.UPDATE_RELATIVE_FUNDING_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateRelativeFundingFailed = () =>
  ({
    type: UPDATE_RELATIVE_FUNDING.UPDATE_RELATIVE_FUNDING_FAILED,
  } as const);

export const updateOtherFundingRequest = ({
  data,
  electionSettingsId,
  candidateElectionDetailId,
  otherFundingId,
}: UpdateOtherFundingType) =>
  ({
    type: UPDATE_OTHER_FUNDING.UPDATE_OTHER_FUNDING_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailId,
      otherFundingId,
    },
  } as const);

export const updateOtherFundingSuccess = (data: OtherFundingsType) =>
  ({
    type: UPDATE_OTHER_FUNDING.UPDATE_OTHER_FUNDING_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateOtherFundingFailed = () =>
  ({
    type: UPDATE_OTHER_FUNDING.UPDATE_OTHER_FUNDING_FAILED,
  } as const);

export const deleteSelfFundingRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  selfFundingId,
}: SelfFundingURLType) =>
  ({
    type: DELETE_SELF_FUNDING.DELETE_SELF_FUNDING_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
      selfFundingId,
    },
  } as const);

export const deleteSelfFundingSuccess = () =>
  ({
    type: DELETE_SELF_FUNDING.DELETE_SELF_FUNDING_SUCCESS,
  } as const);

export const deleteSelfFundingFailed = () =>
  ({
    type: DELETE_SELF_FUNDING.DELETE_SELF_FUNDING_FAILED,
  } as const);

export const deleteRelativeFundingRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  relativeFundingId,
}: RelativeFundingURLType) =>
  ({
    type: DELETE_RELATIVE_FUNDING.DELETE_RELATIVE_FUNDING_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
      relativeFundingId,
    },
  } as const);

export const deleteRelativeFundingSuccess = () =>
  ({
    type: DELETE_RELATIVE_FUNDING.DELETE_RELATIVE_FUNDING_SUCCESS,
  } as const);

export const deleteRelativeFundingFailed = () =>
  ({
    type: DELETE_RELATIVE_FUNDING.DELETE_RELATIVE_FUNDING_FAILED,
  } as const);

export const deleteOtherFundingRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  otherFundingId,
}: OtherFundingURLType) =>
  ({
    type: DELETE_OTHER_FUNDING.DELETE_OTHER_FUNDING_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
      otherFundingId,
    },
  } as const);

export const deleteOtherFundingSuccess = () =>
  ({
    type: DELETE_OTHER_FUNDING.DELETE_OTHER_FUNDING_SUCCESS,
  } as const);

export const deleteOtherFundingFailed = () =>
  ({
    type: DELETE_OTHER_FUNDING.DELETE_OTHER_FUNDING_FAILED,
  } as const);

export type IncomeSourceDetailsActions =
  | ReturnType<typeof createIncomeSourceDetailsRequest>
  | ReturnType<typeof createIncomeSourceDetailsSuccess>
  | ReturnType<typeof createIncomeSourceDetailsFailed>
  | ReturnType<typeof createIncomeSourceDetailsInitialState>
  | ReturnType<typeof getIncomeSourceDetailsRequest>
  | ReturnType<typeof getIncomeSourceDetailsSuccess>
  | ReturnType<typeof getIncomeSourceDetailsFailed>
  | ReturnType<typeof updateSelfFundingRequest>
  | ReturnType<typeof updateSelfFundingSuccess>
  | ReturnType<typeof updateSelfFundingFailed>
  | ReturnType<typeof updateRelativeFundingRequest>
  | ReturnType<typeof updateRelativeFundingSuccess>
  | ReturnType<typeof updateRelativeFundingFailed>
  | ReturnType<typeof updateOtherFundingRequest>
  | ReturnType<typeof updateOtherFundingSuccess>
  | ReturnType<typeof updateOtherFundingFailed>
  | ReturnType<typeof deleteSelfFundingRequest>
  | ReturnType<typeof deleteSelfFundingSuccess>
  | ReturnType<typeof deleteSelfFundingFailed>
  | ReturnType<typeof deleteRelativeFundingRequest>
  | ReturnType<typeof deleteRelativeFundingSuccess>
  | ReturnType<typeof deleteRelativeFundingFailed>
  | ReturnType<typeof deleteOtherFundingRequest>
  | ReturnType<typeof deleteOtherFundingSuccess>
  | ReturnType<typeof deleteOtherFundingFailed>;
