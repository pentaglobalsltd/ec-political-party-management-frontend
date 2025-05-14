import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

import { ELECTION_INFO } from '@constants/election-info';
import { electionNameMapping } from '@helpers/election-type';
import { CANDIDATE_INFO } from '@constants/candidate-info';

export const validNominatedCandidateListTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VALID_NOMINATED_CANDIDATE_LIST.VALID_NOMINATED_CANDIDATE_LIST'),
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
          id: 5,
          name: t('VALID_NOMINATED_CANDIDATE_LIST.PRESENT_ADDRESS'),
          key: 'presentAddress',
        },
        {
          id: 6,
          name: t('VALID_NOMINATED_CANDIDATE_LIST.PERMANENT_ADDRESS'),
          key: 'permanentAddress',
        },
      ];
    case ELECTION_INFO.UPAZILLA.ID:
      return [
        {
          id: 5,
          name: t('VALID_NOMINATED_CANDIDATE_LIST.CANDIDATES_MOTHER_NAME'),
          key: 'motherName',
        },
        {
          id: 6,
          name: t('VALID_NOMINATED_CANDIDATE_LIST.CANDIDATE_ADDRESS'),
          key: 'candidateAddress',
        },
        {
          id: 7,
          name: t(
            'VALID_NOMINATED_CANDIDATE_LIST.CONSTITUENCY_NAME_AND_NUMBER',
          ),
          key: 'id',
          render: () => <div></div>,
        },
      ];
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return [
        {
          id: 5,
          name: t('VALID_NOMINATED_CANDIDATE_LIST.CANDIDATES_MOTHER_NAME'),
          key: 'motherName',
        },
        {
          id: 6,
          name: t('VALID_NOMINATED_CANDIDATE_LIST.CANDIDATE_ADDRESS'),
          key: 'candidateAddress',
        },
      ];
    default:
      return [
        {
          id: 5,
          name: t('VALID_NOMINATED_CANDIDATE_LIST.PRESENT_ADDRESS'),
          key: 'presentAddress',
        },
        {
          id: 6,
          name: t('VALID_NOMINATED_CANDIDATE_LIST.PERMANENT_ADDRESS'),
          key: 'permanentAddress',
        },
      ];
  }
};
const dynamicPoliticalParty = ({
  t,
  electionTypeKey,
  candidateTypeId,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeKey: string;
  candidateTypeId: string;
}) => {
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
            `VALID_NOMINATED_CANDIDATE_LIST.POLITICAL_PARTY_NAME.${electionTypeKey}`,
          ),
          key: 'politicalParty',
        },
      ];
  }
};

export const validNominatedCandidateListTableColumns = ({
  t,
  electionTypeId,
  candidateTypeId,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeId: string;
  candidateTypeId: string;
}) => {
  const electionTypeKey =
    electionNameMapping(Number(electionTypeId)) || ELECTION_INFO.NATIONAL.NAME;
  return [
    {
      id: 1,
      name: t(`VALID_NOMINATED_CANDIDATE_LIST.ID.${electionTypeKey}`),
      key: 'idx',
    },
    {
      id: 2,
      name: t(
        `VALID_NOMINATED_CANDIDATE_LIST.CANDIDATE_NAME_BANGLA.${electionTypeKey}`,
      ),
      key: 'candidateName',
    },
    ...dynamicPoliticalParty({ t, electionTypeKey, candidateTypeId }),
    {
      id: 4,
      name: t(
        `VALID_NOMINATED_CANDIDATE_LIST.CANDIDATES_FATHER_NAME.${electionTypeKey}`,
      ),
      key: 'fatherOrHusbandName',
    },
    ...dynamicColumns(t, electionTypeId || ELECTION_INFO.NATIONAL.ID),
  ];
};
