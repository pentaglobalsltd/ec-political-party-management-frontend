import { TFunction } from 'i18next';
import classNames from 'classnames';
import { Badge, InputText, Text } from '@pentabd/ui';
import { IconHomeLine, IconPencil02, IconSearch } from '@pentabd/icons';

import { getDigitBanglaFromEnglish } from '@utils';
import CenterList from './components/CenterList';

export enum CENTER_STATUSES {
  OPERATOR_ENTERED = 'FORWARDED_BY_OP,APPROVED_BY_ARO',
  COMPLETED_CENTERS = 'APPROVED_BY_ARO',
  INCOMPLETE_CENTERS = 'FORWARDED_BY_OP,RETURNED_BY_ARO',
  PENDING_CENTERS = 'CREATED_BY_OP',
}

export const resultsTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESULTS.RESULTS'),
  },
];

export const resultPublishBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESULTS.RESULTS'),
  },
  {
    label: t('RESULTS.RESULT_PUBLISH'),
  },
];

export const resultSummaryPublishBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESULTS.RESULTS_SUMMARY'),
  },
  {
    label: t('RESULTS.RESULT_SUMMARY_PUBLISH'),
  },
];

export const resultsTableHeader = {
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
};

export const waitingResultsTableColumns = (
  t: TFunction<'translation', undefined>,
  handleNavigate: (id: number) => void,
) => [
  {
    id: 1,
    name: t('RESULTS.CENTER_NO'),
    key: 'serial',
    render: (data: string) => <Text>{getDigitBanglaFromEnglish(data)}</Text>,
  },
  {
    id: 2,
    name: t('RESULTS.VOTE_CENTER_NAME'),
    key: 'pollingCenterName',
    render: (data: any, row: any) => {
      return <Text>{`${data} - ${row?.description}`}</Text>;
    },
  },
  {
    id: 3,
    name: t('RESULTS.CANDIDATE_TYPE'),
    key: 'candidateTypeName',
  },
  {
    id: 4,
    name: t('RESULTS.CONDITION'),
    key: 'status',
    render: (data: any) => (
      <div className="d-flex">
        <Badge
          className="text-nowrap"
          size="sm"
          label={data as string}
          type={data === t('RESULTS.RESULT_PUBLISH') ? 'success' : 'warning'}
        />
      </div>
    ),
  },
  {
    id: 5,
    name: t('RESULTS.PROCEDURE'),
    key: 'pollingCenterid',
    render: (data: number) => (
      <span className="pointer" onClick={() => handleNavigate(data)}>
        <IconPencil02 size="20" fill="primary" />
      </span>
    ),
  },
];

export const testedResultsTableColumns = (
  t: TFunction<'translation', undefined>,
  handleNavigate: (id: number) => void,
) => [
  {
    id: 1,
    name: t('RESULTS.CENTER_NO'),
    key: 'serial',
    render: (data: string) => <Text>{getDigitBanglaFromEnglish(data)}</Text>,
  },
  {
    id: 2,
    name: t('RESULTS.VOTE_CENTER_NAME'),
    key: 'pollingCenterName',
    render: (data: any, row: any) => {
      return <Text>{`${data} - ${row?.description}`}</Text>;
    },
  },
  {
    id: 3,
    name: t('RESULTS.CANDIDATE_TYPE'),
    key: 'candidateTypeName',
  },
  {
    id: 4,
    name: t('RESULTS.CONDITION'),
    key: 'status',
    render: (data: any) => (
      <div className="d-flex">
        <Badge
          className={classNames('text-nowrap', {
            'border-dark': data === t('RESULTS.RESULT_RETURN'),
          })}
          size="sm"
          label={data as string}
          type={
            data === 'ফলাফল প্রকাশ'
              ? 'success'
              : data === t('RESULTS.RESULT_RETURN')
              ? 'default'
              : 'warning'
          }
        />
      </div>
    ),
  },
  {
    id: 5,
    name: t('RESULTS.PROCEDURE'),
    key: 'pollingCenterid',
    render: (data: number) => (
      <span className="pointer" onClick={() => handleNavigate(data)}>
        <IconPencil02 size="20" fill="primary" />
      </span>
    ),
  },
];

export const RESULT_STATUS = {
  APPROVED_BY_ARO: 'APPROVED_BY_ARO',
  RETURNED_BY_ARO: 'RETURNED_BY_ARO',
  REQUESTED_BY_RO: 'REQUESTED_BY_RO',
  RETURNED_BY_ADMIN: 'RETURNED_BY_ADMIN',
  FORWARDED_BY_OP: 'FORWARDED_BY_OP',
  CREATED_BY_OP: 'CREATED_BY_OP',
};

export const GET_POLLING_LIST_TESTED_STATUS = `${RESULT_STATUS.APPROVED_BY_ARO}, ${RESULT_STATUS.REQUESTED_BY_RO}, ${RESULT_STATUS.RETURNED_BY_ARO}, ${RESULT_STATUS.RETURNED_BY_ADMIN}`;

export const summaryTableColumn = () => [
  {
    id: 1,
    name: '',
    key: 'summaryLabel',
  },
  {
    id: 2,
    name: '',
    key: 'summaryValue',
    render: (data: string) => getDigitBanglaFromEnglish(data),
  },
];

export const descriptionTableColumn = (
  t: TFunction<'translation', undefined>,
  candidateTypeName: string[] = [],
) => {
  const dynamicColumns = candidateTypeName?.map((item: any, index: number) => {
    return {
      id: index + 2,
      name: item?.candidateTypeName,
      key: `descriptionValue${index}`,
      render: (data: any, row: any) => (
        <CenterList data={data} row={row} item={item} />
      ),
    };
  });

  return [
    {
      id: 1,
      name: t('RESULTS.DESCRIPTION'),
      key: 'descriptionLabel',
    },
    ...dynamicColumns,
  ];
};

export const resultPublishColumn = (t: TFunction<'translation', undefined>) => [
  {
    id: 1,
    name: t('RESULTS.CANDIDATES_NAME'),
  },
  {
    id: 2,
    name: t('RESULTS.CANDIDATES_SYMBOL'),
  },
  // "বৈধ ভোটের সংখ্যা"
  {
    id: 4,
    name: t('RESULTS.VALID_VOTER_NUMBER'),
  },

  // আপত্তিকর বৈধ ভোটের সংখ্যা
  {
    id: 5,
    name: t('RESULTS.OBJECTIONABLE_VALID_VOTER_NO'),
  },
  {
    id: 3,
    name: t('RESULTS.ROW_TOTAL_VALID_VOTER_NO'),
  },
];
