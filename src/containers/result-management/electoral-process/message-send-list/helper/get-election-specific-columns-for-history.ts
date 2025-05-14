import { TFunction } from 'i18next';
import { ELECTION_INFO } from '@constants/election-info';
import { CANDIDATE_INFO } from '@constants/candidate-info';

export const getElectionSpecificColumnsForHistory = ({
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

    case ELECTION_INFO.MUNICIPALITY.ID:
      return municipalityColumns(t, candidateTypeId);

    default:
      return nationalElectionColumns(t);
  }
};

const nationalElectionColumns = (t: TFunction<'translation', undefined>) => {
  return [
    {
      id: 2,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CONSTITUENCY'),
      key: 'constituencyNameBn',
    },
  ];
};

const cityCorporationColumns = (
  t: TFunction<'translation', undefined>,
  candidateTypeId: number | undefined,
) => {
  switch (candidateTypeId) {
    case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
      return [
        {
          id: 2,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MUNICIPALITY'),
          key: 'municipalityNameBn',
        },
      ];

    case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
      return [
        {
          id: 2,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MUNICIPALITY'),
          key: 'municipalityNameBn',
        },
        // electionSettingsNameBn key is not found in api response. need to tell backend
        {
          id: 3,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.UNION_WARD'),
          key: 'electionSettingsNameBn',
        },
      ];

    case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
      return [
        {
          id: 2,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MUNICIPALITY'),
          key: 'municipalityNameBn',
        },
        // electionSettingsNameBn key is not found in api response. need to tell backend
        {
          id: 3,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.UNION_WARD'),
          key: 'electionSettingsNameBn',
        },
      ];

    default:
      return [
        {
          id: 2,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MUNICIPALITY'),
          key: 'municipalityNameBn',
        },
      ];
  }
};

const upazilaElectionColumns = (t: TFunction<'translation', undefined>) => {
  return [
    {
      id: 2,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.SUB_DISTRICT'),
      key: 'upazilaNameBn',
    },
  ];
};

const municipalityColumns = (
  t: TFunction<'translation', undefined>,
  candidateTypeId: number | undefined,
) => {
  switch (candidateTypeId) {
    case CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID:
      return [
        {
          id: 2,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MUNICIPALITY'),
          key: 'municipalityNameBn',
        },
      ];

    case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID:
      return [
        {
          id: 2,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MUNICIPALITY'),
          key: 'municipalityNameBn',
        },
        // electionSettingsNameBn key is not found in api response. need to tell backend
        {
          id: 3,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.UNION_WARD'),
          key: 'electionSettingsNameBn',
        },
      ];

    case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID:
      return [
        {
          id: 2,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MUNICIPALITY'),
          key: 'municipalityNameBn',
        },

        {
          // electionSettingsNameBn key is not found in api response. need to tell backend
          id: 3,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.UNION_WARD'),
          key: 'electionSettingsNameBn',
        },
      ];

    default:
      return [
        {
          id: 2,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MUNICIPALITY'),
          key: 'municipalityNameBn',
        },
      ];
  }
};
