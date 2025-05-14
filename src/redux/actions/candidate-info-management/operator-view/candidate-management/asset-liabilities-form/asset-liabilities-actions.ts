import {
  CREATE_ASSET_LIABILITY_DETAILS,
  GET_ASSET_LIABILITY_DETAILS,
  UPDATE_ASSET,
  UPDATE_YEARLY_INCOME,
  DELETE_ASSET,
  DELETE_YEARLY_INCOME,
} from './types';

import {
  GetAssetLiabilityPropsType,
  CreateAssetLiabilityPropsType,
  UpdateAssetType,
  UpdateYearlyIncomeType,
  DeleteAssetType,
  DeleteYearlyIncomeType,
  UrlIdTypes,
} from '@type/candidate-info-management/operator-view/asset-liabilities-form/asset-liabilities-form';

export const createAssetLiabilityDetailsRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  data,
}: CreateAssetLiabilityPropsType) => {
  return {
    type: CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailId,
    } as const,
  };
};

export const createAssetLiabilityDetailsSuccess = (
  data: CreateAssetLiabilityPropsType | {},
) => {
  return {
    type: CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const createAssetLiabilityDetailsFailed = () => {
  return {
    type: CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_FAILED,
  } as const;
};

export const createAssetLiabilityDetailsInitialState = () =>
  ({
    type: CREATE_ASSET_LIABILITY_DETAILS.CREATE_ASSET_LIABILITY_DETAILS_INITIAL_STATE,
  } as const);

export const getAssetLiabilityDetailsRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
}: UrlIdTypes) => {
  return {
    type: GET_ASSET_LIABILITY_DETAILS.GET_ASSET_LIABILITY_DETAILS_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
    },
  } as const;
};

export const getAssetLiabilityDetailsSuccess = (
  data: GetAssetLiabilityPropsType,
) => {
  return {
    type: GET_ASSET_LIABILITY_DETAILS.GET_ASSET_LIABILITY_DETAILS_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getAssetLiabilityDetailsFailed = () => {
  return {
    type: GET_ASSET_LIABILITY_DETAILS.GET_ASSET_LIABILITY_DETAILS_FAILED,
  } as const;
};

export const updateAssetsRequest = ({
  data,
  electionSettingsId,
  candidateElectionDetailId,
  personalAssetId,
}: UpdateAssetType) =>
  ({
    type: UPDATE_ASSET.UPDATE_ASSET_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailId,
      personalAssetId,
    },
  } as const);

export const updateAssetsSuccess = (data: UpdateAssetType) =>
  ({
    type: UPDATE_ASSET.UPDATE_ASSET_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateAssetsFailed = () =>
  ({
    type: UPDATE_ASSET.UPDATE_ASSET_FAILED,
  } as const);

export const updateYearlyIncomeRequest = ({
  data,
  electionSettingsId,
  candidateElectionDetailId,
  yearlyIncomeExpenditureId,
}: UpdateYearlyIncomeType) =>
  ({
    type: UPDATE_YEARLY_INCOME.UPDATE_YEARLY_INCOME_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailId,
      yearlyIncomeExpenditureId,
    },
  } as const);

export const updateYearlyIncomeSuccess = (data: UpdateYearlyIncomeType) =>
  ({
    type: UPDATE_YEARLY_INCOME.UPDATE_YEARLY_INCOME_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateYearlyIncomeFailed = () =>
  ({
    type: UPDATE_YEARLY_INCOME.UPDATE_YEARLY_INCOME_FAILED,
  } as const);

export const deleteAssetRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  personalAssetId,
}: DeleteAssetType) =>
  ({
    type: DELETE_ASSET.DELETE_ASSET_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
      personalAssetId,
    },
  } as const);

export const deleteAssetSuccess = () =>
  ({
    type: DELETE_ASSET.DELETE_ASSET_SUCCESS,
  } as const);

export const deleteAssetFailed = () =>
  ({
    type: DELETE_ASSET.DELETE_ASSET_FAILED,
  } as const);

export const deleteYearlyIncomeRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  yearlyIncomeExpenditureId,
}: DeleteYearlyIncomeType) =>
  ({
    type: DELETE_YEARLY_INCOME.DELETE_YEARLY_INCOME_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
      yearlyIncomeExpenditureId,
    },
  } as const);

export const deleteYearlyIncomeSuccess = () =>
  ({
    type: DELETE_YEARLY_INCOME.DELETE_YEARLY_INCOME_SUCCESS,
  } as const);

export const deleteYearlyIncomeFailed = () =>
  ({
    type: DELETE_YEARLY_INCOME.DELETE_YEARLY_INCOME_FAILED,
  } as const);

export type AssetLiabilityDetailActions =
  | ReturnType<typeof createAssetLiabilityDetailsRequest>
  | ReturnType<typeof createAssetLiabilityDetailsSuccess>
  | ReturnType<typeof createAssetLiabilityDetailsFailed>
  | ReturnType<typeof createAssetLiabilityDetailsInitialState>
  | ReturnType<typeof getAssetLiabilityDetailsRequest>
  | ReturnType<typeof getAssetLiabilityDetailsSuccess>
  | ReturnType<typeof getAssetLiabilityDetailsFailed>
  | ReturnType<typeof updateAssetsRequest>
  | ReturnType<typeof updateAssetsSuccess>
  | ReturnType<typeof updateAssetsFailed>
  | ReturnType<typeof updateYearlyIncomeRequest>
  | ReturnType<typeof updateYearlyIncomeSuccess>
  | ReturnType<typeof updateYearlyIncomeFailed>
  | ReturnType<typeof deleteAssetRequest>
  | ReturnType<typeof deleteAssetSuccess>
  | ReturnType<typeof deleteAssetFailed>
  | ReturnType<typeof deleteYearlyIncomeRequest>
  | ReturnType<typeof deleteYearlyIncomeSuccess>
  | ReturnType<typeof deleteYearlyIncomeFailed>;
