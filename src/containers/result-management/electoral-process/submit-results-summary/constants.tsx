import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const submitResultsSummaryTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SUBMIT_RESULTS.SUBMIT_RESULTS_SUMMARY'),
  },
];

export const DATA_ENTRY_OPERATOR = '1002';

export const submitResultModalColumn = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('SUBMIT_RESULTS.CANDIDATE_NAME'),
  },
  {
    id: 2,
    name: t('SUBMIT_RESULTS.CANDIDATE_SYMBOL'),
  },

  // "বৈধ ভোটের সংখ্যা"
  {
    id: 4,
    name: t('SUBMIT_RESULTS.VALID_VOTER_NO'),
  },

  // আপত্তিকর বৈধ ভোটের সংখ্যা
  {
    id: 5,
    name: t('SUBMIT_RESULTS.OBJECTIONABLE_VALID_VOTER_NO'),
  },
  {
    id: 3,
    name: t('SUBMIT_RESULTS.ROW_TOTAL_VALID_VOTER_NO'),
  },
];
