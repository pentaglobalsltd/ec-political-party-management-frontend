import {
  GET_LIABILITIES,
  GET_LIABILITY_CHILDREN,
  GET_COMMITMENT_ACHIEVEMENT_CHILDREN,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';
import {
  LiabilitiesType,
  LiabilityChildType,
  CommitmentAchievementChildType,
  LoansType,
} from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { GetLiabilitiesState } from '../../types/affidavit-form/liabilities-state';
import { LiabilitiesActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';

const initialState: GetLiabilitiesState = {
  request: false,
};

function mapCandidateLiabilityInfo(data: LiabilitiesType) {
  if (data?.oath?.magistrateNotaryPublic === null) {
    data.oath.magistrateNotaryPublic = {
      signingDate: '',
    };
  }
  return {
    ...data,
    liabilities: data?.liabilities?.map((item: LiabilityChildType) => ({
      ...item,
      idx: item.id,
    })),
    commitmentAchievements: data?.commitmentAchievements?.map(
      (item: CommitmentAchievementChildType) => ({
        ...item,
        idx: item.id,
      }),
    ),
    loans: data?.loans?.map((item: LoansType) => ({
      ...item,
      RescheduledLoanDate: item.RescheduledLoanDate
        ? item.RescheduledLoanDate
        : '',
    })),
  };
}

const getLiabilitiesReducer = (
  state = initialState,
  actions: LiabilitiesActions,
): GetLiabilitiesState => {
  switch (actions.type) {
    case GET_LIABILITIES.GET_LIABILITIES_REQUEST:
      return {
        ...getRequestingState({ data: [] }),
      };
    case GET_LIABILITIES.GET_LIABILITIES_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: mapCandidateLiabilityInfo(payload.data) }),
      };
    case GET_LIABILITIES.GET_LIABILITIES_FAILED:
      return {
        ...getFailedState({ data: [] }),
      };
    case GET_LIABILITY_CHILDREN.GET_LIABILITY_CHILDREN_SUCCESS: {
      const { payload } = actions as any;

      return {
        ...getSuccessState({
          data: {
            ...state.data,
            liabilities: payload?.data?.map((item: LiabilityChildType) => ({
              ...item,
              idx: item.id,
            })),
          },
        }),
      };
    }
    case GET_COMMITMENT_ACHIEVEMENT_CHILDREN.GET_COMMITMENT_ACHIEVEMENT_CHILDREN_SUCCESS: {
      const { payload } = actions as any;
      return {
        ...getSuccessState({
          data: {
            ...state.data,
            commitmentAchievements: payload?.data?.map(
              (item: CommitmentAchievementChildType) => ({
                ...item,
                idx: item.id,
              }),
            ),
          },
        }),
      };
    }

    default:
      return state;
  }
};

export default getLiabilitiesReducer;
