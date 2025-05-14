import { TypeRegisterNewNominationResponse } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/useAddCandidateNominationForm';
import { ReduxRequest } from '@reducers/types/redux-request';

export interface AddNominationState
  extends ReduxRequest<TypeRegisterNewNominationResponse> {}
