import {
  CandidateChildPropsType,
  CandidateChildrenType,
  CandidatePersonalInformationType,
  ChildType,
  CreateCandidateInfoPropsType,
  UpdateCandidatePropsType,
} from '@type/candidate-info-management/operator-view/candidatePersonalInformation';
import {
  CREATE_CANDIDATE_PERSONAL_INFO,
  DELETE_CANDIDATE_CHILD,
  GET_CANDIDATE_CHILD,
  GET_CANDIDATE_CHILDREN,
  GET_CANDIDATE_PERSONAL_INFO,
  UPDATE_CANDIDATE_CHILD,
} from './types';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

export const createCandidatePersonalInformationRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: CreateCandidateInfoPropsType) => {
  return {
    type: CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INFO_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailsId,
    } as const,
  };
};

export const createCandidatePersonalInformationSuccess = (
  data: CandidatePersonalInformationType,
) => {
  return {
    type: CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INFO_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const createCandidatePersonalInformationFailed = () => {
  return {
    type: CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INFO_FAILED,
  } as const;
};

export const getCandidatePersonalInformationRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_CANDIDATE_PERSONAL_INFO.GET_CANDIDATE_PERSONAL_INFO_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getCandidatePersonalInformationSuccess = (
  data: CandidatePersonalInformationType,
) => {
  return {
    type: GET_CANDIDATE_PERSONAL_INFO.GET_CANDIDATE_PERSONAL_INFO_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getCandidatePersonalInformationFailed = () => {
  return {
    type: GET_CANDIDATE_PERSONAL_INFO.GET_CANDIDATE_PERSONAL_INFO_FAILED,
  } as const;
};

export const getCandidateChildrenRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_CANDIDATE_CHILDREN.GET_CANDIDATE_CHILDREN_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getCandidateChildrenSuccess = (data: CandidateChildrenType) => {
  return {
    type: GET_CANDIDATE_CHILDREN.GET_CANDIDATE_CHILDREN_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getCandidateChildrenFailed = () => {
  return {
    type: GET_CANDIDATE_CHILDREN.GET_CANDIDATE_CHILDREN_FAILED,
  } as const;
};

export const getCandidateChildRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  childId,
}: CandidateChildPropsType) => {
  return {
    type: GET_CANDIDATE_CHILD.GET_CANDIDATE_CHILD_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      childId,
    },
  } as const;
};

export const getCandidateChildSuccess = (data: ChildType) => {
  return {
    type: GET_CANDIDATE_CHILD.GET_CANDIDATE_CHILD_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getCandidateChildFailed = () => {
  return {
    type: GET_CANDIDATE_CHILD.GET_CANDIDATE_CHILD_FAILED,
  } as const;
};

export const updateCandidateChildRequest = ({
  data,
  electionSettingsId,
  candidateElectionDetailsId,
  childId,
}: UpdateCandidatePropsType) =>
  ({
    type: UPDATE_CANDIDATE_CHILD.UPDATE_CANDIDATE_CHILD_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailsId,
      childId,
    },
  } as const);

export const updateCandidateChildSuccess = (data: ChildType) =>
  ({
    type: UPDATE_CANDIDATE_CHILD.UPDATE_CANDIDATE_CHILD_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updateCandidateChildFailed = () =>
  ({
    type: UPDATE_CANDIDATE_CHILD.UPDATE_CANDIDATE_CHILD_FAILED,
  } as const);

export const deleteCandidateChildRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  childId,
}: CandidateChildPropsType) =>
  ({
    type: DELETE_CANDIDATE_CHILD.DELETE_CANDIDATE_CHILD_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      childId,
    },
  } as const);

export const deleteCandidateChildSuccess = (data: ChildType) =>
  ({
    type: DELETE_CANDIDATE_CHILD.DELETE_CANDIDATE_CHILD_SUCCESS,
    payload: { data },
  } as const);

export const deleteCandidateChildFailed = () =>
  ({
    type: DELETE_CANDIDATE_CHILD.DELETE_CANDIDATE_CHILD_FAILED,
  } as const);
export const createCandidateChildInitialState = () =>
  ({
    type: CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INITIAL_STATE,
  } as const);

export type CandidatePersonalInformationActions =
  | ReturnType<typeof createCandidatePersonalInformationRequest>
  | ReturnType<typeof createCandidatePersonalInformationSuccess>
  | ReturnType<typeof createCandidatePersonalInformationFailed>
  | ReturnType<typeof createCandidateChildInitialState>
  | ReturnType<typeof getCandidatePersonalInformationRequest>
  | ReturnType<typeof getCandidatePersonalInformationSuccess>
  | ReturnType<typeof getCandidatePersonalInformationFailed>
  | ReturnType<typeof getCandidateChildrenRequest>
  | ReturnType<typeof getCandidateChildrenSuccess>
  | ReturnType<typeof getCandidateChildrenFailed>
  | ReturnType<typeof getCandidateChildFailed>
  | ReturnType<typeof getCandidateChildRequest>
  | ReturnType<typeof getCandidateChildSuccess>
  | ReturnType<typeof updateCandidateChildRequest>
  | ReturnType<typeof updateCandidateChildSuccess>
  | ReturnType<typeof updateCandidateChildFailed>
  | ReturnType<typeof deleteCandidateChildRequest>
  | ReturnType<typeof deleteCandidateChildSuccess>
  | ReturnType<typeof deleteCandidateChildFailed>;
