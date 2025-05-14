import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { AvailableCases } from '@components/application-search/constants';

export const CaseSearch = () => {
  return (
    <div>
      <Select
        title="SEARCH.CASE"
        name={APPLICATION_SEARCH.CASE}
        options={AvailableCases()}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
