import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';

import {
  CREATE_AFFIDAVIT_STEP_ONE,
  UPDATE_AFFIDAVIT_STEP_ONE,
  GET_AFFIDAVIT_STEP_ONE,
  GET_ALL_PRESENT_CASE,
  GET_PRESENT_CASE,
  UPDATE_PRESENT_CASE,
  DELETE_PRESENT_CASE,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/types';

import {
  AffidavitStepOneType,
  AllPresentCaseType,
  PresentCaseType,
  CreateAffidavitStepOnePropsType,
  PresentCaseUrlType,
} from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';

export const createAffidavitStepOneRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
}: CreateAffidavitStepOnePropsType) => {
  return {
    type: CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    } as const,
  };
};
export const createAffidavitStepOneInitialState = () => {
  return {
    type: CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_INITIAL_STATE,
  };
};
export const createAffidavitStepOneSuccess = (data: AffidavitStepOneType) => {
  return {
    type: CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const createAffidavitStepOneFailed = () => {
  return {
    type: CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_FAILED,
  } as const;
};

export const getAffidavitStepOneRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
}: UrlIdTypes) => {
  return {
    type: GET_AFFIDAVIT_STEP_ONE.GET_AFFIDAVIT_STEP_ONE_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
    },
  } as const;
};

export const getAffidavitStepOneSuccess = (data: AffidavitStepOneType) => {
  return {
    type: GET_AFFIDAVIT_STEP_ONE.GET_AFFIDAVIT_STEP_ONE_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const getAffidavitStepOneFailed = () => {
  return {
    type: GET_AFFIDAVIT_STEP_ONE.GET_AFFIDAVIT_STEP_ONE_FAILED,
  } as const;
};

export const updateAffidavitStepOneRequest = (data: AffidavitStepOneType) => {
  return {
    type: UPDATE_AFFIDAVIT_STEP_ONE.UPDATE_AFFIDAVIT_STEP_ONE_REQUEST,
    payload: {
      data,
    },
  } as const;
};

export const updateAffidavitStepOneSuccess = (data: AffidavitStepOneType) => {
  return {
    type: UPDATE_AFFIDAVIT_STEP_ONE.UPDATE_AFFIDAVIT_STEP_ONE_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const updateAffidavitStepOneFailed = () => {
  return {
    type: UPDATE_AFFIDAVIT_STEP_ONE.UPDATE_AFFIDAVIT_STEP_ONE_FAILED,
  } as const;
};

export const getAllPresentCaseRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  caseType,
}: any) => {
  return {
    type: GET_ALL_PRESENT_CASE.GET_ALL_PRESENT_CASE_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      caseType,
    },
  } as const;
};

export const getAllPresentCaseSuccess = (
  data: AllPresentCaseType,
  caseType: string,
) => {
  return {
    type: GET_ALL_PRESENT_CASE.GET_ALL_PRESENT_CASE_SUCCESS,
    payload: {
      data,
      caseType,
    } as const,
  };
};

export const getAllPresentCaseFailed = () => {
  return {
    type: GET_ALL_PRESENT_CASE.GET_ALL_PRESENT_CASE_FAILED,
  } as const;
};

export const getPresentCaseRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  caseId,
}: PresentCaseUrlType) => {
  return {
    type: GET_PRESENT_CASE.GET_PRESENT_CASE_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      caseId,
    },
  } as const;
};

export const getPresentCaseSuccess = (data: PresentCaseType) => {
  return {
    type: GET_PRESENT_CASE.GET_PRESENT_CASE_SUCCESS,
    payload: {
      data,
    } as const,
  };
};

export const getPresentCaseFailed = () => {
  return {
    type: GET_PRESENT_CASE.GET_PRESENT_CASE_FAILED,
  } as const;
};

export const updatePresentCaseRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  data,
  caseId,
  caseType,
}: any) =>
  ({
    type: UPDATE_PRESENT_CASE.UPDATE_PRESENT_CASE_REQUEST,
    payload: {
      data,
      electionSettingsId,
      candidateElectionDetailsId,
      caseId,
      caseType,
    },
  } as const);

export const updatePresentCaseSuccess = (data: PresentCaseType) =>
  ({
    type: UPDATE_PRESENT_CASE.UPDATE_PRESENT_CASE_SUCCESS,
    payload: {
      data,
    },
  } as const);

export const updatePresentCaseFailed = () =>
  ({
    type: UPDATE_PRESENT_CASE.UPDATE_PRESENT_CASE_FAILED,
  } as const);

export const deletePresentCaseRequest = ({
  electionSettingsId,
  candidateElectionDetailsId,
  caseId,
  caseType,
}: any) =>
  ({
    type: DELETE_PRESENT_CASE.DELETE_PRESENT_CASE_REQUEST,
    payload: {
      electionSettingsId,
      candidateElectionDetailsId,
      caseId,
      caseType,
    },
  } as const);

export const deletePresentCaseSuccess = (data: PresentCaseType) =>
  ({
    type: DELETE_PRESENT_CASE.DELETE_PRESENT_CASE_SUCCESS,
    payload: { data },
  } as const);

export const deletePresentCaseFailed = () =>
  ({
    type: DELETE_PRESENT_CASE.DELETE_PRESENT_CASE_FAILED,
  } as const);

export type AffidavitStepOneActions =
  | ReturnType<typeof createAffidavitStepOneRequest>
  | ReturnType<typeof createAffidavitStepOneSuccess>
  | ReturnType<typeof createAffidavitStepOneFailed>
  | ReturnType<typeof createAffidavitStepOneInitialState>
  | ReturnType<typeof getAffidavitStepOneRequest>
  | ReturnType<typeof getAffidavitStepOneSuccess>
  | ReturnType<typeof getAffidavitStepOneFailed>
  | ReturnType<typeof updateAffidavitStepOneRequest>
  | ReturnType<typeof updateAffidavitStepOneSuccess>
  | ReturnType<typeof updateAffidavitStepOneFailed>
  | ReturnType<typeof getAllPresentCaseRequest>
  | ReturnType<typeof getAllPresentCaseSuccess>
  | ReturnType<typeof getAllPresentCaseFailed>
  | ReturnType<typeof getPresentCaseRequest>
  | ReturnType<typeof getPresentCaseSuccess>
  | ReturnType<typeof getPresentCaseSuccess>
  | ReturnType<typeof updatePresentCaseRequest>
  | ReturnType<typeof updatePresentCaseSuccess>
  | ReturnType<typeof updatePresentCaseFailed>
  | ReturnType<typeof deletePresentCaseRequest>
  | ReturnType<typeof deletePresentCaseSuccess>
  | ReturnType<typeof deletePresentCaseFailed>;
