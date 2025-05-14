import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

import { PATH } from '@constants/paths';

export const STEP_NAME = {
  FIRST_STEP: 'first',
  SECOND_STEP: 'second',
  THIRD_STEP: 'third',
  FOURTH_STEP: 'fourth',
};

export const STEPS = [
  { STEP: STEP_NAME.FIRST_STEP },
  { STEP: STEP_NAME.SECOND_STEP },
  { STEP: STEP_NAME.THIRD_STEP },
  { STEP: STEP_NAME.FOURTH_STEP },
];

export const getBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SCHEDULE_DECLARATION.SCHEDULE_DECLARATION'),
    link: PATH.ELECTION_DECLARATION_MANAGEMENT,
  },
  {
    label: t('SCHEDULE_DECLARATION.ADD_NEW_SCHEDULE_BUTTON_TEXT'),
    link: PATH.ADD_NEW_SCHEDULE_DECLARATION,
  },
];

export const initialStep = (t: TFunction<'translation', undefined>) => [
  {
    title: t('SCHEDULE_DECLARATION.PROGRESS_STEP.SCHEDULE_INFORMATION'),
  },
  {
    title: t('SCHEDULE_DECLARATION.PROGRESS_STEP.ELECTION_INFORMATION'),
  },
  {
    title: t('SCHEDULE_DECLARATION.PROGRESS_STEP.REQUIRED_MANPOWER'),
  },
  {
    title: t('SCHEDULE_DECLARATION.PROGRESS_STEP.BY_ELECTION'),
  },
];
