import { useParams } from 'react-router';
import { ELECTION_INFO } from '@constants/election-info';
import NationalElection from './NationalElection';
import CityCorporationElection from './city-corporation';
import UpazillaElection from './upazilla-election';
import UnionParishadElection from './union-parishad';
import MunicipalityElection from './municipality-election';

const ElectionSpecificComponentsProposer = () => {
  const { electionTypeId } = useParams();
  const renderComponents = () => {
    switch (Number(electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        return <NationalElection />;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        return <CityCorporationElection />;

      case ELECTION_INFO.UPAZILLA.ID:
        return <UpazillaElection />;

      case ELECTION_INFO.MUNICIPALITY.ID:
        return <MunicipalityElection />;

      case ELECTION_INFO.UNION_PARISHAD.ID:
        return <UnionParishadElection />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default ElectionSpecificComponentsProposer;
