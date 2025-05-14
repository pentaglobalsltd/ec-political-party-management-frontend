import {
  getFailedState,
  getRequestingState,
  getSuccessState,
  getInitialState,
} from '@utils/store';
import { GetThirdPartState } from '../../../types/candidate-nomination-form/edit-new-nomination-of-candidate/third-part-state';
import { GET_THIRD_PART } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/types';
import { ThirdPartActions } from '@actions/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/third-part-actions';
import { ThirdPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';

const initialState: GetThirdPartState = {
  request: false,
};

function mapData(data: ThirdPartType) {
  return {
    candidatePersonalInfo: {
      ...data.candidatePersonalInfo,
      regionId: data?.candidatePersonalInfo?.region?.id,
      zillaId: data?.candidatePersonalInfo?.zilla?.id,
      voterAreaId: data?.candidatePersonalInfo?.voterArea?.id,
      upazilaId: data?.candidatePersonalInfo?.upazila?.id,
      municipalityId: data?.candidatePersonalInfo?.municipality?.id,
      rmo: data?.candidatePersonalInfo?.rmo?.nameEn,
      unionOrWardId: data?.candidatePersonalInfo?.unionOrWard?.id,
      unionWardId: data?.candidatePersonalInfo?.unionWard?.id,
      bankAccountNo: data?.candidatePersonalInfo?.bank?.accountNo,
      bankId: data?.candidatePersonalInfo?.bank?.id,
      bankBranchName: data?.candidatePersonalInfo?.bank?.bankBranchName,
    },
    candidatePoliticalInfo: {
      politicalParty: { ...data?.candidatePoliticalInfo?.politicalParty },
      politicalPartyId: data?.candidatePoliticalInfo?.politicalParty?.id,
      preferredSymbolId:
        data?.candidatePoliticalInfo?.politicalParty?.preferredSymbolId,
      symbolName: data?.candidatePoliticalInfo?.politicalParty?.symbolNameBn,
    },
  };
}

const getThirdPartReducer = (
  state = initialState,
  action: ThirdPartActions,
): GetThirdPartState => {
  switch (action.type) {
    case GET_THIRD_PART.GET_THIRD_PART_REQUEST:
      return {
        ...getRequestingState({ data: [] }),
      };

    case GET_THIRD_PART.GET_THIRD_PART_SUCCESS: {
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: mapData(payload.data) }),
      };
    }

    case GET_THIRD_PART.GET_THIRD_PART_FAILED: {
      return {
        ...getFailedState({ data: [] }),
      };
    }

    case GET_THIRD_PART.GET_THIRD_PART_INITIAL_STATE:
      return {
        ...getInitialState(),
      };

    default:
      return state;
  }
};
export default getThirdPartReducer;
