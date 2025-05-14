import { MovablePropertyActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property-actions';
import { GET_MOVABLE_PROPERTY } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';
import { MovablePropertyType } from '@type/candidate-info-management/operator-view/affidavit-form/movable-property';
import { GetMovablePropertyState } from '../../types/affidavit-form/movable-property-state';
import { getDigitBanglaFromEnglish } from '@utils';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: GetMovablePropertyState = {
  request: false,
};

const mapMovablePropertyInfo = (data: MovablePropertyType) => {
  return {
    movableAssets: data?.movableAssets?.map((item, index) => ({
      ...item,
      idx: getDigitBanglaFromEnglish(index + 1),
    })),
  };
};

const getMovablePropertyReducer = (
  state = initialState,
  actions: MovablePropertyActions,
): GetMovablePropertyState => {
  switch (actions.type) {
    case GET_MOVABLE_PROPERTY.GET_MOVABLE_PROPERTY_REQUEST:
      return {
        ...getRequestingState({ data: [] }),
      };
    case GET_MOVABLE_PROPERTY.GET_MOVABLE_PROPERTY_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: mapMovablePropertyInfo(payload.data) }),
      };
    case GET_MOVABLE_PROPERTY.GET_MOVABLE_PROPERTY_FAILED:
      return {
        ...getFailedState({ data: [] }),
      };
    default:
      return state;
  }
};

export default getMovablePropertyReducer;
