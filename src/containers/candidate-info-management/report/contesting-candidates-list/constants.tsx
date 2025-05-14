import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

import { ELECTION_INFO } from '@constants/election-info';
import { electionNameMapping } from '@helpers/election-type';
import { CANDIDATE_INFO } from '@constants/candidate-info';

export const contestingCandidatesListTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATES_LIST'),
  },
];

const dynamicColumns = (
  t: TFunction<'translation', undefined>,
  electionTypeId: string | number,
) => {
  switch (Number(electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return [
        {
          id: 4,
          name: t('CONTESTING_CANDIDATES_LIST.CANDIDATES_FATHER_NAME'),
          key: 'fatherOrHusbandName',
        },
        {
          id: 5,
          name: t(
            'CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATES_PRESENT_ADDRESS',
          ),
          key: 'presentAddress',
        },
        {
          id: 6,
          name: t(
            'CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATES_PERMANENT_ADDRESS',
          ),
          key: 'permanentAddress',
        },
      ];

    case ELECTION_INFO.UPAZILLA.ID:
      return [
        {
          id: 4,
          name: t('CONTESTING_CANDIDATES_LIST.CANDIDATES_FATHER_NAME'),
          key: 'fatherOrHusbandName',
        },
        {
          id: 5,
          name: t(
            'CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATES_PRESENT_ADDRESS',
          ),
          key: 'presentAddress',
        },
        {
          id: 6,
          name: t(
            'CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATES_PERMANENT_ADDRESS',
          ),
          key: 'permanentAddress',
        },
      ];

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return [
        {
          id: 5,
          name: t('CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATE_ADDRESS'),
          key: 'candidateAddress',
        },
      ];

    case ELECTION_INFO.MUNICIPALITY.ID:
      return [
        {
          id: 5,
          name: t('CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATE_ADDRESS'),
          key: 'candidateAddress',
        },
      ];

    default:
      return [
        {
          id: 4,
          name: t('CONTESTING_CANDIDATES_LIST.CANDIDATES_FATHER_NAME'),
          key: 'fatherOrHusbandName',
        },
        {
          id: 5,
          name: t(
            'CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATES_PRESENT_ADDRESS',
          ),
          key: 'presentAddress',
        },
        {
          id: 6,
          name: t(
            'CONTESTING_CANDIDATES_LIST.CONTESTING_CANDIDATES_PERMANENT_ADDRESS',
          ),
          key: 'permanentAddress',
        },
      ];
  }
};

const dynamicColumnsForPoliticalParty = (
  t: TFunction<'translation', undefined>,
  electionTypeKey: string,
  candidateTypeId?: string | number,
) => {
  switch (Number(candidateTypeId)) {
    case CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID:
      return [];
    case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
      return [];

    default:
      return [
        {
          id: 3,
          name: t(
            `CONTESTING_CANDIDATES_LIST.POLITICAL_PARTY_NAME.${electionTypeKey}`,
          ),
          key: 'politicalParty',
        },
      ];
  }
};
const dynamicColumnsForComment = (
  t: TFunction<'translation', undefined>,
  electionTypeId: string | number,
) => {
  switch (Number(electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return [
        {
          id: 8,
          name: t('CONTESTING_CANDIDATES_LIST.COMMENT'),
          key: 'statusComment',
        },
      ];

    case ELECTION_INFO.UPAZILLA.ID:
      return [
        {
          id: 8,
          name: t('CONTESTING_CANDIDATES_LIST.COMMENT'),
          key: 'statusComment',
        },
      ];

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return [];

    case ELECTION_INFO.MUNICIPALITY.ID:
      return [];

    default:
      return [
        {
          id: 8,
          name: t('CONTESTING_CANDIDATES_LIST.COMMENT'),
          key: 'statusComment',
        },
      ];
  }
};

export const contestingCandidatesListTableColumns = (
  t: TFunction<'translation', undefined>,
  electionTypeId: string,
  candidateTypeId?: string,
) => {
  const electionTypeKey =
    electionNameMapping(Number(electionTypeId)) || ELECTION_INFO.NATIONAL.NAME;
  return [
    {
      id: 1,
      name: t('CONTESTING_CANDIDATES_LIST.ID'),
      key: 'idx',
    },
    {
      id: 2,
      name: t('CONTESTING_CANDIDATES_LIST.RIVAL_CANDIDATE_NAME'),
      key: 'candidateName',
    },
    ...dynamicColumnsForPoliticalParty(t, electionTypeKey, candidateTypeId),

    ...dynamicColumns(t, electionTypeId),

    {
      id: 7,
      name: t('CONTESTING_CANDIDATES_LIST.ALLOCATED_SYMBOL'),
      key: 'symbolName',
    },

    ...dynamicColumnsForComment(t, electionTypeId),
  ];
};

export const shouldModalOpen = (params: any) => {
  switch (Number(params?.electionTypeId)) {
    case ELECTION_INFO.UPAZILLA.ID:
      return true;
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return true;
    default:
      return false;
  }
};
