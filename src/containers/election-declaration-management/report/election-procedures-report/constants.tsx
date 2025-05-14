import { TFunction } from 'i18next';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

export const electionProceduresReportTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTION_PROCEDURES_REPORT.ELECTION_PROCEDURES_REPORT'),
  },
];

export const electionProceduresReportTableHeader = {
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

export const electionProceduresReportTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('ELECTION_PROCEDURES_REPORT.ID'),
    rowSpan: 2,
  },
  {
    id: 2,
    name: t('ELECTION_PROCEDURES_REPORT.DISTRICT'),
    rowSpan: 2,
  },
  {
    id: 3,
    name: t('ELECTION_PROCEDURES_REPORT.ELECTION_SEAT'),
    rowSpan: 2,
  },
  {
    id: 4,
    name: t('ELECTION_PROCEDURES_REPORT.ELECTION_MEDIUM'),
    colSpan: 3,
  },
  {
    id: 5,
    name: t('ELECTION_PROCEDURES_REPORT.COMMENT'),
    rowSpan: 3,
  },
];

export const electionProceduresReportTableColumnSecondary = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('ELECTION_PROCEDURES_REPORT.BALLOT'),
    rowSpan: 2,
  },
  {
    id: 2,
    name: t('ELECTION_PROCEDURES_REPORT.EVM'),
    colSpan: 2,
  },
  {
    id: 3,
    name: t('ELECTION_PROCEDURES_REPORT.TAB'),
    colSpan: 2,
  },
];
