import { useDispatch } from 'react-redux';
import { setFilters } from '@actions/filters/filters-actions';
import { useAppSelector } from '@helpers/redux';
import { Filters, FiltersState } from '@reducers/types/filters-state';
import { getFilterState } from '@selectors/filters-selector';
import { USER_TYPES } from '@constants/user-types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';

interface HookReturnType extends Filters {
  isAdmin: boolean;
  setFiltersInRedux: (x: Filters) => void;
  subject?: string;
  userType?: string;
}

const useFiltersRedux = (): HookReturnType => {
  const { keycloak } = useAuthWrapper();
  const isAdmin = keycloak.tokenParsed?.userType === USER_TYPES.ADMIN;
  const subject = keycloak.subject;

  const dispatch = useDispatch();
  const { data } = useAppSelector<FiltersState>(getFilterState);

  const setFiltersInRedux = (data: Filters) => {
    dispatch(setFilters(data));
  };

  return {
    ...data,
    userType: keycloak.tokenParsed?.userType,
    isAdmin,
    setFiltersInRedux,
    subject,
  };
};

export default useFiltersRedux;
