import { useEffect, useState } from 'react';
import { useDebounce } from '@pentabd/ui';
import { useFormContext } from 'react-hook-form';
import { IconSearch } from '@pentabd/icons';
import { useSearchParams } from 'react-router-dom';

import Input from '@components/inputs/Input';

import { getParams } from '@utils';
import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';
import { GetPollingCenterAggregated } from '@api/vote-center-management/center-management/polling-center-list/polling-centers-aggregated';

const { SEARCH_VOTE_CENTER } =
  FORM_FIELDS.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

function SearchInput({
  getPollingCenterAggregatedData,
}: {
  getPollingCenterAggregatedData: (obj: GetPollingCenterAggregated) => void;
}) {
  const [value, setDebounceValue] = useState<any>('');
  const debouncedValue = useDebounce<string>(value, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const methods = useFormContext();

  const { watch } = methods;
  const searchCenterWatch = watch(SEARCH_VOTE_CENTER);

  useEffect(() => {
    if (searchCenterWatch !== undefined && searchCenterWatch?.trim()?.length) {
      const word = searchCenterWatch?.trim();

      if (word || Object.keys(params).length > 0) {
        getPollingCenterAggregatedData({
          queryParams: { ...params, pollingInstituteNameBn: word },
        });
      }
      if (word) {
        setSearchParams({
          ...params,
          pollingInstituteNameBn: word,
        });
      }
    } else if (!searchCenterWatch?.trim()?.length) {
      if (Object.keys(params).length > 0) {
        const mappedParams = params;
        if (
          Object.prototype.hasOwnProperty.call(
            mappedParams,
            'pollingInstituteNameBn',
          )
        ) {
          delete mappedParams.pollingInstituteNameBn;
        }
        if (Object.keys(mappedParams).length > 0) {
          getPollingCenterAggregatedData({
            queryParams: { ...mappedParams },
          });
        }
        setSearchParams({
          ...mappedParams,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Input
        registerName={SEARCH_VOTE_CENTER}
        onchange={(data) => setDebounceValue(data)}
        prefix={<IconSearch size="20" />}
      />
    </form>
  );
}

export default SearchInput;
