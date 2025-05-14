export interface CandidateSummarizedResultType {
  candidateName?: string;
  symbolName?: string;
  politicalPartyName?: string;
  receivedVote?: number;
  id: string | number;
}

export interface OverallSummary {
  totalPollingCenters?: number;
  totalObtainedResults?: number;
  totalClosedDeclared?: number;
  totalVoter?: number;
  totalMaleVoter?: number;
  totalThirdGenderVoter?: number;
  totalFemaleVoter?: number;
  candidateSummarizedResults?: CandidateSummarizedResultType[];
}
