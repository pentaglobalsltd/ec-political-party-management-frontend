import { TFunction } from 'i18next';

export const tScheduleInfoForm =
  'SCHEDULE_DECLARATION.SCHEDULE_INFORMATION_FORM';

export const isActiveOption = (t: TFunction<'translation', undefined>) => [
  {
    id: 'isInActive',
    value: 'isInActive',
    label: `${t(`${tScheduleInfoForm}.IS_ACTIVE_OPTION.INACTIVE`)}`,
  },
  {
    id: 'isActive',
    value: 'isActive',
    label: `${t(`${tScheduleInfoForm}.IS_ACTIVE_OPTION.ACTIVE`)}`,
  },
];
export const isOnlineNomination = (t: TFunction<'translation', undefined>) => [
  {
    id: 'inactive',
    value: 'inactive',
    label: `${t(`${tScheduleInfoForm}.ONLINE_NOMINATION_OPTIONS.INACTIVE`)}`,
  },
  {
    id: 'active',
    value: 'active',
    label: `${t(`${tScheduleInfoForm}.ONLINE_NOMINATION_OPTIONS.ACTIVE`)}`,
  },
];
