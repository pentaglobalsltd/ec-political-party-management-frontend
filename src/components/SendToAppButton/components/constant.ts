import { TFunction } from 'i18next';

export const historyListModalTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('DATA_PROVIDER_INFO.HISTORY_TABLE_COLUMN.UPDATED_BY'),
    key: 'updatedName',
  },
  {
    id: 2,
    name: t('DATA_PROVIDER_INFO.HISTORY_TABLE_COLUMN.UPDATED_AT'),
    key: 'updatedAt',
  },
  {
    id: 3,
    name: t('DATA_PROVIDER_INFO.HISTORY_TABLE_COLUMN.STATUS'),
    key: 'banglaStatus',
  },
];
