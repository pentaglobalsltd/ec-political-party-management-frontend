import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

import {
  CREATE_LIABILITIES,
  DELETE_LIABILITY_CHILD,
  GET_LIABILITIES,
  GET_LIABILITY_CHILD,
  GET_LIABILITY_CHILDREN,
  UPDATE_LIABILITIES,
  UPDATE_LIABILITY_CHILD,
  GET_COMMITMENT_ACHIEVEMENT_CHILD,
  GET_COMMITMENT_ACHIEVEMENT_CHILDREN,
  UPDATE_COMMITMENT_ACHIEVEMENT_CHILD,
  DELETE_COMMITMENT_ACHIEVEMENT_CHILD,
} from './types';

import {
  CommitmentAchievementChildPropsType,
  CommitmentAchievementChildrenType,
  CommitmentAchievementChildType,
  CreateLiabilitiesPropsType,
  LiabilitiesType,
  LiabilityChildPropsType,
  LiabilityChildrenType,
  LiabilityChildType,
  UpdateCommitmentAchievementChildPropsType,
  UpdateLiabilityChildPropsType,
} from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';

export const createLiabilitiesRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: CreateLiabilitiesPropsType) => {
  return {
    type: CREATE_LIABILITIES.CREATE_LIABILITIES_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    } as const,
  };
};
export const createLiabilitiesInitialState = () => {
  return {
    type: CREATE_LIABILITIES.CREATE_LIABILITIES_INITIAL_STATE,
  };
};
export const createLiabilitiesSuccess = (data: LiabilitiesType) => {
  return {
    type: CREATE_LIABILITIES.CREATE_LIABILITIES_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const createLiabilitiesFailed = () => {
  return {
    type: CREATE_LIABILITIES.CREATE_LIABILITIES_FAILED,
  } as const;
};

export const getLiabilitiesRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_LIABILITIES.GET_LIABILITIES_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getLiabilitiesSuccess = (data: LiabilitiesType) => {
  return {
    type: GET_LIABILITIES.GET_LIABILITIES_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getLiabilitiesFailed = () => {
  return {
    type: GET_LIABILITIES.GET_LIABILITIES_FAILED,
  } as const;
};

export const updateLiabilitiesRequest = (data: LiabilitiesType) =>
  ({
    type: UPDATE_LIABILITIES.UPDATE_LIABILITIES_REQUEST,
    payload: {
      data,
    },
  } as const);

export const updateLiabilitiesSuccess = (data: LiabilitiesType) =>
  ({
    type: UPDATE_LIABILITIES.UPDATE_LIABILITIES_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateLiabilitiesFailed = () =>
  ({
    type: UPDATE_LIABILITIES.UPDATE_LIABILITIES_FAILED,
  } as const);

export const getLiabilityChildrenRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_LIABILITY_CHILDREN.GET_LIABILITY_CHILDREN_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getLiabilityChildrenSuccess = (data: LiabilityChildrenType) => {
  return {
    type: GET_LIABILITY_CHILDREN.GET_LIABILITY_CHILDREN_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getLiabilityChildrenFailed = () => {
  return {
    type: GET_LIABILITY_CHILDREN.GET_LIABILITY_CHILDREN_FAILED,
  } as const;
};

export const getLiabilityChildRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  liabilityId,
}: LiabilityChildPropsType) => {
  return {
    type: GET_LIABILITY_CHILD.GET_LIABILITY_CHILD_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      liabilityId,
    },
  } as const;
};

export const getLiabilityChildSuccess = (data: LiabilityChildType) => {
  return {
    type: GET_LIABILITY_CHILD.GET_LIABILITY_CHILD_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getLiabilityChildFailed = () => {
  return {
    type: GET_LIABILITY_CHILD.GET_LIABILITY_CHILD_FAILED,
  } as const;
};

export const updateLiabilityChildRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  liabilityId,
  data,
}: UpdateLiabilityChildPropsType) =>
  ({
    type: UPDATE_LIABILITY_CHILD.UPDATE_LIABILITY_CHILD_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      liabilityId,
      data,
    },
  } as const);

export const updateLiabilityChildSuccess = (data: LiabilityChildType) =>
  ({
    type: UPDATE_LIABILITY_CHILD.UPDATE_LIABILITY_CHILD_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateLiabilityChildFailed = () =>
  ({
    type: UPDATE_LIABILITY_CHILD.UPDATE_LIABILITY_CHILD_FAILED,
  } as const);

export const deleteLiabilityChildRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  liabilityId,
}: LiabilityChildPropsType) =>
  ({
    type: DELETE_LIABILITY_CHILD.DELETE_LIABILITY_CHILD_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      liabilityId,
    },
  } as const);

export const deleteLiabilityChildSuccess = (data: LiabilityChildType) =>
  ({
    type: DELETE_LIABILITY_CHILD.DELETE_LIABILITY_CHILD_SUCCESS,
    payload: { data },
  } as const);

export const deleteLiabilityChildFailed = () =>
  ({
    type: DELETE_LIABILITY_CHILD.DELETE_LIABILITY_CHILD_FAILED,
  } as const);

export const getCommitmentAchievementChildrenRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_COMMITMENT_ACHIEVEMENT_CHILDREN.GET_COMMITMENT_ACHIEVEMENT_CHILDREN_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getCommitmentAchievementChildrenSuccess = (
  data: CommitmentAchievementChildrenType,
) => {
  return {
    type: GET_COMMITMENT_ACHIEVEMENT_CHILDREN.GET_COMMITMENT_ACHIEVEMENT_CHILDREN_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getCommitmentAchievementChildrenFailed = () => {
  return {
    type: GET_COMMITMENT_ACHIEVEMENT_CHILDREN.GET_COMMITMENT_ACHIEVEMENT_CHILDREN_FAILED,
  } as const;
};

export const getCommitmentAchievementChildRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  commitmentAchievementId,
}: CommitmentAchievementChildPropsType) => {
  return {
    type: GET_COMMITMENT_ACHIEVEMENT_CHILD.GET_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      commitmentAchievementId,
    },
  } as const;
};

export const getCommitmentAchievementChildSuccess = (
  data: CommitmentAchievementChildType,
) => {
  return {
    type: GET_COMMITMENT_ACHIEVEMENT_CHILD.GET_COMMITMENT_ACHIEVEMENT_CHILD_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getCommitmentAchievementChildFailed = () => {
  return {
    type: GET_COMMITMENT_ACHIEVEMENT_CHILD.GET_COMMITMENT_ACHIEVEMENT_CHILD_FAILED,
  } as const;
};

export const updateCommitmentAchievementChildRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  commitmentAchievementId,
  data,
}: UpdateCommitmentAchievementChildPropsType) =>
  ({
    type: UPDATE_COMMITMENT_ACHIEVEMENT_CHILD.UPDATE_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      commitmentAchievementId,
      data,
    },
  } as const);

export const updateCommitmentAchievementChildSuccess = (
  data: CommitmentAchievementChildType,
) =>
  ({
    type: UPDATE_COMMITMENT_ACHIEVEMENT_CHILD.UPDATE_COMMITMENT_ACHIEVEMENT_CHILD_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateCommitmentAchievementChildFailed = () =>
  ({
    type: UPDATE_COMMITMENT_ACHIEVEMENT_CHILD.UPDATE_COMMITMENT_ACHIEVEMENT_CHILD_FAILED,
  } as const);

export const deleteCommitmentAchievementChildRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  commitmentAchievementId,
}: CommitmentAchievementChildPropsType) =>
  ({
    type: DELETE_COMMITMENT_ACHIEVEMENT_CHILD.DELETE_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      commitmentAchievementId,
    },
  } as const);

export const deleteCommitmentAchievementChildSuccess = (
  data: CommitmentAchievementChildType,
) =>
  ({
    type: DELETE_COMMITMENT_ACHIEVEMENT_CHILD.DELETE_COMMITMENT_ACHIEVEMENT_CHILD_SUCCESS,
    payload: { data },
  } as const);

export const deleteCommitmentAchievementChildFailed = () =>
  ({
    type: DELETE_COMMITMENT_ACHIEVEMENT_CHILD.DELETE_COMMITMENT_ACHIEVEMENT_CHILD_FAILED,
  } as const);
export type LiabilitiesActions =
  | ReturnType<typeof createLiabilitiesRequest>
  | ReturnType<typeof createLiabilitiesSuccess>
  | ReturnType<typeof createLiabilitiesFailed>
  | ReturnType<typeof createLiabilitiesInitialState>
  | ReturnType<typeof getLiabilitiesRequest>
  | ReturnType<typeof getLiabilitiesSuccess>
  | ReturnType<typeof getLiabilitiesFailed>
  | ReturnType<typeof getLiabilityChildrenRequest>
  | ReturnType<typeof getLiabilityChildrenSuccess>
  | ReturnType<typeof getLiabilityChildrenFailed>
  | ReturnType<typeof getLiabilityChildRequest>
  | ReturnType<typeof getLiabilityChildSuccess>
  | ReturnType<typeof getLiabilityChildFailed>
  | ReturnType<typeof updateLiabilityChildRequest>
  | ReturnType<typeof updateLiabilityChildSuccess>
  | ReturnType<typeof updateLiabilitiesFailed>
  | ReturnType<typeof deleteLiabilityChildRequest>
  | ReturnType<typeof deleteLiabilityChildSuccess>
  | ReturnType<typeof deleteLiabilityChildFailed>
  | ReturnType<typeof updateLiabilitiesRequest>
  | ReturnType<typeof updateLiabilitiesSuccess>
  | ReturnType<typeof updateLiabilitiesFailed>
  | ReturnType<typeof getCommitmentAchievementChildrenRequest>
  | ReturnType<typeof getCommitmentAchievementChildrenSuccess>
  | ReturnType<typeof getCommitmentAchievementChildrenFailed>
  | ReturnType<typeof getCommitmentAchievementChildRequest>
  | ReturnType<typeof getCommitmentAchievementChildSuccess>
  | ReturnType<typeof getCommitmentAchievementChildFailed>
  | ReturnType<typeof updateCommitmentAchievementChildFailed>
  | ReturnType<typeof updateCommitmentAchievementChildRequest>
  | ReturnType<typeof updateCommitmentAchievementChildSuccess>
  | ReturnType<typeof deleteCommitmentAchievementChildRequest>
  | ReturnType<typeof deleteCommitmentAchievementChildSuccess>
  | ReturnType<typeof deleteCommitmentAchievementChildFailed>;
