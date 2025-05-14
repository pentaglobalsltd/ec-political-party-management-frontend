import {
  getFailedState,
  getInitialState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';
import { CreateMovablePropertyState } from '../../types/affidavit-form/movable-property-state';
import { MovablePropertyActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property-actions';
import { CREATE_MOVABLE_PROPERTY } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';

const initialState: CreateMovablePropertyState = {
  request: false,
};

const createMovablePropertyReducer = (
  state = initialState,
  actions: MovablePropertyActions,
): CreateMovablePropertyState => {
  switch (actions.type) {
    case CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_REQUEST:
      return {
        ...getRequestingState(),
      };
    case CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_SUCCESS:
      return {
        ...getSuccessState(),
      };
    case CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_FAILED:
      return {
        ...getFailedState(),
      };
    case CREATE_MOVABLE_PROPERTY.CREATE_MOVABLE_PROPERTY_INITIAL_STATE:
      return {
        ...getInitialState(),
      };
    default:
      return state;
  }
};

export default createMovablePropertyReducer;
