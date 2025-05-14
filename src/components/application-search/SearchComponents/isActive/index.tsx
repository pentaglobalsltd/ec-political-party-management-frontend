import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { RefreshDataType, StructTypes } from '../types';
import { isActiveOptions } from '@components/application-search/constants';

export const IsActiveSearch = ({
  struct,
  resetData,
  emptyBelowData,
}: {
  struct: StructTypes;
  resetData: RefreshDataType;
  emptyBelowData?: (data: any) => void;
}) => {
  return (
    <div>
      <Select
        title="SEARCH.CENTER_STATUS"
        name={APPLICATION_SEARCH.IS_ACTIVE}
        options={isActiveOptions}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.isActive}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.isActiveOptions}
      />
    </div>
  );
};
