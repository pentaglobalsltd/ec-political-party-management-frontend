import { useEffect, useState } from 'react';
import { IconSearch } from '@pentabd/icons';
import { useDebounce } from '@pentabd/ui';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';
import Input from '@components/inputs/Input';
import { getParams } from '@utils';
import { GetPollingPollingInstitutes } from '@api/vote-center-management/center-management/polling-institute/polling-institutes';

export const POLLING_INSTITUTE =
  FORM_FIELDS.CENTER_MANAGEMENT.POLLING_INSTITUTE;

function InstituteSearchInput({
  getPollingInstitutesList,
}: {
  getPollingInstitutesList: (obj: GetPollingPollingInstitutes) => void;
}) {
  const [value, setDebounceValue] = useState<any>('');
  const debouncedValue = useDebounce<string>(value, 500);

  let [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const methods = useFormContext();
  const { watch } = methods;

  const searchInstituteWatch = watch(
    POLLING_INSTITUTE.SEARCH_POLLING_INSTITUTE,
  );

  //for institute
  useEffect(() => {
    if (
      searchInstituteWatch !== undefined &&
      searchInstituteWatch?.trim()?.length
    ) {
      const word = searchInstituteWatch?.trim();

      if (word || Object.keys(params).length > 0) {
        getPollingInstitutesList({
          queryParams: {
            ...params,
            nameBn: word,
          },
        });
      }
      if (word) {
        setSearchParams({
          ...params,
          nameBn: word,
        });
      }
    } else if (!searchInstituteWatch?.trim()?.length) {
      if (Object.keys(params).length > 0) {
        const mappedParams = params;
        if (mappedParams.hasOwnProperty('nameBn')) {
          delete mappedParams.nameBn;
        }
        if (Object.keys(mappedParams).length > 0) {
          getPollingInstitutesList({
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
    <form onSubmit={(e) => e.preventDefault()}>
      <Input
        registerName={POLLING_INSTITUTE.SEARCH_POLLING_INSTITUTE}
        onchange={(data) => setDebounceValue(data)}
        prefix={<IconSearch size="20" />}
        disabled={!params?.electionSettingsIds}
      />
    </form>
  );
}

export default InstituteSearchInput;
