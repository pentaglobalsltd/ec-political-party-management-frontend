import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@helpers/redux';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { SecondPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/second-part-state';
import { getSecondPartState } from '@selectors/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part-selector';
import {
  createSecondPartInitialState,
  createSecondPartRequest,
  getSecondPartInitialState,
  getSecondPartRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/second-part-actions';
import {
  SecondPartPropType,
  SecondPartType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/second-part';

interface UseSecondPart {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  isCreateFailed: boolean;
  candidateNominationFormCrateSecondPartData: string;
  candidateNominationFormSecondPart: SecondPartType;
  createCandidateNominationFormSecondPart: (event: SecondPartPropType) => void;
  createSecondPartInitialStateHandler: () => void;
  getSecondPartInitialStateHandler: () => void;
}

export const useCandidateNominationFormSecondPart = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseSecondPart => {
  const dispatch = useDispatch();

  const { createSecondPart, getSecondPart } =
    useAppSelector<SecondPartState>(getSecondPartState);

  const isCreateRequested = Boolean(createSecondPart.request);
  const isCreateSuccess = Boolean(createSecondPart.success);
  const isCreateFailed = Boolean(createSecondPart.failed);

  const candidateNominationFormSecondPart =
    getSecondPart.data as SecondPartType;

  const candidateNominationFormCrateSecondPartData =
    createSecondPart.data || '';

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      dispatch(
        getSecondPartRequest({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );
    }
  }, [dispatch, electionSettingsId, candidateElectionDetailsId]);

  const createCandidateNominationFormSecondPart = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: SecondPartPropType) => {
    dispatch(
      createSecondPartRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      }),
    );
  };

  const createSecondPartInitialStateHandler = () => {
    dispatch(createSecondPartInitialState());
  };

  const getSecondPartInitialStateHandler = () => {
    dispatch(getSecondPartInitialState());
  };

  return {
    isCreateRequested,
    isCreateSuccess,
    isCreateFailed,
    candidateNominationFormCrateSecondPartData,
    candidateNominationFormSecondPart,
    createCandidateNominationFormSecondPart,
    createSecondPartInitialStateHandler,
    getSecondPartInitialStateHandler,
  };
};
