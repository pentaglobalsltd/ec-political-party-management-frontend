import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const candidatesCommunicationTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATES_COMMUNICATION.CANDIDATES_COMMUNICATION_INFO'),
  },
];

export const candidatesCommunicationTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CANDIDATES_COMMUNICATION.ID'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('CANDIDATES_COMMUNICATION.CANDIDATES_NAME'),
    key: 'candidateName',
  },
  {
    id: 3,
    name: t('CANDIDATES_COMMUNICATION.PRESENT_ADDRESS'),
    key: 'presentAddress',
  },

  {
    id: 4,
    name: t('CANDIDATES_COMMUNICATION.CANDIDATES_TYPE'),
    key: 'candidateType',
  },

  {
    id: 5,
    name: t('CANDIDATES_COMMUNICATION.CONTACT_NUMBER'),
    key: 'telephone',
  },
  {
    id: 6,
    name: t('CANDIDATES_COMMUNICATION.MOBILE'),
    key: 'phone',
  },
];
