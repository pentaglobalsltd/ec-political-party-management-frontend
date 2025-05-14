import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@helpers/redux';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { FirstPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/first-part-state';
import { getCandidateNominationFormFirstPartState } from '@selectors/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part-selector';
import {
  createFirstPartInitialState,
  createFirstPartRequest,
  getFirstPartInitialState,
  getFirstPartRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/first-part-actions';
import {
  FirstPartPropType,
  FirstPartType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';

interface UseCandidateNominationFormFirstPart {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  isCreateFailed: boolean;
  candidateNominationFormCreatedFirstPartData: string;
  createFirstPartInitialStateHandler: () => void;
  getFirstPartInitialStateHandler: () => void;
  candidateNominationFormFirstPart: FirstPartType;
  createCandidateNominationFormFirstPartInfo: (
    event: FirstPartPropType,
  ) => void;
}

export const useCandidateNominationFormFirstPart = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseCandidateNominationFormFirstPart => {
  const dispatch = useDispatch();

  const { createFirstPart, getFirstPart } = useAppSelector<FirstPartState>(
    getCandidateNominationFormFirstPartState,
  );

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      dispatch(
        getFirstPartRequest({ electionSettingsId, candidateElectionDetailsId }),
      );
    }
  }, [dispatch, electionSettingsId, candidateElectionDetailsId]);

  const isCreateRequested = Boolean(createFirstPart.request);
  const isCreateSuccess = Boolean(createFirstPart.success);
  const isCreateFailed = Boolean(createFirstPart.failed);
  const candidateNominationFormCreatedFirstPartData =
    createFirstPart.data || '';

  const candidateNominationFormFirstPart = getFirstPart?.data as FirstPartType;

  const createCandidateNominationFormFirstPartInfo = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: FirstPartPropType) => {
    dispatch(
      createFirstPartRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      }),
    );
  };
  const createFirstPartInitialStateHandler = () => {
    dispatch(createFirstPartInitialState());
  };

  const getFirstPartInitialStateHandler = () => {
    dispatch(getFirstPartInitialState());
  };

  return {
    isCreateRequested,
    isCreateSuccess,
    isCreateFailed,
    candidateNominationFormCreatedFirstPartData,
    candidateNominationFormFirstPart,
    createFirstPartInitialStateHandler,
    createCandidateNominationFormFirstPartInfo,
    getFirstPartInitialStateHandler,
  };
};
