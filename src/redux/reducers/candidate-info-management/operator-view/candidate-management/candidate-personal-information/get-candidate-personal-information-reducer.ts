import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetCandidatePersonalInformationState } from '../types/candidate-personal-information-state';
import {
  CandidatePersonalInformationType,
  ChildType,
} from '@type/candidate-info-management/candidate-confirmation/persona-info';
import { CandidatePersonalInformationActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';
import {
  GET_CANDIDATE_CHILDREN,
  GET_CANDIDATE_PERSONAL_INFO,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/types';
import { getAge } from '@utils/age-calculation';

const initialState: GetCandidatePersonalInformationState = {
  request: false,
};

function mapCandidateChildrenInfo(data: CandidatePersonalInformationType) {
  return {
    ...data,
    birthPlaceZillaId: data.birthPlaceZilla?.id,
    age: getAge(data?.dob),
    childrenInfo: data?.childrenInfo?.map((item: ChildType) => ({
      idx: item.id,
      id: item.id,
      childName: item.name,
      childDob: item.dob,
      childMaritalStatus: item.maritalStatus,
      education: item.education,
      occupationAndOfficeAddress: item.occupationAndOfficeAddress,
    })),
  };
}

const getCandidatePersonalInformationReducer = (
  state = initialState,
  actions: CandidatePersonalInformationActions,
): GetCandidatePersonalInformationState => {
  switch (actions.type) {
    case GET_CANDIDATE_PERSONAL_INFO.GET_CANDIDATE_PERSONAL_INFO_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_CANDIDATE_PERSONAL_INFO.GET_CANDIDATE_PERSONAL_INFO_SUCCESS: {
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: mapCandidateChildrenInfo(payload.data) }),
      };
    }
    case GET_CANDIDATE_PERSONAL_INFO.GET_CANDIDATE_PERSONAL_INFO_FAILED:
      return {
        ...getFailedState({}),
      };
    case GET_CANDIDATE_CHILDREN.GET_CANDIDATE_CHILDREN_SUCCESS: {
      const { payload } = actions as any;
      return {
        ...getSuccessState({
          data: {
            ...state.data,
            childrenInfo: payload?.data?.childrens?.map((item: ChildType) => ({
              idx: item.id,
              id: item.id,
              childName: item.name,
              childDob: item.dob,
              childMaritalStatus: item.maritalStatus,
              education: item.education,
              occupationAndOfficeAddress: item.occupationAndOfficeAddress,
            })),
          },
        }),
      };
    }

    default:
      return state;
  }
};

export default getCandidatePersonalInformationReducer;
