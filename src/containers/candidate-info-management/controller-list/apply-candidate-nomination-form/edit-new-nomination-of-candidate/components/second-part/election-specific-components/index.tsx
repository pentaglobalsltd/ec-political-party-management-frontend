import { useParams } from 'react-router-dom';

import NationalElection from './national-election/NationalElection';
import CityCorporationElection from './city-corporation';
import UpazillaElection from './upazilla-election';
import MunicipalityElection from './municipality-election';

import { ELECTION_INFO } from '@constants/election-info';
import { GenericNominationSecondPartProps } from './types';
import UnionParishadElection from './union-parishad-election';

const ElectionSpecificComponents = (
  props: GenericNominationSecondPartProps,
) => {
  const { electionTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        return <NationalElection {...props} />;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        return <CityCorporationElection {...props} />;

      case ELECTION_INFO.UPAZILLA.ID:
        return <UpazillaElection {...props} />;

      case ELECTION_INFO.MUNICIPALITY.ID:
        return <MunicipalityElection {...props} />;

      case ELECTION_INFO.UNION_PARISHAD.ID:
        return <UnionParishadElection {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default ElectionSpecificComponents;
