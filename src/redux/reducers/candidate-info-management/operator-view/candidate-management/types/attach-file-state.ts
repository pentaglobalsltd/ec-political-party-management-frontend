import { AttachFileType } from '@type/candidate-info-management/operator-view/attach-file/attach-file';
import { ReduxRequest } from '@reducers/types/redux-request';


export interface CreateAttachFileState extends ReduxRequest<AttachFileType> {}
export interface GetAttachFileState extends ReduxRequest<AttachFileType[]> {}
export interface UpdateAttachFileState
  extends ReduxRequest<UpdateAttachFileState> {}

export interface AttachFileState {
  createAttachFile: CreateAttachFileState;
  getAttachFile: GetAttachFileState;
  updateAttachFile: UpdateAttachFileState;
}
