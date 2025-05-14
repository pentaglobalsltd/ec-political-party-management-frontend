import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useResultStatusListSelect from '@hooks/result-management/useResultStatusListSelect';

export const ResultStatusSearch = () => {
  const { resultStatuses, getResultStatuses } = useResultStatusListSelect();

  useEffect(() => {
    getResultStatuses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Select
        title="SEARCH.RESULT_STATUS"
        name={APPLICATION_SEARCH.RESULT_STATUS}
        options={resultStatuses}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
