import { ELECTION_INFO } from '@constants/election-info';
import NationalElection from './NationalElection';
import CityCorporationElection from './CityCorporationElection';
import UpazilaElection from './UpazilaElection';
import MunicipalityElection from './MunicipalityElection';
import UnionParishadElection from './union-parishad';

interface Props {
  electionTypeId: any;
}

const ElectionSpecificComponents = ({ electionTypeId }: Props) => {
  const renderFilter = () => {
    switch (electionTypeId) {
      case ELECTION_INFO.NATIONAL.ID:
        return <NationalElection />;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        return <CityCorporationElection />;

      case ELECTION_INFO.UPAZILLA.ID:
        return <UpazilaElection />;

      case ELECTION_INFO.MUNICIPALITY.ID:
        return <MunicipalityElection />;

      case ELECTION_INFO.UNION_PARISHAD.ID:
        return <UnionParishadElection />;

      default:
        return <></>;
    }
  };

  return renderFilter();
};

export default ElectionSpecificComponents;
