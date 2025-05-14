import { StoreType } from '@reducers/types';
import { FiltersState } from '@reducers/types/filters-state';

export const getFilterState = (state: StoreType): FiltersState => state.filters;
