import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const messageListTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MESSAGE_LIST.MESSAGE_LIST_MAIN_TITLE'),
  },
  {
    label: t('MESSAGE_LIST.MESSAGE_LIST_TITLE'),
  },
];
