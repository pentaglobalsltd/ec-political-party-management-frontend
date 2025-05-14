import { useParams } from 'react-router-dom';

import Mayor from './Mayor';
import Councillor from './Councillor';

import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericNominationSecondPartProps } from '../types';

const MunicipalityElection = (props: GenericNominationSecondPartProps) => {
  const { candidateTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID:
        return <Mayor {...props} />;

      case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID:
        return <Councillor {...props} />;

      case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID:
        return <Councillor {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default MunicipalityElection;
