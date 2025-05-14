import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Table } from '@pentabd/ui';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { USER_PROFILE_LIST_TYPE } from '../constants';
import {
  automaticUserTableColumns,
  automaticUserTableHeader,
} from './constants';

import { useUserProfilesList } from '@hooks/user-management/useGetUserProfileList';

import { BulkUserProfiles } from '@type/user-management/user-profile-types';
import AutomaticUserSearch from './AutomaticUserSearch';

const AutomaticUser = () => {
  const { t } = useTranslation();

  const [searchItems, setSearchItems] = useState<BulkUserProfiles>({});

  const {
    userProfileList,
    getUserProfileListData,
    activePage,
    totalPage,
    loading,
  } = useUserProfilesList();

  // for download
  const {
    userProfileList: tableDownloadUserProfileList,
    loading: tableDownloadLoading,
    getUserProfileListData: tableDownloadGetUserProfileListData,
  } = useUserProfilesList();

  const onSubmit = (data: BulkUserProfiles) => {
    data.electionScheduleId = parseInt(data.electionScheduleId as string);
    setSearchItems(data);
  };

  // Table download function
  const onClickTableDownload = () => {
    tableDownloadGetUserProfileListData({
      searchItems,
      type: USER_PROFILE_LIST_TYPE.ELECTION,
      size: MAX_ROW_SIZE,
    });
  };

  return (
    <div className="pb-10">
      <AutomaticUserSearch
        onSubmit={onSubmit}
        getUserProfileListData={getUserProfileListData}
        searchItems={searchItems}
      />

      <Table
        headerExtension={{
          ...automaticUserTableHeader,
        }}
        download={{
          fileName: 'automatic-users-list',
          columns: automaticUserTableColumns({
            t,
            isDownload: true,
            searchItems,
            getUserProfileListData,
          }),
          rows: tableDownloadUserProfileList,
          onClickDownload: onClickTableDownload,
          downloadLoading: tableDownloadLoading,
        }}
        rows={userProfileList}
        columns={automaticUserTableColumns({
          t,
          getUserProfileListData,
          searchItems,
        })}
        loading={loading}
        loadingItemCount={10}
        pagination={{
          language: 'bn',
          activePage,
          totalPage,
          onClick: (page) => {
            searchItems &&
              getUserProfileListData({
                page: page - 1,
                searchItems,
              });
          },
        }}
      />
    </div>
  );
};

export default AutomaticUser;
