import { FiltersActions } from '@actions/filters/filters-actions';
import { FILTERS } from '@actions/filters/types';
import { roFiltersInitialValue } from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import { FiltersState } from '@reducers/types/filters-state';

import { getInitialState, getSuccessState } from '@utils/store';

const initialState = getInitialState({
  data: roFiltersInitialValue,
});

const FiltersReducer = (
  state = initialState,
  action: FiltersActions,
): FiltersState => {
  switch (action.type) {
    case FILTERS.SET_FILTERS: {
      const { payload } = action as any;
      return {
        ...getSuccessState({ data: payload }),
      };
    }

    default:
      return state;
  }
};

export default FiltersReducer;
