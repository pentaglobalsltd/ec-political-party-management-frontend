import { useDispatch } from 'react-redux';

import {
  createAssetLiabilityDetailsRequest,
  getAssetLiabilityDetailsRequest,
  updateAssetsRequest,
  updateYearlyIncomeRequest,
  deleteAssetRequest,
  deleteYearlyIncomeRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/asset-liabilities-form/asset-liabilities-actions';
import { AssetLiabilityState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';
import { getAssetLiabilityState } from '@selectors/candidate-info-management/operator-view/candidate-management/asset-liability-details/asset-liabilities-details-selector';

import {
  AssetsType,
  CreateAssetLiabilityPropsType,
  UpdateAssetType,
  UpdateYearlyIncomeType,
  DeleteAssetType,
  DeleteYearlyIncomeType,
} from '@type/candidate-info-management/operator-view/asset-liabilities-form/asset-liabilities-form';

import { useAppSelector } from '@helpers/redux';
import { UrlIdTypes } from '@type/candidate-info-management/operator-view/asset-liabilities-form/asset-liabilities-form';
import { useEffect } from 'react';

interface UseAssetLiabilityDetails {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;

  isUpdateAssetsRequested: boolean;
  isUpdateAssetsSuccess: boolean;

  isUpdateYearlyIncomeRequested: boolean;
  isUpdateYearlyIncomeSuccess: boolean;

  isDeleteAssetRequested: boolean;
  isDeleteAssetSuccess: boolean;

  isDeleteYearlyIncomeRequested: boolean;
  isDeleteYearlyIncomeSuccess: boolean;

  assetLiabilityDetails: AssetsType;

  createAssetLiabilityDetails: ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: CreateAssetLiabilityPropsType) => void;

  updateAssetsHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    personalAssetId,
    data,
  }: UpdateAssetType) => void;

  updateYearlyIncomeHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    yearlyIncomeExpenditureId,
    data,
  }: UpdateYearlyIncomeType) => void;

  deleteAssetHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    personalAssetId,
  }: DeleteAssetType) => void;

  deleteYearlyIncomeHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    yearlyIncomeExpenditureId,
  }: DeleteYearlyIncomeType) => void;
}

export const useAssetLiabilityDetails = ({
  electionSettingsId,
  candidateElectionDetailId,
  getOnMount,
}: UrlIdTypes): UseAssetLiabilityDetails => {
  const dispatch = useDispatch();
  const {
    createAssetLiabilityDetail,
    getAssetLiabilityDetail,
    updateAsset,
    updateYearlyIncome,
    deleteAsset,
    deleteYearlyIncome,
  } = useAppSelector<AssetLiabilityState>(getAssetLiabilityState);

  const isCreateRequested = Boolean(createAssetLiabilityDetail?.request);
  const isCreateSuccess = Boolean(createAssetLiabilityDetail?.success);

  const isUpdateAssetsRequested = Boolean(updateAsset?.request);
  const isUpdateAssetsSuccess = Boolean(updateAsset?.success);

  const isUpdateYearlyIncomeRequested = Boolean(updateYearlyIncome?.request);
  const isUpdateYearlyIncomeSuccess = Boolean(updateYearlyIncome?.success);

  const isDeleteAssetRequested = Boolean(deleteAsset?.request);
  const isDeleteAssetSuccess = Boolean(deleteAsset?.success);

  const isDeleteYearlyIncomeRequested = Boolean(deleteYearlyIncome?.request);
  const isDeleteYearlyIncomeSuccess = Boolean(deleteYearlyIncome?.success);

  const assetLiabilityDetails = getAssetLiabilityDetail?.data || {};

  const createAssetLiabilityDetails = ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: CreateAssetLiabilityPropsType) => {
    dispatch(
      createAssetLiabilityDetailsRequest({
        data,
        electionSettingsId,
        candidateElectionDetailId,
      }),
    );
  };

  const updateAssetsHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    personalAssetId,
    data,
  }: UpdateAssetType) => {
    dispatch(
      updateAssetsRequest({
        data,
        electionSettingsId,
        candidateElectionDetailId,
        personalAssetId,
      }),
    );
  };

  const updateYearlyIncomeHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    yearlyIncomeExpenditureId,
    data,
  }: UpdateYearlyIncomeType) => {
    dispatch(
      updateYearlyIncomeRequest({
        data,
        electionSettingsId,
        candidateElectionDetailId,
        yearlyIncomeExpenditureId,
      }),
    );
  };

  const deleteAssetHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    personalAssetId,
  }: DeleteAssetType) => {
    dispatch(
      deleteAssetRequest({
        electionSettingsId,
        candidateElectionDetailId,
        personalAssetId,
      }),
    );
  };

  const deleteYearlyIncomeHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    yearlyIncomeExpenditureId,
  }: DeleteYearlyIncomeType) => {
    dispatch(
      deleteYearlyIncomeRequest({
        electionSettingsId,
        candidateElectionDetailId,
        yearlyIncomeExpenditureId,
      }),
    );
  };

  useEffect(() => {
    if (getOnMount) {
      dispatch(
        getAssetLiabilityDetailsRequest({
          electionSettingsId,
          candidateElectionDetailId,
        }),
      );
    }
  }, [dispatch, getOnMount, electionSettingsId, candidateElectionDetailId]);

  return {
    isCreateRequested,
    isCreateSuccess,

    isUpdateAssetsRequested,
    isUpdateAssetsSuccess,

    isUpdateYearlyIncomeRequested,
    isUpdateYearlyIncomeSuccess,

    isDeleteAssetRequested,
    isDeleteAssetSuccess,

    isDeleteYearlyIncomeRequested,
    isDeleteYearlyIncomeSuccess,

    assetLiabilityDetails,

    createAssetLiabilityDetails,
    updateAssetsHandler,
    updateYearlyIncomeHandler,
    deleteAssetHandler,
    deleteYearlyIncomeHandler,
  };
};
