import { Filters } from '@reducers/types/filters-state';
import { FILTERS } from './types';

export const setFilters = (data: Filters) => {
  return {
    type: FILTERS.SET_FILTERS,
    payload: data,
  } as const;
};

export type FiltersActions = ReturnType<typeof setFilters>;
