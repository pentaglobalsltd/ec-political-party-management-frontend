import Mayor from './Mayor';
import Counselor from './Counselor';
import ReservedCounselor from './ReservedCounselor';

import { SETTINGS_LABEL } from '../../constants';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericProps } from '../../types';

const CityCorporationElection = (props: GenericProps) => {
  const { candidateTypeId } = props;

  const renderComponents = () => {
    switch (candidateTypeId) {
      case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
        return <Mayor {...props} settingsLabel={SETTINGS_LABEL.MUNICIPALITY} />;

      case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
        return <Counselor {...props} />;

      case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
        return <ReservedCounselor {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default CityCorporationElection;
