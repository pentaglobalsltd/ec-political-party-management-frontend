import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  CandidatePersonalInformationActions,
  createCandidatePersonalInformationSuccess,
  createCandidatePersonalInformationFailed,
  getCandidatePersonalInformationSuccess,
  getCandidatePersonalInformationFailed,
  updateCandidateChildSuccess,
  getCandidateChildrenSuccess,
  getCandidateChildrenFailed,
  updateCandidateChildFailed,
  deleteCandidateChildSuccess,
  deleteCandidateChildFailed,
  getCandidateChildSuccess,
  getCandidateChildFailed,
  getCandidateChildrenRequest,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/candidate-personal-information-actions';

import {
  CREATE_CANDIDATE_PERSONAL_INFO,
  DELETE_CANDIDATE_CHILD,
  GET_CANDIDATE_CHILD,
  GET_CANDIDATE_CHILDREN,
  GET_CANDIDATE_PERSONAL_INFO,
  UPDATE_CANDIDATE_CHILD,
} from '@actions/candidate-info-management/operator-view/candidate-management/candidate-personal-information/types';

import {
  createCandidatePersonalInformation,
  deleteCandidateChild,
  getCandidatePersonalInformation,
  getCandidateChildren,
  getCandidateChild,
  updateCandidateChild,
} from '@api/candidate-info-management/operator-view/candidate-management/candidate-personal-information';

import { StoreType } from '@reducers/types';
import { isRequestCancelled } from '@helpers/routing';

export const candidatePersonalInformationMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: CandidatePersonalInformationActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_CANDIDATE_PERSONAL_INFO.CREATE_CANDIDATE_PERSONAL_INFO_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createCandidatePersonalInformation(payload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            // dispatch(getCandidateInfoRequest());
            dispatch(createCandidatePersonalInformationSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createCandidatePersonalInformationFailed());
            }
          }
          break;
        }

        case GET_CANDIDATE_PERSONAL_INFO.GET_CANDIDATE_PERSONAL_INFO_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCandidatePersonalInformation(payload);

            dispatch(getCandidatePersonalInformationSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getCandidatePersonalInformationFailed());
            }
          }
          break;
        }

        case GET_CANDIDATE_CHILDREN.GET_CANDIDATE_CHILDREN_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCandidateChildren(payload);

            dispatch(getCandidateChildrenSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getCandidateChildrenFailed());
            }
          }
          break;
        }

        case GET_CANDIDATE_CHILD.GET_CANDIDATE_CHILD_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getCandidateChild(payload);

            dispatch(getCandidateChildSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getCandidateChildFailed());
            }
          }
          break;
        }

        case UPDATE_CANDIDATE_CHILD.UPDATE_CANDIDATE_CHILD_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await updateCandidateChild(payload);

            dispatch(updateCandidateChildSuccess(data));
            dispatch(getCandidateChildrenRequest(payload));
            toast.success('জমা দেওয়া সফল হয়েছে!');
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updateCandidateChildFailed());
            }
          }
          break;
        }

        case DELETE_CANDIDATE_CHILD.DELETE_CANDIDATE_CHILD_REQUEST: {
          try {
            const { payload } = action as any;

            const { electionSettingsId, candidateElectionDetailsId } = payload;

            const { data } = await deleteCandidateChild(payload);
            toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(deleteCandidateChildSuccess(data));
            dispatch(
              getCandidateChildrenRequest({
                electionSettingsId,
                candidateElectionDetailsId,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deleteCandidateChildFailed());
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
