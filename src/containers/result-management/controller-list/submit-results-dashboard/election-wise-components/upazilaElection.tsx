import { IconChevronDown } from '@pentabd/icons';
import { OptionType } from '@pentabd/ui/build/atoms/select/types';
import Select from '@components/inputs/Select';
import { QueryParamsType, SUBMIT_RESULTS } from '../candidateWiseComponent';
import { SelectOptionArray } from '@type/selection-option-type';

export const UpazilaElection = ({
  queryParams,
  handleQueryParams,
  electionSettings,
}: {
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
  return (
    <form className="w-25">
      <Select
        title="SEARCH.SUB_DISTRICT"
        name={SUBMIT_RESULTS.ELECTION_SETTINGS}
        onSelectItem={(data) => {
          handleQueryParams({
            key: SUBMIT_RESULTS.ELECTION_SETTINGS,
            electionSettings: data as number,
          });
        }}
        defaultValue={queryParams?.electionSettingsValue}
        options={electionSettings as OptionType[]}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </form>
  );
};
