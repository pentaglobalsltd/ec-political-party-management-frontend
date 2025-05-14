import { IconHomeLine } from '@pentabd/icons';
import { t, TFunction } from 'i18next';
import {
  ADVANCE_SEARCH,
  APPLICATION_SEARCH,
} from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import { Actions } from './components/Actions';
import { UnionWardQueryParams } from '@type/election-declaration-management/main-list/union-ward/union-ward-type';

export const unionWardBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('UNION_WARD.BREADCRUMB_MAIN_LIST'),
  },

  {
    label: t('UNION_WARD.BREADCRUMB_UNION_WARD'),
  },
];

export const unionWardTableColumns = ({getUnionsWardsList}:{getUnionsWardsList:(data:UnionWardQueryParams)=>void}) => [
  {
    id: 1,
    name: t('UNION_WARD.WARD_NAMEBN'),
    key: 'nameBn',
  },
  {
    id: 2,
    name: t('UNION_WARD.WARD_NAMEEN'),
    key: 'nameEn',
  },
  {
    id: 3,
    name: t('UNION_WARD.WARD_NUMBER'),
    key: 'unionWardCode',
  },
  {
    id: 4,
    name: '',
    key: 'id',
    render: (id: any) => (
      <Actions
      getUnionsWardsList={getUnionsWardsList}
        id={id}
      />
    ),
  },
];

export const allSelectedData = {
  district: false,
  districtOptions: false,
  upazilaOptions: false,
  upazila: false,
  unionOrWardOptions: false,
  unionOrWard: false,
};
export const clearUnionOrWard = {
  unionOrWard: true,
};

export const clearUpazila = {
  ...clearUnionOrWard,
  upazila: true,
  unionOrWardOptions: true,
};

export const clearZilla = {
  ...clearUpazila,
  district: true,
  upazilaOptions: true,
};

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.DIVISION,
    refreshData: clearZilla,
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    apiService: API_SERVICE.MASTER,
    queryParamsDependency: {
      regionId: APPLICATION_SEARCH.DIVISION,
    },
    refreshData: clearUpazila,
    nonRefreshData: {
      district: false,
      upazilaOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UPAZILA,
    apiService: API_SERVICE.MASTER,
    pathParamsDependency: {
      zillas: APPLICATION_SEARCH.DISTRICT,
    },
    refreshData: clearUnionOrWard,
    nonRefreshData: {
      upazila: false,
      unionOrWardOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.UNION_OR_WARD,
    apiService: API_SERVICE.MASTER,
    queryParamsDependency: {
      upazilaId: APPLICATION_SEARCH.SUB_DISTRICT,
    },
    nonRefreshData: {
      unionOrWard: false,
    },
  },
];
