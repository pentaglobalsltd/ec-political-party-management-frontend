import { useParams } from 'react-router-dom';

import Mayor from './Mayor';
import GeneralWardCouncillor from './GeneralWardCouncillor';
import ReservedWardCouncillor from './ReservedWardCouncillor';

import { CANDIDATE_INFO } from '@constants/candidate-info';
import { GenericAffidavitFirstPartProps } from '../GenericAffidavitFirstPartProps';

const MunicipalityElection = (props: GenericAffidavitFirstPartProps) => {
  const { candidateTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(candidateTypeId)) {
      case CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID:
        return <Mayor {...props} />;

      case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID:
        return <GeneralWardCouncillor {...props} />;

      case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID:
        return <ReservedWardCouncillor {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default MunicipalityElection;
