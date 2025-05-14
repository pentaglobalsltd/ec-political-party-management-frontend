import { useEffect, useState } from 'react';
import { useDebounce } from '@pentabd/ui';
import { getParams } from '@utils';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { IconSearch } from '@pentabd/icons';

import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';
import Input from '@components/inputs/Input';

import { GetPollingPollingInstitutes } from '@api/vote-center-management/center-management/polling-institute/polling-institutes';

export const POLLING_INSTITUTE =
  FORM_FIELDS.CENTER_MANAGEMENT.POLLING_INSTITUTE;

function InputSearch({
  getPollingInstitutesList,
}: {
  getPollingInstitutesList: (obj: GetPollingPollingInstitutes) => void;
}) {
  const { watch } = useFormContext();

  const searchCenterWatch = watch(POLLING_INSTITUTE.SEARCH_POLLING_INSTITUTE);

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);
  const [value, setDebounceValue] = useState<any>('');
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    if (searchCenterWatch !== undefined && searchCenterWatch?.trim()?.length) {
      const word = searchCenterWatch?.trim();

      if (word || Object.keys(params).length > 0) {
        getPollingInstitutesList({
          queryParams: {
            upazilaId: params?.upazilaId,
            unionOrWardId: params?.unionOrWardId,
            nameBn: word,
          },
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <form>
      <Input
        registerName={POLLING_INSTITUTE.SEARCH_POLLING_INSTITUTE}
        onchange={(data) => setDebounceValue(data)}
        prefix={<IconSearch size="20" />}
      />
    </form>
  );
}

export default InputSearch;
