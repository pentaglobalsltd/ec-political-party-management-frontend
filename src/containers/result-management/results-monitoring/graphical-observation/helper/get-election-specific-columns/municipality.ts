import { TFunction } from 'i18next';
import { CANDIDATE_INFO } from '@constants/candidate-info';

export const municipalityElectionColumns = (
  t: TFunction<'translation', undefined>,
  candidateTypeId: number | undefined,
) => {
  switch (candidateTypeId) {
    case CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID:
      return [
        {
          id: 3,
          name: t('GRAPHICAL_OBSERVATION.MUNICIPALITY'),
          key: 'municipalityName',
        },
      ];

    case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID:
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

    case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID:
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
