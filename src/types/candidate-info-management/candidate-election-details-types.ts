export interface CandidateElectionDetailsType {
  constituency?: string;
  candidateType?: string;
  status?: string;
  submittedNomination?: string;
}

export interface CandidateElectionDetailsResponseType {
  data: CandidateElectionDetailsType;
  status?: number;
  statusText?: string;
}
