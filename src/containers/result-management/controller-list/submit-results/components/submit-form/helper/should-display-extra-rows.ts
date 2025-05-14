import { ELECTION_INFO } from '@constants/election-info';

export const shouldDisplayExtraRows = (
  electionTypeId: string | number | undefined,
) => {
  return [
    ELECTION_INFO.CITY_CORPORATION.ID,
    ELECTION_INFO.MUNICIPALITY.ID,
    ELECTION_INFO.UNION_PARISHAD.ID,
  ].includes(Number(electionTypeId));
};
