import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { toast } from 'react-toastify';

import {
  AffidavitStepOneActions,
  createAffidavitStepOneSuccess,
  createAffidavitStepOneFailed,
  getAffidavitStepOneSuccess,
  getAffidavitStepOneFailed,
  getAllPresentCaseRequest,
  getAllPresentCaseSuccess,
  getAllPresentCaseFailed,
  getPresentCaseSuccess,
  getPresentCaseFailed,
  updatePresentCaseSuccess,
  updatePresentCaseFailed,
  deletePresentCaseSuccess,
  deletePresentCaseFailed,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/affidavit-step-one-actions';

import {
  CREATE_AFFIDAVIT_STEP_ONE,
  GET_AFFIDAVIT_STEP_ONE,
  GET_ALL_PRESENT_CASE,
  GET_PRESENT_CASE,
  UPDATE_PRESENT_CASE,
  DELETE_PRESENT_CASE,
} from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/types';

import {
  createAffidavitStepOne,
  getAffidavitStepOne,
} from '@api/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one';

import {
  getAllPresentCase,
  getPresentCase,
  updatePresentCase,
  deletePresentCase,
} from '@api/candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-cases';

import { isRequestCancelled } from '@helpers/routing';
import { StoreType } from '@reducers/types';
// import { getCandidateInfoRequest } from '@actions/candidate-info';
export const affidavitStepOneMiddleware: Middleware<
  Record<string, unknown>,
  StoreType
> = ({ dispatch }: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => {
    return async (action: AffidavitStepOneActions) => {
      const nextAction = next(action);
      switch (action.type) {
        case CREATE_AFFIDAVIT_STEP_ONE.CREATE_AFFIDAVIT_STEP_ONE_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await createAffidavitStepOne(payload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            // dispatch(getCandidateInfoRequest());
            dispatch(createAffidavitStepOneSuccess(data));
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(createAffidavitStepOneFailed());
            }
          }
          break;
        }

        case GET_AFFIDAVIT_STEP_ONE.GET_AFFIDAVIT_STEP_ONE_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getAffidavitStepOne(payload);
            dispatch(getAffidavitStepOneSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getAffidavitStepOneFailed());
            }
          }
          break;
        }

        case GET_ALL_PRESENT_CASE.GET_ALL_PRESENT_CASE_REQUEST: {
          try {
            const { payload } = action as any;
            const { caseType } = payload;
            const { data } = await getAllPresentCase(payload);

            dispatch(getAllPresentCaseSuccess(data, caseType));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getAllPresentCaseFailed());
            }
          }
          break;
        }

        case GET_PRESENT_CASE.GET_PRESENT_CASE_REQUEST: {
          try {
            const { payload } = action as any;
            const { data } = await getPresentCase(payload);

            dispatch(getPresentCaseSuccess(data));
          } catch (error) {
            if (!isRequestCancelled(error)) {
              dispatch(getPresentCaseFailed());
            }
          }
          break;
        }

        case UPDATE_PRESENT_CASE.UPDATE_PRESENT_CASE_REQUEST: {
          try {
            const { payload } = action as any;
            const { electionSettingsId, candidateElectionDetailsId, caseType } =
              payload;
            const { data } = await updatePresentCase(payload);
            toast.success('জমা দেওয়া সফল হয়েছে!');
            dispatch(updatePresentCaseSuccess(data));
            dispatch(
              getAllPresentCaseRequest({
                electionSettingsId,
                candidateElectionDetailsId,
                caseType,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(updatePresentCaseFailed());
            }
          }
          break;
        }

        case DELETE_PRESENT_CASE.DELETE_PRESENT_CASE_REQUEST: {
          try {
            const { payload } = action as any;
            const { electionSettingsId, candidateElectionDetailsId, caseType } =
              payload;
            const { data } = await deletePresentCase(payload);
            toast.success('মুছে ফেলা সফল হয়েছে!');
            dispatch(deletePresentCaseSuccess(data));
            dispatch(
              getAllPresentCaseRequest({
                electionSettingsId,
                candidateElectionDetailsId,
                caseType,
              }),
            );
          } catch (error: any) {
            if (!isRequestCancelled(error)) {
              toast.error(error.response.data.message);
              dispatch(deletePresentCaseFailed());
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
