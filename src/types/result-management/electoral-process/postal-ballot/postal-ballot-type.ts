export interface CandidateVoteCounts {
  id: number;
  postalVoteId?: number;
  candidateElectionDetailsId?: number;
  candidateTypeId?: number;
  candidateName?: string;
  symbolName?: string;
  candidateSerialNo?: number;
  politicalPartyName?: string;
  voteCount?: number;
  symbolId?: number;
  politicalPartyId?: number;
}

export interface PostalBallotCenterType {
  id: number;
  totalVoteCount?: number;
  candidateVoteCounts?: CandidateVoteCounts[];
  fileFromRo?: any;
}

export interface PostalBallotCenterTypeRes {
  data?: PostalBallotCenterType;
  status?: number;
  statusText?: string;
}
