import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';

import { PATH } from '@constants/paths';
import { ELECTION_INFO } from '@constants/election-info';
import { electionNameMapping } from '@helpers/election-type';
import { CANDIDATE_INFO } from '@constants/candidate-info';

export const getBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('NOMINATION_PAPER_INFORMATION.BREADCRUMBS.NOMINATION_PAPER_INFO'),
    link: PATH.VOTER_AREA, // TODO
  },
];

const dynamicColumns = (
  t: TFunction<'translation', undefined>,
  tNominationTable: string,
  electionTypeKey: string,
  electionTypeId: string,
  candidateTypeId?: string,
) => {
  switch (Number(electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return [
        {
          id: 3,
          name: t(
            `${tNominationTable}.FATHER_OR_HUSBAND_NAME.${electionTypeKey}`,
          ),
          key: 'fatherOrHusbandName',
        },
      ];
    case ELECTION_INFO.UPAZILLA.ID:
      return [
        {
          id: 10,
          name: t(`${tNominationTable}.PARTY_NAME.${electionTypeKey}`),
          key: 'politicalParty',
          render: (politicalParty?: string) => (
            <div>{politicalParty || ''}</div>
          ),
        },
        {
          id: 3,
          name: t(
            `${tNominationTable}.FATHER_OR_HUSBAND_NAME.${electionTypeKey}`,
          ),
          key: 'fatherOrHusbandName',
        },
      ];
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return [
        {
          id: 10,
          name: t(`${tNominationTable}.PARTY_NAME.${electionTypeKey}`),
          key: 'politicalParty',
          render: (politicalParty?: string) => (
            <div>{politicalParty || ''}</div>
          ),
        },
      ];

    case ELECTION_INFO.MUNICIPALITY.ID:
      return [
        {
          id: 10,
          name: t(`${tNominationTable}.PARTY_NAME.${electionTypeKey}`),
          key: 'politicalParty',
          render: (politicalParty?: string) => (
            <div>{politicalParty || ''}</div>
          ),
        },
      ];
    case ELECTION_INFO.UNION_PARISHAD.ID:
      switch (Number(candidateTypeId)) {
        case CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID:
          return [
            {
              id: 12,
              name: t(
                `${tNominationTable}.FATHER_OR_HUSBAND_NAME.${electionTypeKey}`,
              ),
              key: 'fatherOrHusbandName',
            },
          ];
        case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
          return [
            {
              id: 12,
              name: t(
                `${tNominationTable}.FATHER_OR_HUSBAND_NAME.${electionTypeKey}`,
              ),
              key: 'fatherOrHusbandName',
            },
          ];
      }
      return [
        {
          id: 11,
          name: t(`${tNominationTable}.PARTY_NAME.${electionTypeKey}`),
          key: 'politicalParty',
          render: (politicalParty?: string) => (
            <div>{politicalParty || ''}</div>
          ),
        },
        {
          id: 12,
          name: t(
            `${tNominationTable}.FATHER_OR_HUSBAND_NAME.${electionTypeKey}`,
          ),
          key: 'fatherOrHusbandName',
        },
      ];
    default:
      return [];
  }
};

const dynamicConstituencyNameAndNumber = (
  t: TFunction<'translation', undefined>,
  tNominationTable: string,
  electionTypeKey: string,
  electionTypeId: string,
) => {
  switch (Number(electionTypeId)) {
    case ELECTION_INFO.UPAZILLA.ID:
      return [
        {
          id: 12,
          name: t(`${tNominationTable}.CONSTITUENCY_NAME_AND_NUMBER`),
          key: 'id',
          render: () => <div></div>,
        },
      ];

    default:
      return [];
  }
};

export const columns = ({
  t,
  tNominationTable,
  electionTypeId,
  candidateTypeId,
}: {
  t: TFunction<'translation', undefined>;
  tNominationTable: string;
  electionTypeId: string;
  candidateTypeId?: string;
}) => {
  const electionTypeKey =
    electionNameMapping(Number(electionTypeId)) || ELECTION_INFO.NATIONAL.NAME;

  return [
    {
      id: 1,
      name: t(`${tNominationTable}.SERIAL_NO`),
      key: 'idx',
    },
    {
      id: 2,
      name: t(`${tNominationTable}.SUBMITTER_NAME_NID.${electionTypeKey}`),
      key: 'candidateNameWithNid',
    },

    ...dynamicColumns(
      t,
      tNominationTable,
      electionTypeKey,
      electionTypeId,
      candidateTypeId,
    ),
    {
      id: 4,
      name: t(`${tNominationTable}.PRESENT_ADDRESS`),
      key: 'presentAddress',
    },

    {
      id: 5,
      name: t(`${tNominationTable}.PERMANENT_ADDRESS`),
      key: 'permanentAddress',
    },

    {
      id: 6,
      name: t(`${tNominationTable}.PROPOSER_NAME_NID.${electionTypeKey}`),
      key: 'proposerNameWithNid',
    },

    {
      id: 7,
      name: t(`${tNominationTable}.SUPPORTER_NAME_NID.${electionTypeKey}`),
      key: 'supporterNameWithNid',
    },
    {
      id: 8,
      name: t(`${tNominationTable}.NUMBER_OF_NOMINATIONS`),
      key: 'NUMBER_OF_NOMINATIONS',
    },
    ...dynamicConstituencyNameAndNumber(
      t,
      tNominationTable,
      electionTypeKey,
      electionTypeId,
    ),
    {
      id: 9,
      name: t(`${tNominationTable}.COMMENT`),
      key: 'statusComment',
    },
  ];
};
