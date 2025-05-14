import { Pagination } from '@api/miscellaneous/types';

export interface CandidateNominationStatistics {
  id?: number;
  statusCode: number;
  statusNameBn?: string;
  candidateTypeId?: number;
  candidateTypeNameBn?: string;
  candidateCounts?: number;
  lastUpdatedDateTime?: string;
}
export interface CandidateNominationStatisticsPaginated extends Pagination {
  candidateElectionStats?: CandidateNominationStatistics[];
}

export interface CandidateNominationStatisticsPaginatedProps {
  data: CandidateNominationStatisticsPaginated;
  status: number;
}

// =====================================

export interface SingleCandidateInfoStats {
  candidateTypeId?: number;
  candidateTypeNameBn?: string;
  candidateCounts?: number;
  lastUpdatedDateTime?: string;
}

export interface CandidateNominationStatisticsFrontend {
  id?: number;
  statusCode: number;
  statusNameBn?: string;
  totalCounts?: number;
  candidateInfo?: SingleCandidateInfoStats[];
}
