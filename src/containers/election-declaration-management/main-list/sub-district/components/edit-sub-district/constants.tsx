import { TFunction } from 'i18next';

export enum UPAZILA_IS_THANA_RADIO_CODES {
  YES = 'yes',
  NO = 'no',
}

export const radioOptions = (t: TFunction<'translation', undefined>) => [
  {
    id: 'active',
    value: UPAZILA_IS_THANA_RADIO_CODES.YES,
    label: t('SUB_DISTRICT.YES'),
  },
  {
    id: 'inactive',
    value: UPAZILA_IS_THANA_RADIO_CODES.NO,
    label: t('SUB_DISTRICT.NO'),
  },
];
