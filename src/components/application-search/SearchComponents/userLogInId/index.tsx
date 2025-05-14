import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useEffect } from 'react';
import { useUserProfileLogInId } from './hooks/useGetUserProfileListLoginId';
import { SORT_BY, SORT_ORDER } from '@components/application-search/constants';
import { RefreshDataType, StructTypes } from '../types';

interface Props {
  queryWatchList?: {
    [key: string]: string | number;
  };
  userType?: string;
  emptyBelowData?: (data: any) => void;
  struct?: StructTypes;
  resetData: RefreshDataType;
  callApi?: boolean;
}
export const UserProfileLoginIdSearch = ({
  queryWatchList,
  userType,
  emptyBelowData,
  struct,
  resetData,
  callApi,
}: Props) => {
  const { getUserProfileLogInId, userProfileLogInId } = useUserProfileLogInId();

  useEffect(() => {
    if (
      queryWatchList &&
      Object.keys(queryWatchList).reduce(
        (prev: any, curr: any) => prev && queryWatchList[curr],
        true,
      ) &&
      callApi
    )
      getUserProfileLogInId({
        filter: queryWatchList,
        type: userType,
        sortBy: SORT_BY.LOGIN_ID,
        sortOrder: SORT_ORDER.ASC,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryWatchList), callApi]);

  return (
    <div>
      <Select
        title="SEARCH.LOGIN_ID"
        name={APPLICATION_SEARCH.USER_ID}
        options={userProfileLogInId}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.userLogInId}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.userLogInIdOptions}
      />
    </div>
  );
};
