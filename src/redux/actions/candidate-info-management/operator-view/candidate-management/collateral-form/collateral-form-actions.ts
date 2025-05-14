import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  JamanatType,
  GetJamanatPropsType,
  UpdateJamanatPropsType,
} from '@type/candidate-info-management/candidate-confirmation/collateral-form';
import { GET_COLLATERAL_FORM_INFO, UPDATE_COLLATERAL_FORM_INFO } from './types';

export const getCollateralFormInfoRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
}: UrlIdTypes) => {
  return {
    type: GET_COLLATERAL_FORM_INFO.GET_COLLATERAL_FORM_INFO_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
    },
  } as const;
};

export const getCollateralFormInfoSuccess = (data: JamanatType) => {
  return {
    type: GET_COLLATERAL_FORM_INFO.GET_COLLATERAL_FORM_INFO_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getCollateralFormInfoFailed = () => {
  return {
    type: GET_COLLATERAL_FORM_INFO.GET_COLLATERAL_FORM_INFO_FAILED,
  } as const;
};

export const updateCollateralFormInfoRequest = ({
  electionSettingsId,
  candidateElectionDetailId,
  data,
}: UpdateJamanatPropsType) => {
  return {
    type: UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailId,
      data,
    } as const,
  };
};

export const updateCollateralFormInfoSuccess = (data: GetJamanatPropsType) => {
  return {
    type: UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const updateCollateralFormInfoFailed = () => {
  return {
    type: UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_FAILED,
  } as const;
};

export const updateCollateralFormInfoReset = () => {
  return {
    type: UPDATE_COLLATERAL_FORM_INFO.UPDATE_COLLATERAL_FORM_INFO_RESET,
  } as const;
};

export type CollateralFormActions =
  | ReturnType<typeof getCollateralFormInfoRequest>
  | ReturnType<typeof getCollateralFormInfoSuccess>
  | ReturnType<typeof getCollateralFormInfoFailed>
  | ReturnType<typeof updateCollateralFormInfoRequest>
  | ReturnType<typeof updateCollateralFormInfoSuccess>
  | ReturnType<typeof updateCollateralFormInfoFailed>
  | ReturnType<typeof updateCollateralFormInfoReset>;
