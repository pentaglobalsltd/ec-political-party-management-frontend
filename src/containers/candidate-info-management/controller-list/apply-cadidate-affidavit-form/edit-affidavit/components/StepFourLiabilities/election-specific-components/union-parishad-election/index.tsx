import { useParams } from 'react-router-dom';

import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericAffidavitFourthPartProps } from '../GenericAffidavitFourthPartProps';
import Chairman from './Chairman';

const UnionParishadElection = (props: GenericAffidavitFourthPartProps) => {
  const { candidateTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
        return <Chairman {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default UnionParishadElection;
