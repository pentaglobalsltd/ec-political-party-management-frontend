import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateImmovablePropertyState } from '../../types/affidavit-form/immovable-property-state';
import { ImmovablePropertyActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property-actions';
import { CREATE_IMMOVABLE_PROPERTY } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: CreateImmovablePropertyState = {
  request: false,
};

const createImmovablePropertyReducer = (
  state = initialState,
  actions: ImmovablePropertyActions,
): CreateImmovablePropertyState => {
  switch (actions.type) {
    case CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_IMMOVABLE_PROPERTY.CREATE_IMMOVABLE_PROPERTY_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createImmovablePropertyReducer;
