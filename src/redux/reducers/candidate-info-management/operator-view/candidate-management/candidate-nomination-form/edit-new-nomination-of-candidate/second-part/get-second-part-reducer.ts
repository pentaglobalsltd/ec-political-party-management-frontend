import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';
import { GetSecondPartState } from '../../../types/candidate-nomination-form/edit-new-nomination-of-candidate/second-part-state';
// import { SecondPartType } from '@type/candidate-info-management/candidate-confirmation/candidate-nomination-form/second-part';
import { SecondPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/second-part-actions';
import { GET_SECOND_PART } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/types';
import { SecondPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/second-part';

const initialState: GetSecondPartState = {
  request: false,
};

function mapData(data: SecondPartType) {
  return {
    ...data,
    supporter: {
      ...data.supporter,
      regionId: data?.supporter?.region?.id,
      zillaId: data?.supporter?.zilla?.id,
      voterAreaId: data?.supporter?.voterArea?.id,
      constituencyId: data?.supporter?.constituency?.id,
      upazilaId: data?.supporter?.upazila?.id,
      rmo: data?.supporter?.rmo?.nameEn,
      municipalityId: data?.supporter?.municiaplity?.id,
      unionOrWardId: data?.supporter?.unionOrWard?.id,
      unionWardId: data?.supporter?.unionWard?.id,
    },
  };
}

const getSecondPartReducer = (
  state = initialState,
  action: SecondPartActions,
): GetSecondPartState => {
  switch (action.type) {
    case GET_SECOND_PART.GET_SECOND_PART_REQUEST:
      return {
        ...getRequestingState({ data: [] }),
      };

    case GET_SECOND_PART.GET_SECOND_PART_SUCCESS: {
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: mapData(payload.data) }),
      };
    }

    case GET_SECOND_PART.GET_SECOND_PART_FAILED: {
      return {
        ...getFailedState({ data: [] }),
      };
    }

    case GET_SECOND_PART.GET_SECOND_PART_INITIAL_STATE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};
export default getSecondPartReducer;
