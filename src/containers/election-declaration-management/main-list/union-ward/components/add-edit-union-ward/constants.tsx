import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const unionWardAddEditBreadcrumbs = (
  t: TFunction<'translation', undefined>,
  id: string | number | undefined,
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
  {
    label: id
      ? t('UNION_WARD.UPDATE_UNION_WARD_SECTION_HEADER')
      : t('UNION_WARD.BREADCRUMB_CREATE_UNION_WARD'),
  },
];
