import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Modal, Table } from '@pentabd/ui';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { USER_PROFILE_LIST_TYPE } from '../constants';
import { electionUserTableColumns } from './constants';
import { allSelectedData, structSearch } from './searchConstants';
import { useUserProfilesList } from '@hooks/user-management/useGetUserProfileList';
import { getParams } from '@utils';
import TableModal from './user-modal/TableModal';
import { UserProfiles } from '@type/user-management/user-profile-types';
import InputSearch from './InputSearch';

const ElectionUser = () => {
  const { t } = useTranslation();

  const [openTableModal, setOpenTableModal] = useState<boolean>(false);
  const [activeUserData, setActiveUserData] = useState<UserProfiles>();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const methods = useForm();

  const {
    userProfileList,
    getUserProfileListData,
    activePage,
    totalPage,
    loading,
  } = useUserProfilesList();

  // for download
  const {
    userProfileList: downloadUserProfileList,
    loading: downloadLoading,
    getUserProfileListData: downloadGetUserProfileListData,
  } = useUserProfilesList();

  const handleSearch = (data: any) => {
    getUserProfileListData({
      searchItems: data,
      type: USER_PROFILE_LIST_TYPE.ELECTION,
    });
  };

  // download function
  const onClickDownload = () => {
    downloadGetUserProfileListData({
      searchItems: params,
      type: USER_PROFILE_LIST_TYPE.ELECTION,
      size: MAX_ROW_SIZE,
    });
  };

  const closeOperatorListModal = () => {
    setOpenTableModal(false);
  };

  const manageTableModal = (data: boolean) => setOpenTableModal(data);
  const manageUserData = (data: UserProfiles) => setActiveUserData(data);

  useEffect(() => {
    if (
      Object.keys(params).length > 0 &&
      params?.electionTypeId &&
      params?.electionScheduleId &&
      params?.type
    ) {
      getUserProfileListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
        type: USER_PROFILE_LIST_TYPE.ELECTION,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.electionTypeId, params?.electionScheduleId, params?.type]);

  return (
    <div className="pb-10">
      <SearchComponents
        totalCol="grid-cols-lg-8"
        colSpan="col-span-2"
        struct={structSearch}
        allSelectedData={allSelectedData}
        userType={USER_PROFILE_LIST_TYPE.ELECTION}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE_USER,
        ]}
        onSubmitHandler={handleSearch}
        getElectionSettingsIdForAdmin={true}
      />

      <Table
        headerExtension={{
          leftComponents: [
            <FormProvider {...methods} key={1}>
              <InputSearch getUserProfileListData={getUserProfileListData} />
            </FormProvider>,
          ],
        }}
        download={{
          fileName: 'election-users-list',
          columns: electionUserTableColumns({
            t,
            isDownload: true,
            getUserProfileListData,
            manageUserData,
            manageTableModal,
          }),
          rows: downloadUserProfileList || [],
          onClickDownload: onClickDownload,
          downloadLoading: downloadLoading,
        }}
        rows={userProfileList}
        columns={electionUserTableColumns({
          t,
          getUserProfileListData,
          manageUserData,
          manageTableModal,
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
            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
      />

      <Modal
        isOpen={openTableModal}
        closeAble
        overlay
        onClose={closeOperatorListModal}
        portal
      >
        <TableModal
          officerDetails={activeUserData as UserProfiles}
          manageTableModal={manageTableModal}
        />
      </Modal>
    </div>
  );
};

export default ElectionUser;
