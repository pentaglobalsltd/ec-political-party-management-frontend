import { TFunction } from 'i18next';
import { ELECTION_INFO } from '@constants/election-info';
import { nationalElectionColumns } from './national';
import { cityCorporationColumns } from './city-corporation';
import { upazilaElectionColumns } from './upazila';
import { municipalityElectionColumns } from './municipality';
import { unionParishadElectionColumns } from './unionParishad';

export const getElectionSpecificColumns = ({
  t,
  electionTypeId,
  candidateTypeId,
}: {
  electionTypeId: string | number | undefined;
  t: TFunction<'translation', undefined>;
  candidateTypeId: number | undefined;
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      return nationalElectionColumns(t);

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return cityCorporationColumns(t, candidateTypeId);

    case ELECTION_INFO.UPAZILLA.ID:
      return upazilaElectionColumns(t);

    case ELECTION_INFO.MUNICIPALITY.ID:
      return municipalityElectionColumns(t, candidateTypeId);

    case ELECTION_INFO.UNION_PARISHAD.ID:
      return unionParishadElectionColumns(t, candidateTypeId);
    default:
      return nationalElectionColumns(t);
  }
};
