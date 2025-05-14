import { CANDIDATE_INFO } from '@constants/candidate-info';
import { useParams } from 'react-router';
import Mayor from './Mayor';
import Councillor from './Councillor';

const CityCorporationElection = () => {
  const { candidateTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
        return <Mayor />;

      case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
        return <Councillor />;

      case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
        return <Councillor />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default CityCorporationElection;
