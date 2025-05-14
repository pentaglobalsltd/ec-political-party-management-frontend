import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';

import DownloadAttachFile from '@components/DownloadAttachedFileInsideTableRow';
import { LAST_ROW } from '../../constants';
import { getDigitBanglaFromEnglish } from '@utils';

export const resultTableColumns = ({
  t,
  isShowPoliticalPartyColumn,
}: {
  t: TFunction<'translation', undefined>;
  isShowPoliticalPartyColumn?: boolean;
}) => [
  {
    id: 1,
    name: t('RESULT_AND_SITUATION_REVIEW.RESULT_TABLE_COL_CANDIDATE_NAME'),
    key: 'candidateName',
    render: (data: any) => <Text size="sm">{data}</Text>,
  },
  {
    id: 2,
    name: t('RESULT_AND_SITUATION_REVIEW.RESULT_TABLE_COL_CANDIDATE_SYMBOL'),
    key: 'symbolName',
    render: (data: any) => <Text size="sm">{data}</Text>,
  },
  ...(!isShowPoliticalPartyColumn
    ? [
        {
          id: 3,
          name: t('RESULT_AND_SITUATION_REVIEW.RESULT_TABLE_COL_PARTY_NAME'),
          key: 'politicalPartyName',
          render: (data: any) => <Text size="sm">{data}</Text>,
        },
      ]
    : []),
  {
    id: 4,
    name: t('RESULT_AND_SITUATION_REVIEW.RESULT_TABLE_COL_VOTE_AMOUNT'),
    key: 'receivedVote',
    render: (data: any) => <Text size="sm">{data}</Text>,
  },
];

export const voteCenterWiseResultTableColumns = (
  t: TFunction<'translation', undefined>,
  dynamicColumns: any,
) => [
  {
    id: 1,
    name: t(
      'RESULT_AND_SITUATION_REVIEW.VOTE_CENTER_WISE_RESULT_COL_CENTER_NAME',
    ),
    key: 'mappedCenterName',
    render: (data: any, row: any) => {
      if (row?.mappedCenterName === LAST_ROW) {
        return (
          <div className="d-flex justify-content-center">
            <Text size="sm" weight="semibold">
              {data}
            </Text>
          </div>
        );
      } else
        return (
          <DownloadAttachFile
            label={data}
            documentId={row?.fileFromOp?.documentId}
            fileId={row?.fileFromOp?.fileId}
            fileType={row?.fileFromOp?.fileType}
            formatId={2}
            filePath={row?.fileFromOp?.filePath}
          />
        );
    },
  },
  {
    id: 2,
    name: t(
      'RESULT_AND_SITUATION_REVIEW.VOTE_CENTER_WISE_RESULT_COL_VOTER_AMOUNT',
    ),
    key: 'totalVoter',
    render: (data: any, row: any) => {
      if (row?.mappedCenterName === LAST_ROW) {
        return (
          <Text size="sm" weight="semibold">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
      } else
        return (
          <Text size="sm">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
    },
  },

  // Dynamic columns
  ...(dynamicColumns ? dynamicColumns : {}),

  {
    id: 3,
    name: t(
      'RESULT_AND_SITUATION_REVIEW.VOTE_CENTER_WISE_RESULT_COL_VALID_VOTE',
    ),
    key: 'totalLegalVote',
    render: (data: any, row: any) => {
      if (row?.mappedCenterName === LAST_ROW) {
        return (
          <Text size="sm" weight="semibold">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
      } else
        return (
          <Text size="sm">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
    },
  },
  {
    id: 4,
    name: t(
      'RESULT_AND_SITUATION_REVIEW.VOTE_CENTER_WISE_RESULT_COL_INVALID_VOTE',
    ),
    key: 'totalIllegalVote',
    render: (data: any, row: any) => {
      if (row?.mappedCenterName === LAST_ROW) {
        return (
          <Text size="sm" weight="semibold">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
      } else
        return (
          <Text size="sm">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
    },
  },
  {
    id: 5,
    name: t(
      'RESULT_AND_SITUATION_REVIEW.VOTE_CENTER_WISE_RESULT_COL_PROVIDED_VOTE',
    ),
    key: 'totalGivenVote',
    render: (data: any, row: any) => {
      if (row?.mappedCenterName === LAST_ROW) {
        return (
          <Text size="sm" weight="semibold">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
      } else
        return (
          <Text size="sm">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
    },
  },
  {
    id: 6,
    name: t(
      'RESULT_AND_SITUATION_REVIEW.VOTE_CENTER_WISE_RESULT_COL_PERCENTAGE',
    ),
    key: 'attendancePercentage',
    render: (data: any, row: any) => {
      if (row?.mappedCenterName === LAST_ROW) {
        return (
          <Text size="sm" weight="semibold">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
      } else
        return (
          <Text size="sm">
            {data
              ? getDigitBanglaFromEnglish(data)
              : getDigitBanglaFromEnglish(0)}
          </Text>
        );
    },
  },
];
