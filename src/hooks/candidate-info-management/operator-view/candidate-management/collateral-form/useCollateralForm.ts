import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  getCollateralFormInfoRequest,
  updateCollateralFormInfoRequest,
  updateCollateralFormInfoReset,
} from '@actions/candidate-info-management/operator-view/candidate-management/collateral-form/collateral-form-actions';
import { CollateralFormState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/collateral-form-state';
import { getCollateralFormState } from '@selectors/candidate-info-management/operator-view/candidate-management/collateral-form/collateral-form-selector';
import {
  GetJamanatPropsType,
  UpdateJamanatPropsType,
} from '@type/candidate-info-management/candidate-confirmation/collateral-form';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { useAppSelector } from '@helpers/redux';

interface UseCollateralForm {
  isGetRequested: boolean;
  collateralData: GetJamanatPropsType;
  isUpdateRequested: boolean;
  isUpdateSuccess: boolean;
  updateCollateralFormHandler: ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: UpdateJamanatPropsType) => void;
  updateCollateralFormResetHandler: () => void;
  getCollateralFormData: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlIdTypes) => void;
}

export const useCollateralForm = ({
  electionSettingsId,
  candidateElectionDetailId,
}: UrlIdTypes): UseCollateralForm => {
  const dispatch = useDispatch();

  const { getCollateralForm, updateCollateralForm } =
    useAppSelector<CollateralFormState>(getCollateralFormState);

  const collateralData = getCollateralForm?.data || {};

  const isGetRequested = Boolean(getCollateralForm?.request);
  const isUpdateRequested = Boolean(updateCollateralForm?.request);
  const isUpdateSuccess = Boolean(updateCollateralForm?.success);

  useEffect(() => {
    dispatch(
      getCollateralFormInfoRequest({
        electionSettingsId,
        candidateElectionDetailId,
      }),
    );
  }, [dispatch, candidateElectionDetailId, electionSettingsId]);

  const updateCollateralFormHandler = ({
    electionSettingsId,
    candidateElectionDetailId,
    data,
  }: UpdateJamanatPropsType) => {
    dispatch(
      updateCollateralFormInfoRequest({
        electionSettingsId,
        candidateElectionDetailId,
        data,
      }),
    );
  };

  const updateCollateralFormResetHandler = () => {
    dispatch(updateCollateralFormInfoReset());
  };

  const getCollateralFormData = () =>
    dispatch(
      getCollateralFormInfoRequest({
        electionSettingsId,
        candidateElectionDetailId,
      }),
    );

  return {
    isGetRequested,
    collateralData,
    updateCollateralFormHandler,
    updateCollateralFormResetHandler,
    isUpdateRequested,
    isUpdateSuccess,
    getCollateralFormData,
  };
};
