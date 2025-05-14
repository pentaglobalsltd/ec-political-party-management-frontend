import { ELECTION_INFO } from '@constants/election-info';
import NationalElection from './NationalElection';
import UpazillaElection from './UpazillaElection';
import CityCorporationElection from './CityCorporationElection';
import MunicipalityElection from './MunicipalityElection';
import UnionParishadElection from './UnionParishadElection';

interface Props {
  electionTypeId?: number;
  candidateTypeId?: number | string;
  politicalPartyId?: number | string;
}

const ElectionSpecificComponent = ({
  electionTypeId,
  candidateTypeId,
  politicalPartyId,
}: Props) => {
  const renderComponents = () => {
    switch (electionTypeId) {
      case ELECTION_INFO.NATIONAL.ID:
        return <NationalElection />;

      case ELECTION_INFO.UPAZILLA.ID:
        return <UpazillaElection />;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        return (
          <CityCorporationElection
            candidateTypeId={candidateTypeId}
            politicalPartyId={politicalPartyId}
          />
        );

      case ELECTION_INFO.MUNICIPALITY.ID:
        return (
          <MunicipalityElection
            candidateTypeId={candidateTypeId}
            politicalPartyId={politicalPartyId}
          />
        );

      case ELECTION_INFO.UNION_PARISHAD.ID:
        return (
          <UnionParishadElection
            candidateTypeId={candidateTypeId}
            politicalPartyId={politicalPartyId}
          />
        );
      default:
        return null;
    }
  };

  return renderComponents();
};

export default ElectionSpecificComponent;
