import { useEffect, useState } from 'react';
import { IconSearch } from '@pentabd/icons';
import { useDebounce } from '@pentabd/ui';

import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import Input from '@components/inputs/Input';
import { getParams } from '@utils';
import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';
import { GetPollingCenterAggregated } from '@api/vote-center-management/center-management/polling-center-list/polling-centers-aggregated';

export const POLLING_INSTITUTE =
  FORM_FIELDS.CENTER_MANAGEMENT.POLLING_INSTITUTE;

function PolingCenterSearchInput({
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

  const searchCenterWatch = watch(POLLING_INSTITUTE.SEARCH_POLLING_CENTER);

  useEffect(() => {
    if (searchCenterWatch !== undefined && searchCenterWatch?.trim()?.length) {
      const word = searchCenterWatch?.trim();

      if (word || Object.keys(params).length > 0) {
        getPollingCenterAggregatedData({
          queryParams: {
            ...params,
            pollingInstituteNameBn: word,
          },
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
            queryParams: {
              ...mappedParams,
            },
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
    <form onSubmit={(e) => e.preventDefault()}>
      <Input
        registerName={POLLING_INSTITUTE.SEARCH_POLLING_CENTER}
        onchange={(data) => setDebounceValue(data)}
        prefix={<IconSearch size="20" />}
        disabled={!params?.electionSettingsIds}
      />
    </form>
  );
}

export default PolingCenterSearchInput;
