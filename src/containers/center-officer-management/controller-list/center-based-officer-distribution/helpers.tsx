import { ELECTION_INFO } from '@constants/election-info';
import {
  searchStructElectionUserPollingCenter,
  searchStructUnionParishadElectionUserPollingCenter,
} from './searchConstantPollingCenter';

export const ElectionSpecificElectionUserPollingCenterSearch = ({
  electionTypeId,
  electionScheduleId,
  zillaId,
  upazilaId,
  unionOrWardId,
}: {
  electionTypeId?: string | number;
  electionScheduleId?: string | number;
  zillaId?: string | number;
  upazilaId?: string | number;
  unionOrWardId?: number[];
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.UNION_PARISHAD.ID:
      if (unionOrWardId && unionOrWardId.length > 0) {
        return searchStructUnionParishadElectionUserPollingCenter({
          electionScheduleId,
          zillaId,
          upazilaId,
          unionOrWardId,
        });
      }
    default:
      return searchStructElectionUserPollingCenter({
        electionScheduleId,
        zillaId,
        upazilaId,
      });
  }
};
