import { TFunction } from 'i18next';
import { ELECTION_INFO } from '@constants/election-info';
import { CANDIDATE_INFO } from '@constants/candidate-info';

export const getElectionSpecificColumns = ({
  t,
  electionTypeId,
  candidateTypeId,
}: {
  electionTypeId: string | number | undefined;
  t: TFunction<'translation', undefined>;
  candidateTypeId: number | undefined;
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      return nationalElectionColumns(t);

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return cityCorporationColumns(t, candidateTypeId);

    case ELECTION_INFO.UPAZILLA.ID:
      return upazilaElectionColumns(t);

    case ELECTION_INFO.UNION_PARISHAD.ID:
      return unionParishadElectionColumns(t);
    default:
      return nationalElectionColumns(t);
  }
};

const nationalElectionColumns = (t: TFunction<'translation', undefined>) => {
  return [
    {
      id: 3,
      name: t('GRAPHICAL_OBSERVATION.CONSTITUENCY'),
      key: 'constituencyName',
    },
  ];
};

export const cityCorporationColumns = (
  t: TFunction<'translation', undefined>,
  candidateTypeId: number | undefined,
) => {
  switch (candidateTypeId) {
    case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
      return [
        {
          id: 3,
          name: t('GRAPHICAL_OBSERVATION.MUNICIPALITY'),
          key: 'municipalityName',
        },
      ];

    case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
      return [
        {
          id: 3,
          name: t('GRAPHICAL_OBSERVATION.MUNICIPALITY'),
          key: 'municipalityName',
        },

        {
          id: 31,
          name: t('GRAPHICAL_OBSERVATION.UNION_OR_WARD'),
          key: 'electionSettingsNameBn',
        },
      ];

    case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
      return [
        {
          id: 3,
          name: t('GRAPHICAL_OBSERVATION.MUNICIPALITY'),
          key: 'municipalityName',
        },

        {
          id: 31,
          name: t('GRAPHICAL_OBSERVATION.UNION_OR_WARD'),
          key: 'electionSettingsNameBn',
        },
      ];

    default:
      return [
        {
          id: 3,
          name: t('GRAPHICAL_OBSERVATION.MUNICIPALITY'),
          key: 'municipalityName',
        },
      ];
  }
};

const upazilaElectionColumns = (t: TFunction<'translation', undefined>) => {
  return [
    {
      id: 3,
      name: t('GRAPHICAL_OBSERVATION.SUB_DISTRICT'),
      key: 'upazilaName',
    },
  ];
};

const unionParishadElectionColumns = (
  t: TFunction<'translation', undefined>,
) => {
  return [
    {
      id: 3,
      name: t('GRAPHICAL_OBSERVATION.SUB_DISTRICT'),
      key: 'upazilaName',
    },
    {
      id: 12,
      name: t('GRAPHICAL_OBSERVATION.UNION_OR_WARD'),
      key: 'unionOrWardNameBn',
    },
  ];
};
