import { CANDIDATE_INFO } from '@constants/candidate-info';
import { NominationStatsDynamicColumns } from '../getDynamicColumns';

interface Props extends NominationStatsDynamicColumns {}

export const renderNationalColumns = ({ t, params }: Props) => {
  return [
    {
      id: 3,
      name: t('CANDIDATE_NOMINATION_STATISTICS.NATIONAL_MEMBER_OF_PARLIAMENT'),
      key: CANDIDATE_INFO.NATIONAL_MEMBER_OF_PARLIAMENT.NAME,
    },
  ];
};
