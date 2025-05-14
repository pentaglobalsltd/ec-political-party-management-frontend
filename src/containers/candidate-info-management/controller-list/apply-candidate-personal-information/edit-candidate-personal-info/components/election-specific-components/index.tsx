import { useParams } from 'react-router-dom';

import { NationalElection } from './national-election';
import { MunicipalityElection } from './municipality-election';

import { ELECTION_INFO } from '@constants/election-info';
import { GenericPersonalInfoProps } from './types';
import { UnionElection } from './union-election';

const ElectionSpecificComponents = (props: GenericPersonalInfoProps) => {
  const { electionTypeId } = useParams();

  const renderComponents = () => {
    switch (Number(electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        return <NationalElection {...props} />;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        return <NationalElection {...props} />;

      case ELECTION_INFO.UPAZILLA.ID:
        return <NationalElection {...props} />;

      case ELECTION_INFO.MUNICIPALITY.ID:
        return <MunicipalityElection {...props} />;

      case ELECTION_INFO.UNION_PARISHAD.ID:
        return <UnionElection {...props} />;

      default:
        return <></>;
    }
  };

  return renderComponents();
};

export default ElectionSpecificComponents;
