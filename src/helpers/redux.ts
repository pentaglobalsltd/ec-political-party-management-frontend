import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { StoreType } from '@reducers/types';

export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;
