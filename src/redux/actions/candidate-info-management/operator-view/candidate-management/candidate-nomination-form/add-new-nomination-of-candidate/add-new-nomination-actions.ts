import {
  TypeRegisterNewNomination,
  TypeRegisterNewNominationResponse,
} from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/useAddCandidateNominationForm';
import { ADD_NEW_NOMINATION } from './types';

export const newNominationRequest = (data: TypeRegisterNewNomination) => {
  return {
    type: ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_REQUEST,
    payload: data,
  } as const;
};

export const newNominationSuccess = (
  data: TypeRegisterNewNominationResponse,
) => {
  return {
    type: ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_SUCCESS,
    payload: {
      data,
    },
  } as const;
};

export const newNominationFailed = () => {
  return {
    type: ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_FAILED,
  } as const;
};

export const newNominationRestoreRequest = () => {
  return {
    type: ADD_NEW_NOMINATION.ADD_NEW_NOMINATION_RESTORE,
  } as const;
};

export type AddNominationActions =
  | ReturnType<typeof newNominationRequest>
  | ReturnType<typeof newNominationSuccess>
  | ReturnType<typeof newNominationFailed>;
