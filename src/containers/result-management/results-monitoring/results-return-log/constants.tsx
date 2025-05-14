import { TFunction } from 'i18next';

import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

export const resultsReturnLogTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESULTS_RETURN_LOG.RESULTS_RETURN_LOG'),
  },
];

export const resultsReturnLogTableHeader = {
  leftComponents: [
    <InputText
      key={1}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      size="md"
      type="text"
      status="default"
    />,
  ],
  rightComponents: [<DownloadButtons key={1} fileName={'test'} />],
};

export const resultsReturnLogTableSecondaryColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 11,
    name: t('RESULTS_RETURN_LOG.CAN_ID'),
  },
  {
    id: 11,
    name: t('RESULTS_RETURN_LOG.CAN_TYPE'),
  },
  {
    id: 11,
    name: t('RESULTS_RETURN_LOG.VOTE'),
  },
];

export const resultsReturnLogTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('RESULTS_RETURN_LOG.DISTRICT'),
    rowSpan: 2,
  },
  {
    id: 2,
    name: t('RESULTS_RETURN_LOG.SEAT'),
    rowSpan: 2,
  },
  {
    id: 3,
    name: t('RESULTS_RETURN_LOG.CENTER_NO'),
    rowSpan: 2,
  },
  {
    id: 4,
    name: t('RESULTS_RETURN_LOG.VOTE_CENTER_NAME'),
    rowSpan: 2,
  },
  {
    id: 5,
    name: t('RESULTS_RETURN_LOG.TOTAL_VOTER'),
    rowSpan: 2,
  },
  {
    id: 6,
    name: t('RESULTS_RETURN_LOG.ACCEPT_VOTE'),
    rowSpan: 2,
  },
  {
    id: 7,
    name: t('RESULTS_RETURN_LOG.REJECT_VOTE'),
    rowSpan: 2,
  },
  {
    id: 8,
    name: t('RESULTS_RETURN_LOG.MALE_VOTER'),
    rowSpan: 2,
  },
  {
    id: 9,
    name: t('RESULTS_RETURN_LOG.FEMALE_VOTER'),
    rowSpan: 2,
  },
  {
    id: 10,
    name: t('RESULTS_RETURN_LOG.FILE'),
    rowSpan: 2,
  },
  {
    id: 11,
    name: t('RESULTS_RETURN_LOG.RESULTS'),
    colSpan: 3,
  },
  {
    id: 12,
    name: t('RESULTS_RETURN_LOG.RETURN'),
    rowSpan: 2,
  },
  {
    id: 13,
    name: t('RESULTS_RETURN_LOG.TIME'),
    rowSpan: 2,
  },
];

export const resultsReturnLogTableRows = [
  {
    id: 1,
    district: 'রাজশাহী',
    electionSeat: 'ঢাকা - ১',
    centerNo: '45',
    voteCenterName: 'আদাবাড়ি গহের আলি উচ্চ বিদ্যালয়',
    condition: 'ফলাফল প্রকাশ',
    totalVoter: '105425',
    takeVote: '105425',
    rejectVote: '105425',
  },
];
