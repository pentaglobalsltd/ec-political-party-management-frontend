import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  LiabilitiesType,
  LiabilityChildType,
  LiabilityChildrenType,
  UpdateLiabilityChildPropsType,
  LiabilityChildPropsType,
  CommitmentAchievementChildType,
  CommitmentAchievementChildrenType,
  CommitmentAchievementChildPropsType,
  UpdateCommitmentAchievementChildPropsType,
  CreateLiabilitiesPropsType,
  hookLiabilitiesProp,
} from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';

import {
  createLiabilitiesRequest,
  getLiabilitiesRequest,
  updateLiabilitiesRequest,
  getLiabilityChildrenRequest,
  getLiabilityChildRequest,
  updateLiabilityChildRequest,
  deleteLiabilityChildRequest,
  getCommitmentAchievementChildRequest,
  deleteCommitmentAchievementChildRequest,
  updateCommitmentAchievementChildRequest,
  getCommitmentAchievementChildrenRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';
import { useAppSelector } from '@helpers/redux';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { LiabilitiesState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/liabilities-state';
import { getLiabilitiesState } from '@selectors/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-selector';

interface UseLiabilities {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  isUpdateRequestedLiabilityChild: boolean;
  isUpdateSuccessLiabilityChild: boolean;
  isDeleteRequestedLiabilityChild: boolean;
  isDeleteSuccessLiabilityChild: boolean;
  isUpdateRequestedCommitmentAchievementChild: boolean;
  isUpdateSuccessCommitmentAchievementChild: boolean;
  isDeleteRequestedCommitmentAchievementChild: boolean;
  isDeleteSuccessCommitmentAchievementChild: boolean;
  liabilityLoanOath: LiabilitiesType;
  liabilityChildren: LiabilityChildrenType | {};
  liabilityChild: LiabilityChildType | {};
  updatedLiabilityChild: LiabilityChildType;
  deletedLiabilityChild: LiabilityChildType;
  commitmentAchievementChildren: CommitmentAchievementChildrenType | {};
  commitmentAchievementChild: CommitmentAchievementChildType | {};
  updatedCommitmentAchievementChild: CommitmentAchievementChildType;
  deletedCommitmentAchievementChild: CommitmentAchievementChildType;
  createAffidavitLiabilities: (event: CreateLiabilitiesPropsType) => void;
  updateAffidavitLiabilities: (event: LiabilitiesType) => void;
  getLiabilityChildrenHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) => void;
  getCommitmentAchievementChildrenHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) => void;
  getLiabilityChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType) => void;
  getCommitmentAchievementChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType) => void;
  updateLiabilityChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    liabilityId,
  }: UpdateLiabilityChildPropsType) => void;
  updateCommitmentAchievementChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    commitmentAchievementId,
  }: UpdateCommitmentAchievementChildPropsType) => void;
  deleteLiabilityChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType) => void;
  deleteCommitmentAchievementChildHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType) => void;
}

export const useLiabilities = ({
  electionSettingsId,
  candidateElectionDetailsId,
  isGetLiabilities,
}: hookLiabilitiesProp): UseLiabilities => {
  const dispatch = useDispatch();
  const {
    createLiabilities,
    getLiabilities,
    getLiabilityChildren,
    getLiabilityChild,
    updateLiabilityChild,
    deleteLiabilityChild,
    updateCommitmentAchievementChild,
    deleteCommitmentAchievementChild,
    getCommitmentAchievementChildren,
    getCommitmentAchievementChild,
  } = useAppSelector<LiabilitiesState>(getLiabilitiesState);

  const isCreateRequested = Boolean(createLiabilities.request);
  const isCreateSuccess = Boolean(createLiabilities.success);

  const isUpdateRequestedLiabilityChild = Boolean(updateLiabilityChild.request);
  const isUpdateSuccessLiabilityChild = Boolean(updateLiabilityChild.success);

  const isDeleteRequestedLiabilityChild = Boolean(deleteLiabilityChild.request);
  const isDeleteSuccessLiabilityChild = Boolean(deleteLiabilityChild.success);

  const isUpdateRequestedCommitmentAchievementChild = Boolean(
    updateCommitmentAchievementChild.request,
  );
  const isUpdateSuccessCommitmentAchievementChild = Boolean(
    updateCommitmentAchievementChild.success,
  );
  const isDeleteRequestedCommitmentAchievementChild = Boolean(
    deleteCommitmentAchievementChild.request,
  );
  const isDeleteSuccessCommitmentAchievementChild = Boolean(
    deleteCommitmentAchievementChild.success,
  );
  const liabilityLoanOath = getLiabilities?.data || {};
  const liabilityChildren = getLiabilityChildren?.data || {};
  const liabilityChild = getLiabilityChild?.data || {};
  const updatedLiabilityChild = updateLiabilityChild?.data || {};
  const deletedLiabilityChild = deleteLiabilityChild?.data || {};

  const commitmentAchievementChildren =
    getCommitmentAchievementChildren?.data || {};
  const commitmentAchievementChild = getCommitmentAchievementChild?.data || {};
  const updatedCommitmentAchievementChild =
    updateCommitmentAchievementChild?.data || {};
  const deletedCommitmentAchievementChild =
    deleteCommitmentAchievementChild?.data || {};

  useEffect(() => {
    if (electionSettingsId && candidateElectionDetailsId && isGetLiabilities) {
      dispatch(
        getLiabilitiesRequest({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );
    }
  }, [
    dispatch,
    electionSettingsId,
    candidateElectionDetailsId,
    isGetLiabilities,
  ]);
  const createAffidavitLiabilities = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateLiabilitiesPropsType) => {
    dispatch(
      createLiabilitiesRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      }),
    );
  };

  const updateAffidavitLiabilities = (event: LiabilitiesType) => {
    dispatch(updateLiabilitiesRequest(event));
  };
  const getLiabilityChildrenHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) => {
    dispatch(
      getLiabilityChildrenRequest({
        electionSettingsId,
        candidateElectionDetailsId,
      }),
    );
  };

  const getLiabilityChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType) => {
    dispatch(
      getLiabilityChildRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        liabilityId,
      }),
    );
  };

  const updateLiabilityChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    liabilityId,
  }: UpdateLiabilityChildPropsType) => {
    dispatch(
      updateLiabilityChildRequest({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
        liabilityId,
      }),
    );
  };

  const deleteLiabilityChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType) => {
    dispatch(
      deleteLiabilityChildRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        liabilityId,
      }),
    );
  };

  const getCommitmentAchievementChildrenHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) => {
    dispatch(
      getCommitmentAchievementChildrenRequest({
        electionSettingsId,
        candidateElectionDetailsId,
      }),
    );
  };

  const getCommitmentAchievementChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType) => {
    dispatch(
      getCommitmentAchievementChildRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        commitmentAchievementId,
      }),
    );
  };

  const updateCommitmentAchievementChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    commitmentAchievementId,
  }: UpdateCommitmentAchievementChildPropsType) => {
    dispatch(
      updateCommitmentAchievementChildRequest({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
        commitmentAchievementId,
      }),
    );
  };

  const deleteCommitmentAchievementChildHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType) => {
    dispatch(
      deleteCommitmentAchievementChildRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        commitmentAchievementId,
      }),
    );
  };
  return {
    isCreateRequested,
    isCreateSuccess,
    isUpdateRequestedLiabilityChild,
    isUpdateSuccessLiabilityChild,
    isDeleteRequestedLiabilityChild,
    isDeleteSuccessLiabilityChild,
    isUpdateRequestedCommitmentAchievementChild,
    isUpdateSuccessCommitmentAchievementChild,
    isDeleteRequestedCommitmentAchievementChild,
    isDeleteSuccessCommitmentAchievementChild,
    liabilityChildren,
    liabilityChild,
    liabilityLoanOath,
    createAffidavitLiabilities,
    updateAffidavitLiabilities,
    updateLiabilityChildHandler,
    deleteLiabilityChildHandler,
    getLiabilityChildrenHandler,
    getLiabilityChildHandler,
    updatedLiabilityChild,
    deletedLiabilityChild,
    commitmentAchievementChildren,
    commitmentAchievementChild,
    updatedCommitmentAchievementChild,
    deletedCommitmentAchievementChild,
    deleteCommitmentAchievementChildHandler,
    updateCommitmentAchievementChildHandler,
    getCommitmentAchievementChildrenHandler,
    getCommitmentAchievementChildHandler,
  };
};
