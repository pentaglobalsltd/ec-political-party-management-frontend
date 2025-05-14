import { TFunction } from 'i18next';

import { IconDownloadCloud01, IconHomeLine } from '@pentabd/icons';

import { ELECTION_INFO } from '@constants/election-info';
import { electionNameMapping } from '@helpers/election-type';
import { Button } from '@pentabd/ui';

export const electedCandidateListTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST'),
  },
];

const dynamicColumns = ({
  t,
  electionTypeId,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeId: string;
}) => {
  switch (Number(electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return [
        {
          id: 4,
          name: t(
            'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.PRESENT_ADDRESS',
          ),
          key: 'presentAddress',
        },
        {
          id: 5,
          name: t(
            'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.PERMANENT_ADDRESS',
          ),
          key: 'permanentAddress',
        },
      ];

    case ELECTION_INFO.UPAZILLA.ID:
      return [
        {
          id: 4,
          name: t(
            'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.CANDIDATE_ADDRESS',
          ),
          key: 'candidateAddress',
        },
      ];

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return [
        {
          id: 4,
          name: t(
            'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.CANDIDATE_ADDRESS',
          ),
          key: 'candidateAddress',
        },
      ];

    case ELECTION_INFO.MUNICIPALITY.ID:
      return [
        {
          id: 4,
          name: t(
            'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.CANDIDATE_ADDRESS',
          ),
          key: 'candidateAddress',
        },
      ];

    default:
      return [
        {
          id: 4,
          name: t(
            'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.PRESENT_ADDRESS',
          ),
          key: 'presentAddress',
        },
        {
          id: 5,
          name: t(
            'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.PERMANENT_ADDRESS',
          ),
          key: 'permanentAddress',
        },
      ];
  }
};

export const electedCandidateTableColumns = ({
  t,
  electionTypeId,
  isDownload = false,
  handleDownloadPdf,
  generatePdfLoading,
  rowPdfDownloadLoading,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeId: string;
  isDownload?: boolean;
  handleDownloadPdf: (row: any) => void;
  generatePdfLoading?: boolean;
  rowPdfDownloadLoading?: number;
}) => {
  const electionTypeKey =
    electionNameMapping(Number(electionTypeId)) || ELECTION_INFO.NATIONAL.NAME;
  const isNationalElection =
    Number(electionTypeId) === ELECTION_INFO.NATIONAL.ID;

  return [
    {
      id: 1,
      name: t(`ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.SERIAL_NO`),
      key: 'idx',
    },
    {
      id: 2,
      name: t(
        'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.CANDIDATE_NAME',
      ),
      key: 'candidateName',
    },
    {
      id: 3,
      name: t(
        `ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.HUSBAND_OR_SPOUSE_NAME.${electionTypeKey}`,
      ),
      key: 'fatherName',
    },

    ...dynamicColumns({ t, electionTypeId }),

    ...(isDownload
      ? []
      : [
          {
            id: 6,
            name: t(
              'ELECTED_CANDIDATE_LIST.ELECTED_CANDIDATE_LIST_COLUMN.DOWNLOAD_BUTTON',
            ),
            key: 'download',
            render: (data: any, row: any) => (
              <>
                <Button
                  key={3}
                  size="sm"
                  type="primary"
                  htmlType="button"
                  onClick={() => handleDownloadPdf(row)}
                  loading={
                    generatePdfLoading &&
                    rowPdfDownloadLoading === row?.candidateElectionDetailsId
                  }
                  disabled={isNationalElection}
                >
                  <IconDownloadCloud01 size="20" fill="light" />
                  {t('ELECTED_CANDIDATE_LIST.DOWNLOAD_BUTTON')}
                </Button>
              </>
            ),
          },
        ]),
  ];
};
