import { TFunction } from 'i18next';
import { IconDownloadCloud02, IconHomeLine, IconSearch } from '@pentabd/icons';
import { BUTTON_TYPE } from '@constants/result-management/report';

export const pollingCenterDetailsReportBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t(
      'POLLING_CENTER_DETAILS_REPORT.POLLING_CENTER_DETAILS_REPORT_TITLE',
    ),
  },
];

export const reportOptionsListing = (
  t: TFunction<'translation', undefined>,
) => [
  {
    name: t('ELECTION_RESULT.SEARCH'),
    icon: <IconSearch size="20" />,
    value: BUTTON_TYPE.SEARCH,
    data: {
      reportType: OPTIONS_TYPE.LISTING,
      buttonType: BUTTON_TYPE.SEARCH,
    },
  },
  {
    name: t('ELECTION_RESULT.SAVE'),
    icon: <IconDownloadCloud02 size="20" />,
    value: BUTTON_TYPE.DOWNLOAD,
    data: {
      reportType: OPTIONS_TYPE.LISTING,
      buttonType: BUTTON_TYPE.DOWNLOAD,
    },
  },
];

export const reportOptionsSummary = (
  t: TFunction<'translation', undefined>,
) => [
  {
    name: t('ELECTION_RESULT.SEARCH'),
    icon: <IconSearch size="20" />,
    value: BUTTON_TYPE.SEARCH,
    data: {
      reportType: OPTIONS_TYPE.SUMMARY,
      buttonType: BUTTON_TYPE.SEARCH,
    },
  },
  {
    name: t('ELECTION_RESULT.SAVE'),
    icon: <IconDownloadCloud02 size="20" />,
    value: BUTTON_TYPE.DOWNLOAD,
    data: {
      reportType: OPTIONS_TYPE.SUMMARY,
      buttonType: BUTTON_TYPE.DOWNLOAD,
    },
  },
];

export const OPTIONS_TYPE = {
  LISTING: 'LISTING',
  SUMMARY: 'SUMMARY',
};
