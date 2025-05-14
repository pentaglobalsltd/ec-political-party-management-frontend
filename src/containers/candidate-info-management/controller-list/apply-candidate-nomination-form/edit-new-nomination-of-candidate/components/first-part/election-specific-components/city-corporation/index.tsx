import { GenericNominationFirstPartProps } from '../types';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import Mayor from './Mayor';
import { useParams } from 'react-router-dom';
import Councillor from './Councillor';

const CityCorporationElection = (props: GenericNominationFirstPartProps) => {
  const { candidateTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
        return <Mayor {...props} />;

      case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
        return <Councillor {...props} />;

      case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
        return <Councillor {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default CityCorporationElection;
