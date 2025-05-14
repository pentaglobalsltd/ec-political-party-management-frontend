import { ImmovablePropertyActions } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property-actions';
import { GET_IMMOVABLE_PROPERTY } from '@actions/candidate-info-management/operator-view/candidate-management/affidavit-form/types';
import { ImmovablePropertyType } from '@type/candidate-info-management/operator-view/affidavit-form/immovable-property';
import { GetImmovablePropertyState } from '../../types/affidavit-form/immovable-property-state';
import { getDigitBanglaFromEnglish } from '@utils';
import {
  getFailedState,
  getRequestingState,
  getSuccessState,
} from '@utils/store';

const initialState: GetImmovablePropertyState = {
  request: false,
};

const mapImmovablePropertyInfo = (data: ImmovablePropertyType) => {
  return {
    immovableAssets: data?.immovableAssets?.map((item, index) => ({
      ...item,
      idx: getDigitBanglaFromEnglish(index + 1),
    })),
  };
};

const getImmovablePropertyReducer = (
  state = initialState,
  actions: ImmovablePropertyActions,
): GetImmovablePropertyState => {
  switch (actions.type) {
    case GET_IMMOVABLE_PROPERTY.GET_IMMOVABLE_PROPERTY_REQUEST:
      return {
        ...getRequestingState({ data: [] }),
      };
    case GET_IMMOVABLE_PROPERTY.GET_IMMOVABLE_PROPERTY_SUCCESS:
      const { payload } = actions as any;
      return {
        ...getSuccessState({ data: mapImmovablePropertyInfo(payload.data) }),
      };
    case GET_IMMOVABLE_PROPERTY.GET_IMMOVABLE_PROPERTY_FAILED:
      return {
        ...getFailedState({ data: [] }),
      };
    default:
      return state;
  }
};

export default getImmovablePropertyReducer;
