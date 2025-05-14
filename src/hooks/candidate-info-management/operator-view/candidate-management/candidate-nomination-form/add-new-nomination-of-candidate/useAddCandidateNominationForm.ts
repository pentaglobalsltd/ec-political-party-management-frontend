import { useDispatch } from 'react-redux';

import {
  newNominationRequest,
  newNominationRestoreRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/add-new-nomination-actions';
import { useAppSelector } from '@helpers/redux';
import { getAddNominationState } from '@selectors/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/add-nomination-selector';
import { AddNominationState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/add-new-nomination-of-candidate/add-nomination-state';

export interface TypeRegisterNewNomination {
  electionScheduleId: number;
  electionSettingsId: number;
  nid?: string;
  dob?: string;
  matchImage: string;
  phone?: string;
  email?: string;
}

export interface TypeRegisterNewNominationResponse {
  id: number; // candidateDetailsId
  electionSettingsId: number;
}

interface UseAddCandidateNominationForm {
  requested: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  addNewNomination: (regBody: TypeRegisterNewNomination) => void;
  newNominationRestore: () => void;
  newNominationData: any;
}

export const useAddCandidateNominationForm =
  (): UseAddCandidateNominationForm => {
    const dispatch = useDispatch();
    const data = useAppSelector<AddNominationState>(getAddNominationState);

    const requested = data?.request;
    const isSuccess = Boolean(data?.success);
    const isFailed = Boolean(data?.failed);

    const addNewNomination = (nominationBody: TypeRegisterNewNomination) =>
      dispatch(newNominationRequest(nominationBody));

    const newNominationRestore = () => dispatch(newNominationRestoreRequest());

    const newNominationData = data?.data || {};

    return {
      requested,
      isSuccess,
      isFailed,
      addNewNomination,
      newNominationRestore,
      newNominationData,
    };
  };
