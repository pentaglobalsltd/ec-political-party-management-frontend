import { CANDIDATE_INFO } from '@constants/candidate-info';
import { NominationStatsDynamicColumns } from '../getDynamicColumns';

interface Props extends NominationStatsDynamicColumns {}

export const renderCityColumns = ({ t, params }: Props) => {
  return [
    {
      id: 3,
      name: t('CANDIDATE_NOMINATION_STATISTICS.CITY_CORPORATION_MAYOR'),
      key: CANDIDATE_INFO.CITY_CORPORATION_MAYOR.NAME,
    },

    {
      id: 4,
      name: t('CANDIDATE_NOMINATION_STATISTICS.CITY_CORPORATION_COUNCILLOR'),
      key: CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.NAME,
    },

    {
      id: 5,
      name: t(
        'CANDIDATE_NOMINATION_STATISTICS.CITY_CORPORATION_WOMAN_COUNCILLOR',
      ),
      key: CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.NAME,
    },
  ];
};
