import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  LiabilitiesActions,
  createLiabilitiesSuccess,
  createLiabilitiesFailed,
  getLiabilitiesSuccess,
  getLiabilitiesFailed,
  updateLiabilitiesSuccess,
  updateLiabilitiesFailed,
  getLiabilityChildSuccess,
  getLiabilityChildFailed,
  getLiabilityChildrenSuccess,
  getLiabilityChildrenFailed,
  updateLiabilityChildSuccess,
  getLiabilityChildrenRequest,
  updateLiabilityChildFailed,
  deleteLiabilityChildSuccess,
  deleteLiabilityChildFailed,
  getCommitmentAchievementChildrenSuccess,
  getCommitmentAchievementChildrenFailed,
  getCommitmentAchievementChildSuccess,
  getCommitmentAchievementChildFailed,
  updateCommitmentAchievementChildSuccess,
  getCommitmentAchievementChildrenRequest,
  updateCommitmentAchievementChildFailed,
  deleteCommitmentAchievementChildSuccess,
  deleteCommitmentAchievementChildFailed,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities-actions';

import {
  CREATE_LIABILITIES,
  GET_LIABILITIES,
  GET_LIABILITY_CHILD,
  GET_LIABILITY_CHILDREN,
  UPDATE_LIABILITIES,
  UPDATE_LIABILITY_CHILD,
  DELETE_LIABILITY_CHILD,
  GET_COMMITMENT_ACHIEVEMENT_CHILDREN,
  GET_COMMITMENT_ACHIEVEMENT_CHILD,
  UPDATE_COMMITMENT_ACHIEVEMENT_CHILD,
  DELETE_COMMITMENT_ACHIEVEMENT_CHILD,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

import {
  createLiabilities,
  getLiabilities,
  updateLiabilities,
  getLiabilityChildren,
  getLiabilityChild,
  updateLiabilityChild,
  deleteLiabilityChild,
  getCommitmentAchievementChildren,
  getCommitmentAchievementChild,
  updateCommitmentAchievementChild,
  deleteCommitmentAchievementChild,
} from '@api/candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities';

import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';
// import { getCandidateInfoRequest } from '@actions/candidate-info';

export const liabilitiesMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: LiabilitiesActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_LIABILITIES.CREATE_LIABILITIES_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createLiabilities(payload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            // dispatch(getCandidateInfoRequest());
            dispatch(createLiabilitiesSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createLiabilitiesFailed());
            }
          }
          break;
        }

        case GET_LIABILITIES.GET_LIABILITIES_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getLiabilities(payload);

            dispatch(getLiabilitiesSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getLiabilitiesFailed());
            }
          }
          break;
        }

        case UPDATE_LIABILITIES.UPDATE_LIABILITIES_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await updateLiabilities(payload);
            dispatch(updateLiabilitiesSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(updateLiabilitiesFailed());
            }
          }

          break;
        }
        case GET_LIABILITY_CHILDREN.GET_LIABILITY_CHILDREN_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getLiabilityChildren(payload);

            dispatch(getLiabilityChildrenSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getLiabilityChildrenFailed());
            }
          }
          break;
        }

        case GET_LIABILITY_CHILD.GET_LIABILITY_CHILD_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getLiabilityChild(payload);
            dispatch(getLiabilityChildSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getLiabilityChildFailed());
            }
          }
          break;
        }

        case UPDATE_LIABILITY_CHILD.UPDATE_LIABILITY_CHILD_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await updateLiabilityChild(payload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            dispatch(updateLiabilityChildSuccess(data));
            dispatch(getLiabilityChildrenRequest(payload));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updateLiabilityChildFailed());
            }
          }
          break;
        }

        case DELETE_LIABILITY_CHILD.DELETE_LIABILITY_CHILD_REQUEST: {
          try {
            const { payload } = action as any;

            const { data } = await deleteLiabilityChild(payload);
            toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(deleteLiabilityChildSuccess(data));
            dispatch(getLiabilityChildrenRequest(payload));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deleteLiabilityChildFailed());
            }
          }
          break;
        }

        case GET_COMMITMENT_ACHIEVEMENT_CHILDREN.GET_COMMITMENT_ACHIEVEMENT_CHILDREN_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCommitmentAchievementChildren(payload);

            dispatch(getCommitmentAchievementChildrenSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getCommitmentAchievementChildrenFailed());
            }
          }
          break;
        }

        case GET_COMMITMENT_ACHIEVEMENT_CHILD.GET_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCommitmentAchievementChild(payload);
            dispatch(getCommitmentAchievementChildSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getCommitmentAchievementChildFailed());
            }
          }
          break;
        }

        case UPDATE_COMMITMENT_ACHIEVEMENT_CHILD.UPDATE_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await updateCommitmentAchievementChild(payload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            dispatch(updateCommitmentAchievementChildSuccess(data));
            dispatch(getCommitmentAchievementChildrenRequest(payload));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updateCommitmentAchievementChildFailed());
            }
          }
          break;
        }

        case DELETE_COMMITMENT_ACHIEVEMENT_CHILD.DELETE_COMMITMENT_ACHIEVEMENT_CHILD_REQUEST: {
          try {
            const { payload } = action as any;

            const { data } = await deleteCommitmentAchievementChild(payload);
            toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(deleteCommitmentAchievementChildSuccess(data));
            dispatch(getCommitmentAchievementChildrenRequest(payload));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deleteCommitmentAchievementChildFailed());
            }
          }
          break;
        }
        default:
          break;
      }
      return nextAction;
    };
  };
};
