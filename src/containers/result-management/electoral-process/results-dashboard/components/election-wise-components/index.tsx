import { ELECTION_INFO } from '@constants/election-info';
import { UpazilaElection } from './upazilaElection';
import { CityCorporationMunicipalityElection } from './cityCorporationMunicipalityElection';
import { UnionParishadElection } from './unionParishadElection';
import { SelectOptionArray } from '@type/selection-option-type';
import { QueryParamsType } from '../../candidateWiseComponent';

export const ElectionWiseComponent = ({
  electionTypeId,
  queryParams,
  handleQueryParams,
  electionSettings,
  candidateTypeId,
}: {
  electionTypeId?: string | number;
  candidateTypeId?: string | number;
  electionSettings?: SelectOptionArray[];
  queryParams: QueryParamsType;
  handleQueryParams: ({
    key,
    page,
    checkboxValue,
    electionSettings,
    pollingCenter,
  }: {
    key: string;
    page?: number;
    checkboxValue?: string;
    electionSettings?: number | string | null;
    pollingCenter?: string;
  }) => void;
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.UPAZILLA.ID:
      return (
        <UpazilaElection
          queryParams={queryParams}
          handleQueryParams={handleQueryParams}
          electionSettings={electionSettings}
        />
      );
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return (
        <CityCorporationMunicipalityElection
          queryParams={queryParams}
          handleQueryParams={handleQueryParams}
          electionSettings={electionSettings}
        />
      );
    case ELECTION_INFO.MUNICIPALITY.ID:
      return (
        <CityCorporationMunicipalityElection
          queryParams={queryParams}
          handleQueryParams={handleQueryParams}
          electionSettings={electionSettings}
        />
      );
    case ELECTION_INFO.UNION_PARISHAD.ID:
      return (
        <UnionParishadElection
          handleQueryParams={handleQueryParams}
          candidateTypeId={candidateTypeId}
          electionSettings={electionSettings}
        />
      );
    default:
      return <></>;
  }
};
