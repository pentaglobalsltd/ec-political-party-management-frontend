import { ELECTION_INFO } from '@constants/election-info';
import { GenericProps } from '../types';
import { SETTINGS_LABEL } from '../constants';

import NationalElection from './national-election/NationalElection';
import CityCorporationElection from './city-corporation-election';
import UpazillaElection from './upazilla-election';
import MunicipalityElection from './municipality-election';
import UnionElection from './union-election';

const ElectionSpecificComponents = (props: GenericProps) => {
  const { electionId } = props;

  const renderComponents = () => {
    switch (electionId) {
      case ELECTION_INFO.NATIONAL.ID:
        return (
          <NationalElection
            {...props}
            settingsLabel={SETTINGS_LABEL.CONSTITUENCY}
          />
        );

      case ELECTION_INFO.CITY_CORPORATION.ID:
        return <CityCorporationElection {...props} />;

      case ELECTION_INFO.UPAZILLA.ID:
        return <UpazillaElection {...props} />;

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
