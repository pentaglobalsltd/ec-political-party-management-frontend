import AffidavitStepOneType, {
  AllPresentCaseType,
  PresentCaseType,
  PresentCaseUrlType,
} from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';
import { ReduxRequest } from '@reducers/types/redux-request';

export interface CreateAffidavitStepOneState
  extends ReduxRequest<AffidavitStepOneType> {}

export interface UpdateAffidavitStepOneState
  extends ReduxRequest<AffidavitStepOneType> {}

export interface GetAffidavitStepOneState
  extends ReduxRequest<AffidavitStepOneType> {}

export interface GetAllPresentCaseState
  extends ReduxRequest<AllPresentCaseType> {}

export interface GetPresentCaseState extends ReduxRequest<PresentCaseUrlType> {}

export interface UpdatePresentCaseState extends ReduxRequest<PresentCaseType> {}

export interface DeletePresentCaseState extends ReduxRequest<PresentCaseType> {}

export interface AffidavitStepOneState {
  createAffidavitStepOne: CreateAffidavitStepOneState;
  updateAffidavitStepOne: UpdateAffidavitStepOneState;
  getAffidavitStepOne: GetAffidavitStepOneState;
  getAllPresentCase: GetAllPresentCaseState;
  getPresentCase: GetPresentCaseState;
  updatePresentCase: UpdatePresentCaseState;
  deletePresentCase: DeletePresentCaseState;
}
