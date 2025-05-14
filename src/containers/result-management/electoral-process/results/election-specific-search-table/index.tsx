import { ELECTION_INFO } from '@constants/election-info';
import DefaultElection from './default-election';
import UnionParishadElection from './union-parishad';

export const ElectionSpecificSearchAndTable = ({
  electionTypeId,
}: {
  electionTypeId?: number | string;
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.UNION_PARISHAD.ID:
      return <UnionParishadElection />;
    default:
      return <DefaultElection />;
  }
};
