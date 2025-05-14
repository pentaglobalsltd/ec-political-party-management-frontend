import NationalElection from './NationalElection';
import CityCorporationElection from './CityCorporationElection';
import UpazilaElection from './UpazilaElection';
import MunicipalityElection from './MunicipalityElection';

import { ELECTION_INFO } from '@constants/election-info';
import { CreateNewOpType } from './types';

const ElectionSpecificComponents = (props: CreateNewOpType) => {
  const { electionTypeWatch } = props;

  const renderComponents = () => {
    switch (Number(electionTypeWatch)) {
      case ELECTION_INFO.NATIONAL.ID:
        return <NationalElection {...props} />;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        return <CityCorporationElection {...props} />;

      case ELECTION_INFO.UPAZILLA.ID:
        return <UpazilaElection {...props} />;

      case ELECTION_INFO.MUNICIPALITY.ID:
        return <MunicipalityElection {...props} />;

      case ELECTION_INFO.UNION_PARISHAD.ID:
        return <UpazilaElection {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default ElectionSpecificComponents;
