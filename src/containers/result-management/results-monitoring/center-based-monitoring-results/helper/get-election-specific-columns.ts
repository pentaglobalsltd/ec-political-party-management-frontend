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
  candidateTypeId?: number;
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      return nationalElectionColumns(t);

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return cityCorporationColumns(t);

    case ELECTION_INFO.MUNICIPALITY.ID:
      return cityCorporationColumns(t);

    case ELECTION_INFO.UPAZILLA.ID:
      return upazilaElectionColumns(t);
    case ELECTION_INFO.UNION_PARISHAD.ID:
      return unionParishadColumns({ t, candidateTypeId });

    default:
      return nationalElectionColumns(t);
  }
};

const nationalElectionColumns = (t: TFunction<'translation', undefined>) => {
  return [
    {
      id: 2,
      name: t('CENTER_BASED_MONITORING_RESULTS.ELECTION_SEAT'),
      key: 'constituencyName',
    },
  ];
};

const cityCorporationColumns = (t: TFunction<'translation', undefined>) => {
  return [
    {
      id: 2,
      name: t('CENTER_BASED_MONITORING_RESULTS.MUNICIPALITY'),
      key: 'municipalityName',
    },

    {
      id: 21,
      name: t('CENTER_BASED_MONITORING_RESULTS.UNION_WARD'),
      key: 'unionOrWardName',
    },
  ];
};

const unionParishadColumns = ({
  t,
  candidateTypeId,
}: {
  t: TFunction<'translation', undefined>;
  candidateTypeId?: number;
}) => {
  switch (candidateTypeId) {
    case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
      return [
        {
          id: 2,
          name: t('CENTER_BASED_MONITORING_RESULTS.SUB_DISTRICT'),
          key: 'upazilaName',
        },

        {
          id: 21,
          name: t('CENTER_BASED_MONITORING_RESULTS.UNION_WARD'),
          key: 'unionOrWardName',
        },
      ];
    default:
      return [
        {
          id: 2,
          name: t('CENTER_BASED_MONITORING_RESULTS.SUB_DISTRICT'),
          key: 'upazilaName',
        },
        {
          id: 22,
          name: t('CENTER_BASED_MONITORING_RESULTS.UNION_WARD'),
          key: 'unionOrWardName',
        },
        {
          id: 24,
          name: t('CENTER_BASED_MONITORING_RESULTS.UNION_PARISHAD_WARD'),
          key: 'unionWardName',
        },
      ];
  }
};

const upazilaElectionColumns = (t: TFunction<'translation', undefined>) => {
  return [
    {
      id: 2,
      name: t('CENTER_BASED_MONITORING_RESULTS.SUB_DISTRICT'),
      key: 'upazilaName',
    },
  ];
};
