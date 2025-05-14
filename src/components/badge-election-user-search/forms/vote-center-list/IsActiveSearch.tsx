import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { isActiveOptions } from '@components/application-search/constants';

export const IsActiveSearch = () => {
  return (
    <div>
      <Select
        placeholder="SEARCH.CENTER_STATUS"
        name={APPLICATION_SEARCH.IS_ACTIVE}
        options={isActiveOptions}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
