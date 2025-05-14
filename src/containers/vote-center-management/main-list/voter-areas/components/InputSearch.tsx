import { useDebounce } from '@pentabd/ui';
import { useEffect, useState } from 'react';
import Input from '@components/inputs/Input';
import { IconSearch } from '@pentabd/icons';
import { useFormContext } from 'react-hook-form';
import { VOTE_CENTER_MANAGEMENT as FORM_FIELDS } from '@constants/forms/vote-center-management/vote-center-management';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';
import { ElectionDetailsListProps } from '@hooks/vote-center-management/main-list/voter-areas/useVoterAreaGetList';

const { SEARCH_VOTE_CENTER } =
  FORM_FIELDS.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

function InputSearch({
  getVoterAreaListData,
}: {
  getVoterAreaListData: (data: ElectionDetailsListProps) => void;
}) {
  const [debounceSearchValue, setDebounceSearchValue] = useState<any>('');
  const debouncedValue = useDebounce<string>(debounceSearchValue, 500);

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { watch } = useFormContext();
  const searchCenterWatch = watch(SEARCH_VOTE_CENTER);

  useEffect(() => {
    if (searchCenterWatch !== undefined && searchCenterWatch?.trim()?.length) {
      const word = searchCenterWatch?.trim();

      if (word || Object.keys(params).length > 0) {
        getVoterAreaListData({
          searchItems: { ...params, nameBn: word },
        });
      }
      if (word)
        setSearchParams({
          ...params,
          nameBn: word,
        });
    } else if (!searchCenterWatch?.trim()?.length) {
      if (Object.keys(params).length > 0) {
        const mappedParams = params;
        if (mappedParams.hasOwnProperty('nameBn')) {
          delete mappedParams.nameBn;
        }
        if (Object.keys(mappedParams).length > 0) {
          getVoterAreaListData({
            searchItems: { ...mappedParams },
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
    <Input
      registerName={SEARCH_VOTE_CENTER}
      onchange={(data) => setDebounceSearchValue(data)}
      prefix={<IconSearch size="20" />}
    />
  );
}

export default InputSearch;
