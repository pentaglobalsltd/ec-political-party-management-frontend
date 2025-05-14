import * as yup from 'yup';

import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';
import { GetFourthPartState } from '../../../types/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part-state';
import { FourthPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/fourth-part-actions';
import { GET_FOURTH_PART } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/types';
import { fourthPartValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/fourthPartValidation';

export type FormData = yup.InferType<typeof fourthPartValidation>;

const initialState: GetFourthPartState = {
  request: false,
};
const getFourthPartReducer = (
  state = initialState,
  action: FourthPartActions,
): GetFourthPartState => {
  switch (action.type) {
    case GET_FOURTH_PART.GET_FOURTH_PART_REQUEST:
      return {
        ...getRequestingState({ data: [] }),
      };

    case GET_FOURTH_PART.GET_FOURTH_PART_SUCCESS: {
      const { payload } = action as any;
      const data: FormData = {};
      data.isElectedBefore = payload?.data?.isElectedBefore;
      if (payload?.data?.candidatePastElectionInfo) {
        data.pastElectionName =
          payload?.data?.candidatePastElectionInfo?.pastElectionName;
        data.pastElectionInfo =
          payload?.data?.candidatePastElectionInfo?.pastElectionInfo;
      }
      if (payload?.data?.candidatePresentElectionInfo) {
        data.constituencyId =
          payload?.data?.candidatePresentElectionInfo?.constituency?.id;
      }
      data.candidateName = payload?.data?.candidateName;

      return {
        ...getSuccessState({ data: data }),
      };
    }

    case GET_FOURTH_PART.GET_FOURTH_PART_FAILED: {
      return {
        ...getFailedState({ data: [] }),
      };
    }

    case GET_FOURTH_PART.GET_FOURTH_PART_INITIAL_STATE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};
export default getFourthPartReducer;
