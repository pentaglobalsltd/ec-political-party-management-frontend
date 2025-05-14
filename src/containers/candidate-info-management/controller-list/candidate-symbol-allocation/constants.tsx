import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';
import { TFunction } from 'i18next';

import { CANDIDATE_INFO } from '@constants/candidate-info';
import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';
import { dynamicColumnForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';

export const symbolAllocationBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SYMBOL_ALLOCATION.SYMBOL_ALLOCATION'),
  },
];

export const symbolAllocationTableHeader = {
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
  rightComponents: [<DownloadButtons key={2} fileName={'test'} />],
};

const dynamicColumnForSymbolAllocation = ({
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
          id: 6,
          name: t('SYMBOL_ALLOCATION.POLITICAL_PARTY'),
          key: 'politicalParty',
        },
      ];
  }
};

export const symbolAllocationTableColumns = ({
  t,
  params,
  isDownload = false,
  isAdmin,
}: {
  t: TFunction<'translation', undefined>;
  params: any;
  isDownload?: boolean;
  isAdmin: boolean;
}) => {
  return [
    {
      id: 1,
      name: t('SYMBOL_ALLOCATION.SERIAL'),
      key: 'serialNo',
    },
    {
      id: 2,
      name: t('SYMBOL_ALLOCATION.CANDIDATE_NAME'),
      key: 'candidateName',
    },
    {
      id: 3,
      name: t('SYMBOL_ALLOCATION.NID'),
      key: 'nid',
    },
    ...dynamicColumnForCandidateType({ params, isAdmin }),

    ...dynamicColumnForElectionConstituency({ params, t, isAdmin }),
    {
      id: 12,
      name: t('CANDIDACY_WITHDRAWAL.PRESENT_NOMINATION_STATUS'),
      key: 'nominationStatus',
    },
    ...dynamicColumnForSymbolAllocation({ t, params }),

    {
      id: 7,
      name: t('SYMBOL_ALLOCATION.PREFERRED_SYMBOL'),
      key: 'preferredSymbolName',
    },

    {
      id: 8,
      name: t('SYMBOL_ALLOCATION.ALLOCATED_SYMBOL'),
      key: 'symbolName',
    },

    ...(!isDownload
      ? [
          {
            id: 9,
            name: t('SYMBOL_ALLOCATION.SYMBOL'),
            key: 'symbolId',
          },
        ]
      : []),

    {
      id: 10,
      name: t('SYMBOL_ALLOCATION.CANDIDATE_NAME_IN_ALPHABETICAL_ORDER'),
      key: 'candidateSerialNo',
    },

    ...(!isDownload
      ? [
          {
            id: 11,
            name: t('SYMBOL_ALLOCATION.ALLOCATION'),
          },
        ]
      : []),
  ];
};
