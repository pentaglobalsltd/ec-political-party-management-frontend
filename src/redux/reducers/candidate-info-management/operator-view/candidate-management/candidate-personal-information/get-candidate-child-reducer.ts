import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetCandidateChildState } from '../types/candidate-personal-information-state';
import { CandidatePersonalInformationActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';
import { GET_CANDIDATE_CHILD } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/types';
import { ChildType } from '@type/candidate-info-management/operator-view/candidatePersonalInformation';

const initialState: GetCandidateChildState = {
  request: false,
};

function mapCandidateChildrenInfo(data: ChildType) {
  return {
    id: data.id,
    childName: data.name,
    childDob: data.dob,
    childMaritalStatus: data.maritalStatus,
    education: data.education,
    occupationAndOfficeAddress: data.occupationAndOfficeAddress,
  };
}
const getCandidateChildReducer = (
  state = initialState,
  actions: CandidatePersonalInformationActions,
): GetCandidateChildState => {
  switch (actions.type) {
    case GET_CANDIDATE_CHILD.GET_CANDIDATE_CHILD_REQUEST:
      return {
        ...getRequestingState({}),
      };
    case GET_CANDIDATE_CHILD.GET_CANDIDATE_CHILD_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: mapCandidateChildrenInfo(payload.data) }),
      };
    case GET_CANDIDATE_CHILD.GET_CANDIDATE_CHILD_FAILED:
      return {
        ...getFailedState({}),
      };
    default:
      return state;
  }
};

export default getCandidateChildReducer;
