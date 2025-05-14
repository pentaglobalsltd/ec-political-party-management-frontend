import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';

export const USER_PROFILE_LIST_TYPE = {
  ELECTION: 'ELECTION',
  SYSTEM: 'SYSTEM',
  AUTOMATIC: 'AUTOMATIC',
};

export const systemUserTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('HOME.USER_MANAGEMENT'),
  },
];

export const newSystemUserTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
  params: any,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('HOME.USER_MANAGEMENT'),
  },
  {
    label:
      params?.action === USER_ACTION.EDIT
        ? t('ELECTION_USER.EDIT')
        : t('ELECTION_USER.ADD_NEW'),
  },
];

export const userProfileTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('HOME.USER_MANAGEMENT'),
  },
  {
    label: t('ELECTION_USER.PROFILE'),
  },
];

export const CURRENT_USER_TYPE = {
  SYSTEM_USER: 0,
  ELECTION_USER: 1,
  AUTOMATIC_USER: 2,
};

export const USER_ROLE_TYPE = {
  RETURNING_OFFICER: '1009',
  ASSISTANT_RETURNING_OFFICER: '1010',
  ASSISTANT_RETURNING_OFFICER_OPERATOR: '1018',
  PRESIDING_OFFICER: '1011',
  DATA_ENTRY_OFFICER: '1002',
  ADMIN: '1001',
  UPAZILA_THANA_ELECTION_OFFICER: '1007',
  ZILLA_ELECTION_OFFICER: '1005',
  REGIONAL_ELECTION_OFFICER: '1003',
};

export const options = [
  {
    label: 'রিটার্নিং অফিসার',
    value: '9',
  },
  {
    label: 'সহকারী রিটার্নিং অফিসার',
    value: '10',
  },
  {
    label: 'ডাটা এন্ট্রি অপারেটর',
    value: '11',
  },
  {
    label: 'প্রিজাইডিং অফিসার',
    value: '12',
  },
];

export const ELECTION_TYPE = {
  NATIONAL_ELECTION: 1,
  SUB_DISTRICT_ELECTION: 2,
  UNION_ELECTION: 3,
  CITY_CORPORATION_ELECTION: 4,
  MUNICIPALITY_ELECTION: 5,
  PRESIDENTIAL_ELETION: 6,
  BY_ELECTION: 7,
  WOMEN_ASSEMBLY: 8,
  DISTRICT_PORISHAD_ELECTION: 9,
};

export const USER_ACTION = {
  EDIT: 'edit',
};
