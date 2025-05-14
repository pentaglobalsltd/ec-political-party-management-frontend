import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@helpers/redux';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { FourthPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part-state';
import { getCandidateNominationFormFourthPartState } from '@selectors/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part-selector';
import {
  createFourthPartRequest,
  getFourthPartInitialState,
  getFourthPartRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/fourth-part-actions';
import {
  FourthPartMapDataType,
  FourthPartPropType,
} from '@type/candidate-info-management/operator-view/candidate-nomination-form/fourth-part';
interface UseCandidateNominationFormFirstPart {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  candidateNominationFormFourthPart: FourthPartMapDataType;
  getFourthPartInitialStateHandler: () => void;
  createCandidateNominationFormFourthPartInfo: (
    event: FourthPartPropType,
  ) => void;
}

export const useCandidateNominationFormFourthPart = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes): UseCandidateNominationFormFirstPart => {
  const dispatch = useDispatch();

  const { createFourthPart, getFourthPart } = useAppSelector<FourthPartState>(
    getCandidateNominationFormFourthPartState,
  );

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId) {
      dispatch(
        getFourthPartRequest({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );
    }
  }, [dispatch, electionSettingsId, candidateElectionDetailsId]);

  const isCreateRequested = Boolean(createFourthPart.request);
  const isCreateSuccess = Boolean(createFourthPart.success);

  const candidateNominationFormFourthPart = getFourthPart?.data || {};

  const createCandidateNominationFormFourthPartInfo = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: FourthPartPropType) => {
    dispatch(
      createFourthPartRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      }),
    );
  };

  const getFourthPartInitialStateHandler = () => {
    dispatch(getFourthPartInitialState());
  };

  return {
    isCreateRequested,
    isCreateSuccess,
    candidateNominationFormFourthPart,
    createCandidateNominationFormFourthPartInfo,
    getFourthPartInitialStateHandler,
  };
};
