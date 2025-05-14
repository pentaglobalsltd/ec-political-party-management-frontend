import { CANDIDATE_INFO } from '@constants/candidate-info';

type CandidateType = string | number | undefined;

export const isUnionChairman = (candidateTypeId: CandidateType) =>
  Number(candidateTypeId) === CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID;

export const isUnionMember = (candidateTypeId: CandidateType) =>
  [
    CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
    CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
  ].includes(Number(candidateTypeId));
