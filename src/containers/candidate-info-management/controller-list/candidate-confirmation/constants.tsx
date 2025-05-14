import { TFunction } from 'i18next';
import { Button } from '@pentabd/ui';
import { IconCheckSquare, IconHomeLine, IconXSquare } from '@pentabd/icons';

import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

import Percentage from './components/Percentage';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { dynamicColumnForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';

export const candidateConfirmationBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_CONFIRMATION.CANDIDATE_CONFIRMATION'),
  },
];

export const candidateConfirmationTableColumns = ({
  t,
  handleButton,
  stepId,
  params,
  isDownload = false,
  isAdmin,
}: {
  t: any;
  handleButton: any;
  stepId: any;
  params: any;
  isDownload?: boolean;
  isAdmin: boolean;
}) => {
  return [
    {
      id: 1,
      name: t('CANDIDATE_CONFIRMATION.ID'),
      key: 'idx',
    },
    {
      id: 2,
      name: t('CANDIDATE_CONFIRMATION.NAME_VOTER_ID'),
      key: 'candidateNameWithVoterNo',
    },
    ...dynamicColumnForElectionConstituency({ params, t }),

    ...dynamicColumnForCandidateType({ params, isAdmin }),

    {
      id: 4,
      name: t('CANDIDATE_CONFIRMATION.PROPOSER_NAME'),
      key: 'proposerName',
    },
    {
      id: 5,
      name: t('CANDIDATE_CONFIRMATION.SUPPORTER_NAME'),
      key: 'supporterName',
    },

    {
      id: 6,
      name: t('CANDIDATE_CONFIRMATION.FATHER_NAME'),
      key: 'fatherName',
      hide: !isAdmin,
    },

    {
      id: 7,
      name: t('CANDIDATE_CONFIRMATION.NOMINATION'),
      key: 'nominationPercentageForDownload',
      hide: !isDownload,
    },
    {
      id: 8,
      name: t('CANDIDATE_CONFIRMATION.NOMINATION'),
      key: 'nominationPercentage',
      hide: isDownload,
      render: (data: any) => <Percentage data={data} />,
    },

    {
      id: 9,
      name: t('CANDIDATE_MANAGEMENT.PERSONAL'),
      key: 'personalInfoPercentageForDownload',
      hide: !isDownload,
    },
    {
      id: 10,
      name: t('CANDIDATE_MANAGEMENT.PERSONAL'),
      key: 'personalInfoPercentage',
      render: (data: any) => <Percentage data={data} />,
      hide: isDownload,
    },

    {
      id: 11,
      name: t('CANDIDATE_MANAGEMENT.AFFIDAVIT'),
      key: 'holofnamaPercentageForDownload',
      hide: !isDownload,
    },
    {
      id: 12,
      name: t('CANDIDATE_MANAGEMENT.AFFIDAVIT'),
      key: 'holofnamaPercentage',
      render: (data: any) => <Percentage data={data} />,
      hide: isDownload,
    },

    {
      id: 13,
      name: t('CANDIDATE_MANAGEMENT.ATTACHMENT'),
      key: 'attachmentExistsForDownload',
      hide: !isDownload,
    },
    {
      id: 14,
      name: t('CANDIDATE_MANAGEMENT.ATTACHMENT'),
      key: 'attachmentExists',
      hide: isDownload,
      render: (data: any) =>
        data ? (
          <IconCheckSquare size="26" fill="primary" />
        ) : (
          <IconXSquare size="26" fill="danger" />
        ),
    },

    {
      id: 15,
      name: t('CANDIDATE_APPLIED_ONLINE.OPERATIONS'),
      key: 'id',
      hide: isDownload,
      render: (data: any, raw: NominationType) => (
        <Button
          type="info"
          onClick={() => handleButton(raw)}
          disabled={!stepId}
        >
          {t('CANDIDATE_CONFIRMATION.SEE')}
        </Button>
      ),
    },
  ];
};
