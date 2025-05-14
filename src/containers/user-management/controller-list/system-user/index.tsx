import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DownloadButtons, Table } from '@pentabd/ui';
import { SearchComponents } from '@components/application-search/SearchComponents';

import { structSearch } from './searchConstants';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { USER_PROFILE_LIST_TYPE } from '../constants';
import { systemUserTableHeader, systemUserTableColumns } from './constants';

import { useUserProfilesList } from '@hooks/user-management/useGetUserProfileList';
import { getParams } from '@utils';
import { useEffect } from 'react';

export const SystemUser = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    userProfileList,
    getUserProfileListData,
    activePage,
    totalPage,
    loading,
  } = useUserProfilesList();

  const handleSearch = (data: any) => {
    getUserProfileListData({
      searchItems: data,
      type: USER_PROFILE_LIST_TYPE.SYSTEM,
    });
  };

  // for download
  const {
    userProfileList: downloadUserProfileList,
    loading: downloadLoading,
    getUserProfileListData: downloadGetUserProfileListData,
  } = useUserProfilesList();

  // download function
  const onClickDownload = () => {
    downloadGetUserProfileListData({
      searchItems: params,
      type: USER_PROFILE_LIST_TYPE.SYSTEM,
      size: MAX_ROW_SIZE,
    });
  };

  useEffect(() => {
    if (
      Object.keys(params).length > 0 &&
      params?.type &&
      params?.userTypeCode
    ) {
      getUserProfileListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
        type: USER_PROFILE_LIST_TYPE.SYSTEM,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.type, params?.userTypeCode]);

  return (
    <div className="pb-10">
      <SearchComponents
        totalCol="grid-cols-lg-10"
        colSpan="col-span-3"
        struct={structSearch}
        userType={USER_PROFILE_LIST_TYPE.SYSTEM}
        onSubmitHandler={handleSearch}
      />

      <Table
        headerExtension={{
          ...systemUserTableHeader,
          rightComponents: [
            <DownloadButtons
              key={1}
              fileName={'system-users-list'}
              columns={systemUserTableColumns({
                t,
                isDownload: true,
                getUserProfileListData,
              })}
              rows={downloadUserProfileList || []}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={userProfileList}
        columns={systemUserTableColumns({
          t,
          getUserProfileListData,
        })}
        loading={loading}
        loadingItemCount={10}
        pagination={{
          language: 'bn',
          activePage,
          totalPage,
          onClick: (page) => {
            getUserProfileListData({
              page: page - 1,
              searchItems: params,
            });
          },
        }}
      />
    </div>
  );
};

export default SystemUser;
