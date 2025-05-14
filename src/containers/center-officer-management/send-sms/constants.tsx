import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const sendSMSBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CENTER_OFFICER_SEND_SMS.SEND_SMS'),
  },
];
