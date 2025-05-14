import {
  createThirdPartRequest,
  getThirdPartInitialState,
  getThirdPartRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/third-part-actions';
import { useAppSelector } from '@helpers/redux';
import { ThirdPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/third-part-state';
import { getThirdPartState } from '@selectors/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part-selector';

import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import {
  ThirdPartPropType,
  ThirdPartType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface UseThirdPart {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  candidateNominationFormThirdPart: ThirdPartType;
  createCandidateNominationFormThirdPartData: (
    event: ThirdPartPropType,
  ) => void;
  getThirdPartInitialStateHandler: () => void;
}

export const useCandidateNominationFormThirdPart = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseThirdPart => {
  const dispatch = useDispatch();

  const { createThirdPart, getThirdPart } =
    useAppSelector<ThirdPartState>(getThirdPartState);

  const isCreateRequested = Boolean(createThirdPart.request);
  const isCreateSuccess = Boolean(createThirdPart.success);

  const candidateNominationFormThirdPart = getThirdPart.data || {};

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      dispatch(
        getThirdPartRequest({ electionSettingsId, candidateElectionDetailsId }),
      );
    }
  }, [dispatch, electionSettingsId, candidateElectionDetailsId]);

  const createCandidateNominationFormThirdPartData = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: ThirdPartPropType) => {
    dispatch(
      createThirdPartRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      }),
    );
  };

  const getThirdPartInitialStateHandler = () => {
    dispatch(getThirdPartInitialState());
  };

  return {
    isCreateRequested,
    isCreateSuccess,
    candidateNominationFormThirdPart: candidateNominationFormThirdPart,
    createCandidateNominationFormThirdPartData,
    getThirdPartInitialStateHandler,
  };
};
