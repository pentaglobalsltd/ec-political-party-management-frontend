import { useParams } from 'react-router-dom';

import Mayor from './Mayor';
import Councillor from './Councillor';
import ReservedCouncillor from './ReservedCouncillor';

import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericAffidavitFourthPartProps } from '../GenericAffidavitFourthPartProps';

const CityCorporationElection = (props: GenericAffidavitFourthPartProps) => {
  const { candidateTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
        return <Mayor {...props} />;

      case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
        return <Councillor {...props} />;

      case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
        return <ReservedCouncillor {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default CityCorporationElection;
