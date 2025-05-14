import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  createCandidatePersonalInformationRequest,
  getCandidatePersonalInformationRequest,
  getCandidateChildrenRequest,
  updateCandidateChildRequest,
  deleteCandidateChildRequest,
  getCandidateChildRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';

import {
  CandidateChildUrlType,
  CandidateChildrenType,
  CandidatePersonalInformationType,
  ChildType,
  CreateCandidateInfoPropsType,
  UpdateCandidatePropsType,
} from '@type/candidate-info-management/operator-view/candidatePersonalInformation';

import { useAppSelector } from '@helpers/redux';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { CandidatePersonalInformationState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-personal-information-state';
import { getCandidatePersonalInformationState } from '@selectors/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-selector';

interface UseCandidatePersonalInformation {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  isUpdateRequested: boolean;
  isUpdateSuccess: boolean;
  isDeleteRequested: boolean;
  isDeleteSuccess: boolean;
  candidatePersonalInformation: CandidatePersonalInformationType;
  candidateChildren: CandidateChildrenType | {};
  candidateChild: ChildType | {};
  updatedCandidateChild: ChildType;
  deletedCandidateChild: ChildType;
  createCandidatePersonalInfo: ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateCandidateInfoPropsType) => void;
  getCandidateChildrenHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) => void;

  getCandidateChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildUrlType) => void;

  updateCandidateChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    childId,
  }: UpdateCandidatePropsType) => void;

  deleteCandidateChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildUrlType) => void;
}

export const useCandidatePersonalInformation = ({
  electionSettingsId,
  candidateElectionDetailsId,
  isGetPersonalInfo,
}: UrlIdTypes): UseCandidatePersonalInformation => {
  const dispatch = useDispatch();
  const {
    createCandidatePersonalInformation,
    getCandidatePersonalInformation,
    getCandidateChildren,
    getCandidateChild,
    updateCandidateChild,
    deleteCandidateChild,
  } = useAppSelector<CandidatePersonalInformationState>(
    getCandidatePersonalInformationState,
  );

  const isCreateRequested = Boolean(createCandidatePersonalInformation.request);
  const isCreateSuccess = Boolean(createCandidatePersonalInformation.success);

  const isUpdateRequested = Boolean(updateCandidateChild.request);
  const isUpdateSuccess = Boolean(updateCandidateChild.success);

  const isDeleteRequested = Boolean(deleteCandidateChild.request);
  const isDeleteSuccess = Boolean(deleteCandidateChild.success);

  const candidatePersonalInformation =
    getCandidatePersonalInformation.data || {};

  const candidateChildren = getCandidateChildren.data || {};

  const candidateChild = getCandidateChild.data || {};

  const updatedCandidateChild = updateCandidateChild.data || {};

  const deletedCandidateChild = deleteCandidateChild.data || {};

  const createCandidatePersonalInfo = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateCandidateInfoPropsType) => {
    dispatch(
      createCandidatePersonalInformationRequest({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
      }),
    );
  };

  const getCandidateChildrenHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) => {
    dispatch(
      getCandidateChildrenRequest({
        electionSettingsId,
        candidateElectionDetailsId,
      }),
    );
  };

  const getCandidateChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildUrlType) => {
    dispatch(
      getCandidateChildRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        childId,
      }),
    );
  };

  const updateCandidateChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    childId,
  }: UpdateCandidatePropsType) => {
    dispatch(
      updateCandidateChildRequest({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
        childId,
      }),
    );
  };

  const deleteCandidateChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildUrlType) => {
    dispatch(
      deleteCandidateChildRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        childId,
      }),
    );
  };

  useEffect(() => {
    if (isGetPersonalInfo) {
      if (electionSettingsId && candidateElectionDetailsId) {
        dispatch(
          getCandidatePersonalInformationRequest({
            electionSettingsId,
            candidateElectionDetailsId,
          }),
        );
      }
    }
  }, [
    dispatch,
    electionSettingsId,
    candidateElectionDetailsId,
    isGetPersonalInfo,
  ]);

  return {
    isCreateRequested,
    isCreateSuccess,
    isUpdateRequested,
    isUpdateSuccess,
    isDeleteRequested,
    isDeleteSuccess,
    candidatePersonalInformation,
    candidateChildren,
    candidateChild,
    createCandidatePersonalInfo,
    getCandidateChildrenHandler,
    getCandidateChildHandler,
    updateCandidateChildHandler,
    updatedCandidateChild,
    deletedCandidateChild,
    deleteCandidateChildHandler,
  };
};
