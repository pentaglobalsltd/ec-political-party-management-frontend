import { CANDIDATE_INFO } from '@constants/candidate-info';
import { NominationStatsDynamicColumns } from '../getDynamicColumns';

interface Props extends NominationStatsDynamicColumns {}

export const renderUpazilaColumns = ({ t, params }: Props) => {
  return [
    {
      id: 3,
      name: t('CANDIDATE_NOMINATION_STATISTICS.CHAIRMAN'),
      key: CANDIDATE_INFO.UPAZILLA_CHAIRMAN.NAME,
    },

    {
      id: 4,
      name: t('CANDIDATE_NOMINATION_STATISTICS.VICE_CHAIRMAN'),
      key: CANDIDATE_INFO.UPAZILLA_VICE_CHAIRMAN.NAME,
    },

    {
      id: 5,
      name: t('CANDIDATE_NOMINATION_STATISTICS.WOMEN_VICE_CHAIRMAN'),
      key: CANDIDATE_INFO.UPAZILLA_WOMEN_VICE_CHAIRMAN.NAME,
    },
  ];
};
