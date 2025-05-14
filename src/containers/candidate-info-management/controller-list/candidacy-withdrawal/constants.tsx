import { TFunction, t } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';
import { dynamicColumnForElectionConstituency } from '@helpers/dynamicColumnForElectionConstituency';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { dynamicColumnForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';
import { dynamicColumnForZilla } from '@containers/candidate-info-management/helper/dynamicColumnForZilla';

export const candidacyWithdrawalBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDACY_WITHDRAWAL.CANDIDACY_WITHDRAWAL'),
  },
];

const dynamicColumnForPoliticalParty = ({
  t,
  params,
}: {
  t: TFunction<'translation', undefined>;
  params: any;
}) => {
  switch (Number(params?.candidateTypeId)) {
    case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
      return [];
    case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
      return [];
    case CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID:
      return [];
    case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
      return [];

    default:
      return [
        {
          id: 7,
          name: t('CANDIDACY_WITHDRAWAL.POLITICAL_PARTY'),
          key: 'politicalParty',
        },
      ];
  }
};

export const candidacyWithdrawalTableColumns = ({
  t,
  params,
  isDownload = false,
  isAdmin,
}: {
  t: TFunction<'translation', undefined>;
  params: any;
  isDownload?: boolean;
  isAdmin: boolean;
}) => [
  {
    id: 1,
    name: t('CANDIDACY_WITHDRAWAL.SERIAL'),
    key: 'serialNo',
  },
  {
    id: 2,
    name: t('CANDIDACY_WITHDRAWAL.CANDIDATE_NAME'),
    key: 'candidateName',
  },
  {
    id: 3,
    name: t('CANDIDACY_WITHDRAWAL.NID'),
    key: 'nid',
  },
  ...dynamicColumnForCandidateType({ params, isAdmin }),
  ...dynamicColumnForZilla({ params, isAdmin }),
  ...dynamicColumnForElectionConstituency({ params, t }),
  {
    id: 12,
    name: t('CANDIDACY_WITHDRAWAL.PRESENT_NOMINATION_STATUS'),
    key: 'nominationStatus',
  },
  ...dynamicColumnForPoliticalParty({ t, params }),

  ...(!isDownload
    ? [
        {
          id: 8,
          name: t('CANDIDACY_WITHDRAWAL.DETAILS'),
          key: 'details',
        },
        {
          id: 9,
          name: t('CANDIDACY_WITHDRAWAL.ATTACHMENT'),
          key: 'attachment',
        },
        {
          id: 10,
          name: t('CANDIDACY_WITHDRAWAL.FILE'),
          key: 'file',
        },
        {
          id: 11,
          name: t('CANDIDACY_WITHDRAWAL.OPERATION'),
          key: 'operation',
        },
      ]
    : []),
];

export const withdrawalOptions = [
  {
    label: t('CANDIDACY_WITHDRAWAL.CANDIDACY_WITHDRAWAL'),
    value: 7,
  },
  {
    label: t('CANDIDACY_WITHDRAWAL.CANDIDACY_NOT_WITHDRAWAL'),
    value: 19,
  },
];
