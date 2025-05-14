import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  createIncomeSourceDetailsRequest,
  deleteOtherFundingRequest,
  deleteRelativeFundingRequest,
  deleteSelfFundingRequest,
  getIncomeSourceDetailsRequest,
  updateOtherFundingRequest,
  updateRelativeFundingRequest,
  updateSelfFundingRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-first-part-actions';
import { useAppSelector } from '@helpers/redux';
import { IncomeSourceDetailsState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/income-source-details/income-source-details-first-step-state';
import { getIncomeSourceDetailsState } from '@selectors/candidate-info-management/operator-view/candidate-management/income-source-details/income-source-details-selector';
import {
  CreateIncomeSourceDetailsType,
  IncomeSourceDetailsType,
  OtherFundingURLType,
  RelativeFundingURLType,
  SelfFundingURLType,
  UpdateOtherFundingType,
  UpdateRelativeFundingType,
  UpdateSelfFundingType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-first-part';
import { UrlType } from '@type/url-type';

interface UseIncomeSourceDetails {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;

  isUpdateSelfFundingRequested: boolean;
  isUpdateSelfFundingSuccess: boolean;

  isUpdateRelativeFundingRequested: boolean;
  isUpdateRelativeFundingSuccess: boolean;

  isUpdateOtherFundingRequested: boolean;
  isUpdateOtherFundingSuccess: boolean;

  isDeleteOtherFundingRequest: boolean;
  isDeleteOtherFundingSuccess: boolean;

  isDeleteSelfFundingRequest: boolean;
  isDeleteSelfFundingSuccess: boolean;

  isDeleteRelativeRequest: boolean;
  isDeleteRelativeSuccess: boolean;

  incomeSourceDetails: IncomeSourceDetailsType;
  createIncomeDetails: ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: CreateIncomeSourceDetailsType) => void;
  updateSelfFundingHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    selfFundingId,
  }: UpdateSelfFundingType) => void;
  updateRelativeFundingHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    relativeFundingId,
  }: UpdateRelativeFundingType) => void;
  updateOtherFundingHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    otherFundingId,
  }: UpdateOtherFundingType) => void;

  deleteSelfFundingHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    selfFundingId,
  }: SelfFundingURLType) => void;

  deleteRelativeFundingHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    relativeFundingId,
  }: RelativeFundingURLType) => void;

  deleteOtherFundingHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    otherFundingId,
  }: OtherFundingURLType) => void;
}

export const useIncomeSourceDetails = ({
  electionSettingsId,
  candidateElectionDetailId,
  getOnMount,
}: UrlType): UseIncomeSourceDetails => {
  const dispatch = useDispatch();
  const {
    createIncomeSourceDetails,
    getIncomeSourceDetails,
    updateSelfFunding,
    updateRelativeFunding,
    updateOtherFunding,
    deleteSelfFunding,
    deleteRelativeFunding,
    deleteOtherFunding,
  } = useAppSelector<IncomeSourceDetailsState>(getIncomeSourceDetailsState);

  const isCreateRequested = Boolean(createIncomeSourceDetails.request);
  const isCreateSuccess = Boolean(createIncomeSourceDetails.success);

  const isUpdateSelfFundingRequested = Boolean(updateSelfFunding.request);
  const isUpdateSelfFundingSuccess = Boolean(updateSelfFunding.success);

  const isUpdateRelativeFundingRequested = Boolean(
    updateRelativeFunding.request,
  );
  const isUpdateRelativeFundingSuccess = Boolean(updateRelativeFunding.success);

  const isUpdateOtherFundingRequested = Boolean(updateOtherFunding.request);
  const isUpdateOtherFundingSuccess = Boolean(updateOtherFunding.success);

  const isDeleteSelfFundingRequest = Boolean(deleteSelfFunding.request);
  const isDeleteSelfFundingSuccess = Boolean(deleteSelfFunding.success);

  const isDeleteRelativeRequest = Boolean(deleteRelativeFunding.request);
  const isDeleteRelativeSuccess = Boolean(deleteRelativeFunding.success);

  const isDeleteOtherFundingRequest = Boolean(deleteOtherFunding.request);
  const isDeleteOtherFundingSuccess = Boolean(deleteOtherFunding.success);

  const incomeSourceDetails = getIncomeSourceDetails.data || {};

  useEffect(() => {
    if (getOnMount) {
      dispatch(
        getIncomeSourceDetailsRequest({
          electionSettingsId,
          candidateElectionDetailId,
        }),
      );
    }
  }, [candidateElectionDetailId, electionSettingsId, dispatch, getOnMount]);

  const createIncomeDetails = ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: CreateIncomeSourceDetailsType) => {
    dispatch(
      createIncomeSourceDetailsRequest({
        electionSettingsId,
        candidateElectionDetailId,
        data,
      }),
    );
  };

  const updateSelfFundingHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    selfFundingId,
  }: UpdateSelfFundingType) => {
    dispatch(
      updateSelfFundingRequest({
        data,
        electionSettingsId,
        candidateElectionDetailId,
        selfFundingId,
      }),
    );
  };

  const updateRelativeFundingHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    relativeFundingId,
  }: UpdateRelativeFundingType) => {
    dispatch(
      updateRelativeFundingRequest({
        data,
        electionSettingsId,
        candidateElectionDetailId,
        relativeFundingId,
      }),
    );
  };

  const updateOtherFundingHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
    otherFundingId,
  }: UpdateOtherFundingType) => {
    dispatch(
      updateOtherFundingRequest({
        data,
        electionSettingsId,
        candidateElectionDetailId,
        otherFundingId,
      }),
    );
  };

  const deleteSelfFundingHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    selfFundingId,
  }: SelfFundingURLType) => {
    dispatch(
      deleteSelfFundingRequest({
        electionSettingsId,
        candidateElectionDetailId,
        selfFundingId,
      }),
    );
  };

  const deleteRelativeFundingHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    relativeFundingId,
  }: RelativeFundingURLType) => {
    dispatch(
      deleteRelativeFundingRequest({
        electionSettingsId,
        candidateElectionDetailId,
        relativeFundingId,
      }),
    );
  };

  const deleteOtherFundingHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    otherFundingId,
  }: OtherFundingURLType) => {
    dispatch(
      deleteOtherFundingRequest({
        electionSettingsId,
        candidateElectionDetailId,
        otherFundingId,
      }),
    );
  };

  return {
    isCreateRequested,
    isCreateSuccess,

    isUpdateSelfFundingRequested,
    isUpdateSelfFundingSuccess,

    isUpdateRelativeFundingRequested,
    isUpdateRelativeFundingSuccess,

    isUpdateOtherFundingRequested,
    isUpdateOtherFundingSuccess,

    incomeSourceDetails,

    isDeleteSelfFundingRequest,
    isDeleteSelfFundingSuccess,

    isDeleteRelativeRequest,
    isDeleteRelativeSuccess,

    isDeleteOtherFundingRequest,
    isDeleteOtherFundingSuccess,

    createIncomeDetails,
    updateSelfFundingHandler,
    updateRelativeFundingHandler,
    updateOtherFundingHandler,
    deleteSelfFundingHandler,
    deleteRelativeFundingHandler,
    deleteOtherFundingHandler,
  };
};
