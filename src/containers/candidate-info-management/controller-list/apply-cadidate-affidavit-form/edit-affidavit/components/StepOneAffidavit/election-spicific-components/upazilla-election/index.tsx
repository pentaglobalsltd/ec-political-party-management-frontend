import { useParams } from 'react-router-dom';

import Chairman from './Chairman';
import ViceChairman from './ViceChairman';
import WomenViceChairman from './WomenViceChairman';

import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericAffidavitFirstPartProps } from '../GenericAffidavitFirstPartProps';

const UpazillaElection = (props: GenericAffidavitFirstPartProps) => {
  const { candidateTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.UPAZILLA_CHAIRMAN.ID:
        return <Chairman {...props} />;

      case CANDIDATE_INFO.UPAZILLA_VICE_CHAIRMAN.ID:
        return <ViceChairman {...props} />;

      case CANDIDATE_INFO.UPAZILLA_WOMEN_VICE_CHAIRMAN.ID:
        return <WomenViceChairman {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default UpazillaElection;
