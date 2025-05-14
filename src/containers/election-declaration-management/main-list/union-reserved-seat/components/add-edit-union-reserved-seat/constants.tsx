import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const unionReservedSeatAddEditBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('UNION_RESERVED_SEAT.BREADCRUMB_MAIN_LIST'),
  },

  {
    label: t('UNION_RESERVED_SEAT.BREADCRUMB_UNION_RESERVED_SEAT'),
  },
  {
    label: t('UNION_RESERVED_SEAT.BREADCRUMB_CREATE_UNION_RESERVED_SEAT'),
  },
];

export const allSelectedData = {
  districtOptions: false,
  district: false,

  upazilaOptions: false,
  upazila: false,

  unionOptions: false,
  union: false,

  unionWardMultiOptions: false,
  unionWardMulti: false,
};

export const clearUnionWardMulti = {
  unionWardMulti: true,
};

export const clearUnion = {
  ...clearUnionWardMulti,
  union: true,
  unionWardMultiOptions: true,
};

export const clearUpazila = {
  ...clearUnion,
  upazila: true,
  unionOptions: true,
};

export const clearZilla = {
  ...clearUpazila,
  district: true,
  upazilaOptions: true,
};
