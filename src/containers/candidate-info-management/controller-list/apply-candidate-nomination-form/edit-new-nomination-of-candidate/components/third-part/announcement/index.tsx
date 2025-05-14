import { useParams } from 'react-router-dom';

import NationalElection from './NationalElection';
import CityCorporationElection from './CityCorporationElection';
import UpazillaElection from './UpazillaElection';
import MunicipalityElection from './MunicipalityElection';

import { ELECTION_INFO } from '@constants/election-info';
import UnionParishadElection from './UnionParishadElection';

const Announcement = () => {
  const { electionTypeId } = useParams();

  const renderAnnouncement = () => {
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

  return renderAnnouncement();
};

export default Announcement;
