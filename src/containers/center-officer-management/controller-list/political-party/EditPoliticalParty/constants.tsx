import { TFunction } from 'i18next';

export enum POLITICAL_PARTY_RADIO_CODES {
  ACTIVE = '1',
  INACTIVE = '0',
}

export const radioOptions = (t: TFunction<'translation', undefined>) => [
  {
    id: 'active',
    value: POLITICAL_PARTY_RADIO_CODES.ACTIVE,
    label: t('POLITICAL_PARTY.ACTIVE'),
  },
  {
    id: 'inactive',
    value: POLITICAL_PARTY_RADIO_CODES.INACTIVE,
    label: t('POLITICAL_PARTY.INACTIVE'),
  },
];
