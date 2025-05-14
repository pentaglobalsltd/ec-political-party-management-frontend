import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useDraftResultStatusListSelect from '@hooks/result-management/useDraftResultStatusListSelect';

export const DraftResultStatusSearch = () => {
  const { draftResultStatuses, getDraftResultStatuses } =
    useDraftResultStatusListSelect();

  useEffect(() => {
    getDraftResultStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Select
        title="SEARCH.RESULT_STATUS"
        name={APPLICATION_SEARCH.RESULT_STATUS}
        options={draftResultStatuses}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
