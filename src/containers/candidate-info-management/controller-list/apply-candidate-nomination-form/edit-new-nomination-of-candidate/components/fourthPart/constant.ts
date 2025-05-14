import { TFunction } from 'i18next';

export const isElectedOption = (t: TFunction<'translation', undefined>) => [
  {
    id: 'yes',
    value: 'yes',
    label: `${t('FOURTH_PART.RADIO_YES')}`,
  },
  {
    id: 'no',
    value: 'no',
    label: `${t('FOURTH_PART.RADIO_NO')}`,
  },
];

export const SELECT_OPTION = {
  YES: 'yes',
  NO: 'no',
};
