import { useEffect, useState } from 'react';
import { IconSearch } from '@pentabd/icons';
import { useDebounce } from '@pentabd/ui';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import Input from '@components/inputs/Input';
import { getParams } from '@utils';
import { FORM_FIELDS } from '@constants/forms';
import { USER_PROFILE_LIST_TYPE } from '../constants';
import { GetUserProfileList } from '@hooks/user-management/useGetUserProfileListLoginId';

const { SEARCH_ELECTION_USER } =
  FORM_FIELDS.USER_MANAGEMENT.ELECTION_USER_SEARCH;

function InputSearch({
  getUserProfileListData,
}: {
  getUserProfileListData: (obj: GetUserProfileList) => void;
}) {
  const [electionUserSearch, setElectionUserSearch] = useState<any>('');
  const electionUserDebouncedValue = useDebounce<string>(
    electionUserSearch,
    500,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const methods = useFormContext();
  const { watch } = methods;

  const searchElectionUsersWatch = watch(SEARCH_ELECTION_USER);

  // for searching election users (api call with debounce)
  useEffect(() => {
    if (
      searchElectionUsersWatch !== undefined &&
      searchElectionUsersWatch?.trim()?.length
    ) {
      const word = searchElectionUsersWatch?.trim();

      /*
       * call api with params
       */
      if ((word || Object.keys(params).length > 0) && params?.userTypeCode) {
        getUserProfileListData({
          searchItems: { ...params, loginId: word },
          type: USER_PROFILE_LIST_TYPE.ELECTION,
        });
      }

      /*
       * setParam with the searched keyword
       */
      if (word) {
        setSearchParams({
          ...params,
          loginId: word,
        });
      }
    } else if (!searchElectionUsersWatch?.trim()?.length) {
      /*
       * deletes from the param when searched keyword is deleted letter by letter
       */
      if (Object.keys(params).length > 0) {
        const mappedParams = params;
        if (Object.prototype.hasOwnProperty.call(mappedParams, 'loginId')) {
          delete mappedParams.loginId;
        }
        if (Object.keys(mappedParams).length > 0 && params?.userTypeCode) {
          getUserProfileListData({
            searchItems: { ...params },
            type: USER_PROFILE_LIST_TYPE.ELECTION,
          });
        }

        setSearchParams({
          ...params,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionUserDebouncedValue]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Input
        registerName={SEARCH_ELECTION_USER}
        onchange={(data) => setElectionUserSearch(data)}
        prefix={<IconSearch size="20" />}
      />
    </form>
  );
}

export default InputSearch;
