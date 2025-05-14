import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, ConfirmationModal, Text } from '@pentabd/ui';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { FORM_FIELDS } from '@constants/forms';
import useUpcomingElectionSchedules from '@hooks/miscellaneous/core-hook/election-schedule/useUpcomingElectionSchedule';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AutomaticUserDataType,
  automaticUserValidation,
} from '@validations/user-management/AutomaticUserValidation';
import useUserTypesList from '@hooks/user-management/useUserTypesList';
import { useUserProfilesDownloadCredentials } from '@hooks/user-management/useUserProfilesDownloadCredentials';
import { USER_PROFILE_LIST_TYPE } from '../constants';
import { userTypeCodes } from './constants';
import { useCreateBulkUserProfile } from '@hooks/user-management/useCreateBulkUserProfile';
import { BulkUserProfiles } from '@type/user-management/user-profile-types';
import { GetUserProfileList } from '@hooks/user-management/useGetUserProfileListLoginId';

const AUTOMATIC_USER = FORM_FIELDS.USER_MANAGEMENT.AUTOMATIC_USER;

function AutomaticUserSearch({
  onSubmit,
  getUserProfileListData,
  searchItems,
}: {
  onSubmit: any;
  getUserProfileListData: ({
    searchItems,
    page,
    size,
  }: GetUserProfileList) => void;
  searchItems: BulkUserProfiles;
}) {
  const { t } = useTranslation();

  const [confirmCreateModelOpen, setConfirmCreateModelOpen] = useState(false);

  const { upcomingElectionSchedules, getUpcomingElectionSchedulesData } =
    useUpcomingElectionSchedules();

  const { getUserProfilesDownloadCredentialsData, downloadLoading } =
    useUserProfilesDownloadCredentials();

  const { bulkUserProfilesUserData, createLoading, success, failed } =
    useCreateBulkUserProfile();

  const { userTypes, getUserTypesData } = useUserTypesList();

  const methods = useForm<AutomaticUserDataType>({
    resolver: yupResolver(automaticUserValidation),
  });

  const { handleSubmit, getValues } = methods;

  useEffect(() => {
    getUpcomingElectionSchedulesData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserTypesData({
      type: USER_PROFILE_LIST_TYPE.ELECTION,
      userTypeCodes: userTypeCodes,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      getUserProfileListData({ searchItems });
      closeCreateModal();
    }
    if (failed) {
      closeCreateModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, failed]);

  const handleDownload = () => {
    const electionScheduleId = getValues(AUTOMATIC_USER.ELECTION_SCHEDULE);
    const userTypeCode = getValues(AUTOMATIC_USER.USER_TYPE_CODE);
    if (electionScheduleId && userTypeCode) {
      getUserProfilesDownloadCredentialsData({
        electionScheduleId,
        userTypeCode,
      });
    }
  };

  const closeCreateModal = () => {
    setConfirmCreateModelOpen(false);
  };

  const confirmCreate = () => {
    bulkUserProfilesUserData({ ...searchItems });
  };

  const onSubmitForm = (data: BulkUserProfiles) => {
    setConfirmCreateModelOpen(true);
    onSubmit(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="d-grid grid-cols-lg-12 grid-cols-md-12 gap-5 align-items-end mb-10"
        >
          <div className="col-span-5 col-span-md-4">
            <Select
              title="SEARCH.ELECTION_NAME"
              name={AUTOMATIC_USER.ELECTION_SCHEDULE}
              options={upcomingElectionSchedules}
              disabled={upcomingElectionSchedules.length === 0}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
              isSearchable
            />
          </div>

          <div className="col-span-5 col-span-md-4">
            <Select
              title="SEARCH.USER"
              name={AUTOMATIC_USER.USER_TYPE_CODE}
              options={userTypes}
              disabled={userTypes.length === 0}
              suffix={<IconChevronDown size="20" fill="subtitle2" />}
            />
          </div>

          <div className="col-span-1 col-span-md-2">
            <Button
              type="primary"
              className="w-100"
              htmlType="submit"
              loading={createLoading}
            >
              <Text weight="semibold">{t('ELECTION_USER.CREATE')}</Text>
            </Button>
          </div>
          <div className="col-span-1 col-span-md-2">
            <Button
              type="primary"
              className="w-100"
              htmlType="button"
              loading={downloadLoading}
              onClick={handleDownload}
            >
              <Text weight="semibold">{t('ELECTION_USER.DOWNLOAD')}</Text>
            </Button>
          </div>
        </form>
      </FormProvider>

      <ConfirmationModal
        title={t('ELECTION_USER.CREATE_CONFIRM_MODAL_TITLE')}
        subTitle={t('ELECTION_USER.CREATE_CONFIRM_MODAL_SUBTITLE')}
        cancelButton={{
          onClick: closeCreateModal,
          fill: 'outline',
          type: 'primary',
          label: t('CONFIRMATION_MODAL.MODAL_CANCEL'),
        }}
        confirmButton={{
          onClick: confirmCreate,
          fill: 'fill',
          type: 'primary',
          label: t('CONFIRMATION_MODAL.MODAL_SUCCESS'),
          loading: createLoading,
        }}
        isOpen={confirmCreateModelOpen}
        portal
        closeAble
        onClose={closeCreateModal}
      />
    </>
  );
}

export default AutomaticUserSearch;
