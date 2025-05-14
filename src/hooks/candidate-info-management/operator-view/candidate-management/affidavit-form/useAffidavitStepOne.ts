import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  AffidavitStepOneType,
  AllPresentCaseType,
  PresentCaseType,
  CreateAffidavitStepOnePropsType,
  PresentCaseUrlType,
  hookAffidavitStepOneProp,
} from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';

import {
  createAffidavitStepOneRequest,
  getAffidavitStepOneRequest,
  getAllPresentCaseRequest,
  getPresentCaseRequest,
  updatePresentCaseRequest,
  deletePresentCaseRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';
import { useAppSelector } from '@helpers/redux';
import { FirstStepAffidavitFormValidationSchemaType } from '@validations/candidate-info-management/operator/affidavit/firstStepAffidavitFormValidation';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { AffidavitStepOneState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/affidavit-step-one-state';
import { getAffidavitStepOneState } from '@selectors/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one-selector';

interface UseAffidavitStepOne {
  isCreateRequested: boolean;
  isCreateSuccess: boolean;
  isUpdateRequested: boolean;
  isUpdateSuccess: boolean;
  isDeleteRequested: boolean;
  isDeleteSuccess: boolean;
  affidavitFormStepOne: AffidavitStepOneType;
  allPresentCase: AllPresentCaseType | object;
  presentCase: PresentCaseType | object;
  updatedPresentCase: PresentCaseType;
  deletedPresentCase: PresentCaseType;

  createAffidavitFormStepOne: ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateAffidavitStepOnePropsType) => void;
  getAllPresentCaseHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) => void;
  getPresentCaseHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
  }: PresentCaseUrlType) => void;
  updatePresentCaseHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    caseId,
    caseType,
  }: any) => void;
  deletePresentCaseHandler: ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
    caseType,
  }: any) => void;
}

export const useAffidavitStepOne = ({
  electionSettingsId,
  candidateElectionDetailsId,
  isGetAffidavitStepOne,
}: hookAffidavitStepOneProp): UseAffidavitStepOne => {
  const dispatch = useDispatch();

  const {
    createAffidavitStepOne,
    getAffidavitStepOne,
    getAllPresentCase,
    getPresentCase,
    updatePresentCase,
    deletePresentCase,
  } = useAppSelector<AffidavitStepOneState>(getAffidavitStepOneState);

  useEffect(() => {
    if (
      electionSettingsId &&
      candidateElectionDetailsId &&
      isGetAffidavitStepOne
    ) {
      dispatch(
        getAffidavitStepOneRequest({
          electionSettingsId,
          candidateElectionDetailsId,
        }),
      );
    }
  }, [
    dispatch,
    electionSettingsId,
    candidateElectionDetailsId,
    isGetAffidavitStepOne,
  ]);

  const isCreateRequested = Boolean(createAffidavitStepOne?.request);
  const isCreateSuccess = Boolean(createAffidavitStepOne?.success);

  const isUpdateRequested = Boolean(updatePresentCase?.request);
  const isUpdateSuccess = Boolean(updatePresentCase?.success);

  const isDeleteRequested = Boolean(deletePresentCase?.request);
  const isDeleteSuccess = Boolean(deletePresentCase?.success);

  const affidavitFormStepOne =
    getAffidavitStepOne?.data as FirstStepAffidavitFormValidationSchemaType;
  const allPresentCase = getAllPresentCase?.data || [];
  const presentCase = getPresentCase?.data || {};
  const updatedPresentCase = updatePresentCase?.data || {};
  const deletedPresentCase = deletePresentCase?.data || {};

  const createAffidavitFormStepOne = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: CreateAffidavitStepOnePropsType) => {
    dispatch(
      createAffidavitStepOneRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      }),
    );
  };

  const getAllPresentCaseHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseType,
  }: any) => {
    dispatch(
      getAllPresentCaseRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        caseType,
      }),
    );
  };

  const getPresentCaseHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
  }: PresentCaseUrlType) => {
    dispatch(
      getPresentCaseRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        caseId,
      }),
    );
  };

  const updatePresentCaseHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
    caseId,
    caseType,
  }: any) => {
    dispatch(
      updatePresentCaseRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
        caseId,
        caseType,
      }),
    );
  };

  const deletePresentCaseHandler = ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
    caseType,
  }: any) => {
    dispatch(
      deletePresentCaseRequest({
        electionSettingsId,
        candidateElectionDetailsId,
        caseId,
        caseType,
      }),
    );
  };

  return {
    isCreateRequested,
    isCreateSuccess,
    isUpdateRequested,
    isUpdateSuccess,
    isDeleteRequested,
    isDeleteSuccess,
    affidavitFormStepOne,
    createAffidavitFormStepOne,
    getAllPresentCaseHandler,
    getPresentCaseHandler,
    updatePresentCaseHandler,
    deletePresentCaseHandler,
    allPresentCase,
    presentCase,
    updatedPresentCase,
    deletedPresentCase,
  };
};
