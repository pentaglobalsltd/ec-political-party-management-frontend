import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';
import { PATH } from '@constants/paths';

export const getBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ADD_SCHEDULE_INFO.BREADCRUMBS.SCHEDULE_INFO_ADD'),
    link: `../${PATH.ADD_SCHEDULE_INFO}`,
  },

  {
    label: t('ADD_SCHEDULE_INFO.BREADCRUMBS.SEAT'),
    link: PATH.CREATE_ELECTION_SCHEDULE_INFO,
  },
];
