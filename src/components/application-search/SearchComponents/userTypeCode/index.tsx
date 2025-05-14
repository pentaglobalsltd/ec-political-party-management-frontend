import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useEffect } from 'react';
import useUserTypesList from '@hooks/user-management/useUserTypesList';

export const UserTypeCodeSearch = ({
  userType,
  resetData,
  emptyBelowData,
  struct,
  callApi,
}: any) => {
  const { getUserTypesData, userTypes } = useUserTypesList();

  useEffect(() => {
    if (callApi)
      getUserTypesData({
        type: userType,
        userTypeCodes: struct?.userTypeCodes,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, callApi]);

  return (
    <div>
      <Select
        title="SEARCH.USER"
        name={APPLICATION_SEARCH.USER}
        options={userTypes}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.userTypeCode}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.userTypeCodeOptions}
      />
    </div>
  );
};
