interface CandidateTypeWiseCounts {
  candidateTypeId?: number;
  count?: number;
}

export interface CandidatePaymentStats {
  id: number;
  paymentMethod: string;
  candidateTypeWiseCounts: CandidateTypeWiseCounts[];
}

export interface CandidatePaymentTable {
  candidatePaymentStats?: CandidatePaymentStats[];
}

export interface CandidatePaymentResponse {
  data: CandidatePaymentTable;
  status: number;
}
