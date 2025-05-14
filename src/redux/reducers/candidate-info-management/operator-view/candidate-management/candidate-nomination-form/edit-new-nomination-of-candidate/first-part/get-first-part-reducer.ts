import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';
import { GetFirstPartState } from '../../../types/candidate-nomination-form/edit-new-nomination-of-candidate/first-part-state';
import { FirstPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/first-part';
import { FirstPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/first-part-actions';
import { GET_FIRST_PART } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/types';

const initialState: GetFirstPartState = {
  request: false,
};
function mapInfo(data: FirstPartType) {
  return {
    ...data,
    proposer: {
      ...data?.proposer,
      regionId: data?.proposer?.region?.id,
      zillaId: data?.proposer?.zilla?.id,
      voterAreaId: data?.proposer?.voterArea?.id,
      constituencyId: data?.proposer?.constituency?.id,
      upazilaId: data?.proposer?.upazila?.id,
      rmoEn: data?.proposer?.rmo?.nameEn,
      municipalityId: data?.proposer?.municiaplity?.id,
      unionOrWardId: data?.proposer?.unionOrWard?.id,
      unionWardId: data?.proposer?.unionWard?.id,
    },
    candidateElectionAndPersonalDetails: {
      ...data?.candidateElectionAndPersonalDetails,
      zillaId: data?.candidateElectionAndPersonalDetails?.zilla?.id,
      constituencyId:
        data?.candidateElectionAndPersonalDetails?.constituency?.id,

      constituencyName:
        data?.candidateElectionAndPersonalDetails?.constituency?.nameBn,

      candidateTypeId:
        data?.candidateElectionAndPersonalDetails?.candidateType?.id,

      municipalityName:
        data?.candidateElectionAndPersonalDetails?.municipality?.nameBn,
    },
  };
}

const getFirstPartReducer = (
  state = initialState,
  actions: FirstPartActions,
): GetFirstPartState => {
  switch (actions.type) {
    case GET_FIRST_PART.GET_FIRST_PART_REQUEST:
      return {
        ...getRequestingState({ data: [] }),
      };
    case GET_FIRST_PART.GET_FIRST_PART_SUCCESS: {
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: mapInfo(payload.data) }),
      };
    }
    case GET_FIRST_PART.GET_FIRST_PART_FAILED:
      return {
        ...getFailedState({ data: [] }),
      };
    case GET_FIRST_PART.GET_FIRST_PART_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default getFirstPartReducer;
