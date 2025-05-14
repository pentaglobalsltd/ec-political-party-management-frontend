import {
  CandidateChildrenType,
  CandidatePersonalInformationType,
  CandidatePersonalInformationTypeRes,
  ChildType,
} from '@type/candidate-info-management/candidate-confirmation/persona-info';
import { ReduxRequest } from '@reducers/types/redux-request';

export interface CreateCandidatePersonalInformationState
  extends ReduxRequest<CandidatePersonalInformationTypeRes> {}

export interface GetCandidatePersonalInformationState
  extends ReduxRequest<CandidatePersonalInformationType> {}

export interface GetCandidateChildrenState
  extends ReduxRequest<CandidateChildrenType> {}

export interface GetCandidateChildState extends ReduxRequest<ChildType> {}

export interface UpdateCandidateChildState extends ReduxRequest<ChildType> {}

export interface DeleteCandidateChildState extends ReduxRequest<ChildType> {}

export interface CandidatePersonalInformationState {
  createCandidatePersonalInformation: CreateCandidatePersonalInformationState;
  getCandidatePersonalInformation: GetCandidatePersonalInformationState;
  getCandidateChildren: GetCandidateChildrenState;
  getCandidateChild: GetCandidateChildState;
  updateCandidateChild: UpdateCandidateChildState;
  deleteCandidateChild: DeleteCandidateChildState;
}
