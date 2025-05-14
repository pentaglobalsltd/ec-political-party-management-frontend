import { TFunction } from 'i18next';

import { ELECTION_INFO } from '@constants/election-info';
import { renderUpazilaColumns } from './election-specific-columns/renderUpazilaColumns';
import { renderCityColumns } from './election-specific-columns/renderCityColumns';
import { renderNationalColumns } from './election-specific-columns/renderNationalColumns';

export interface NominationStatsDynamicColumns {
  params: any;
  t: TFunction<'translation', undefined>;
}

export const getDynamicColumns = ({
  params,
  t,
}: NominationStatsDynamicColumns) => {
  switch (Number(params?.electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return renderNationalColumns({ params, t });

    case ELECTION_INFO.CITY_CORPORATION.ID:
      return renderCityColumns({ params, t });

    case ELECTION_INFO.UPAZILLA.ID:
      return renderUpazilaColumns({ params, t });

    default:
      return [];
  }
};

export const findCandidateCount = ({
  row,
  candidateTypeId,
}: {
  row: any;
  candidateTypeId: number;
}): number => {
  const countObj = row?.candidateInfo?.find(
    (obj: any) => obj?.candidateTypeId === candidateTypeId,
  );

  const count = countObj?.candidateCounts || 0;

  return count;
};
