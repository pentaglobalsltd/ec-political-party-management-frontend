import {
  LiabilitiesType,
  LiabilityChildType,
  LiabilityChildrenType,
  CommitmentAchievementChildrenType,
  CommitmentAchievementChildType,
} from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import { ReduxRequest } from '@reducers/types/redux-request';

export interface CreateLiabilitiesState extends ReduxRequest<LiabilitiesType> {}

export interface GetLiabilitiesState extends ReduxRequest<LiabilitiesType> {}

export interface UpdateLiabilitiesState extends ReduxRequest<LiabilitiesType> {}

export interface GetLiabilityChildrenState
  extends ReduxRequest<LiabilityChildrenType[]> {}

export interface GetLiabilityChildState
  extends ReduxRequest<LiabilityChildType> {}

export interface UpdateLiabilityChildState
  extends ReduxRequest<LiabilityChildType> {}

export interface DeleteLiabilityChildState
  extends ReduxRequest<LiabilityChildType> {}
export interface GetCommitmentAchievementChildrenState
  extends ReduxRequest<CommitmentAchievementChildrenType[]> {}

export interface GetCommitmentAchievementChildState
  extends ReduxRequest<CommitmentAchievementChildType> {}

export interface UpdateCommitmentAchievementChildState
  extends ReduxRequest<CommitmentAchievementChildType> {}

export interface DeleteCommitmentAchievementChildState
  extends ReduxRequest<CommitmentAchievementChildType> {}
export interface LiabilitiesState {
  createLiabilities: CreateLiabilitiesState;
  getLiabilities: GetLiabilitiesState;
  updateLiabilities: UpdateLiabilitiesState;
  getLiabilityChildren: GetLiabilityChildrenState;
  getLiabilityChild: GetLiabilityChildState;
  updateLiabilityChild: UpdateLiabilityChildState;
  deleteLiabilityChild: DeleteLiabilityChildState;
  getCommitmentAchievementChildren: GetCommitmentAchievementChildrenState;
  getCommitmentAchievementChild: GetCommitmentAchievementChildState;
  updateCommitmentAchievementChild: UpdateCommitmentAchievementChildState;
  deleteCommitmentAchievementChild: DeleteCommitmentAchievementChildState;
}
