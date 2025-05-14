import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import {
  CENTER_STATUS_CREATED,
  CenterStatus,
} from '@components/application-search/constants';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export const CenterStatusSelect = () => {
  const { watch, setValue } = useFormContext();

  const centerStatusWatch = watch(APPLICATION_SEARCH.STATUS_ID);
  useEffect(() => {
    if (!centerStatusWatch) {
      setValue(APPLICATION_SEARCH.STATUS_ID, CENTER_STATUS_CREATED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerStatusWatch]);

  return (
    <div>
      <Select
        title="SEARCH.CASE"
        name={APPLICATION_SEARCH.STATUS_ID}
        options={CenterStatus()}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
      />
    </div>
  );
};
