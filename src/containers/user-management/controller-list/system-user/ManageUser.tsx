import useUserActivationStatus from '@hooks/user-management/useUserActivationStatus';
import { Button, ConfirmationModal } from '@pentabd/ui';
import { UserProfiles } from '@type/user-management/user-profile-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { USER_PROFILE_LIST_TYPE } from '../constants';
import { GetUserProfileList } from '@hooks/user-management/useGetUserProfileListLoginId';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';

function ManageUser({
  data,
  row,
  getUserProfileListData,
}: {
  data: any;
  row: UserProfiles;
  getUserProfileListData: ({
    searchItems,
    page,
    size,
  }: GetUserProfileList) => void;
}) {
  const { t } = useTranslation();

  const [activeModalOpen, setActiveModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    updateUserActivationStatus,
    activationStatusSuccess,
    setActivationStatusSuccess,
  } = useUserActivationStatus();

  const confirmUpdateActive = () => {
    updateUserActivationStatus({
      data: { enabled: row.isActive ? false : true },
      userId: row?.userId as string,
    });
    setActiveModalOpen(false);
  };

  const closeActiveModal = () => {
    setActiveModalOpen(false);
  };

  const handleActive = () => {
    setActiveModalOpen(true);
  };

  useEffect(() => {
    if (activationStatusSuccess) {
      getUserProfileListData({
        searchItems: params,
        type: USER_PROFILE_LIST_TYPE.SYSTEM,
      });
      setActivationStatusSuccess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activationStatusSuccess]);

  return (
    <>
      {data === true ? (
        <Button type="success" size="xs" onClick={handleActive}>
          {t('ELECTION_USER.CONDITION_ACTIVE')}
        </Button>
      ) : (
        <Button type="warning" size="xs" onClick={handleActive}>
          {t('ELECTION_USER.CONDITION_INACTIVE')}
        </Button>
      )}

      {activeModalOpen ? (
        <ConfirmationModal
          title={
            !row?.isActive
              ? t('ELECTION_USER.ACTIVE_USER')
              : t('ELECTION_USER.DEACTIVATE_USER')
          }
          cancelButton={{
            onClick: closeActiveModal,
            fill: 'outline',
            type: 'primary',
            label: t('CONFIRMATION_MODAL.MODAL_CANCEL'),
          }}
          confirmButton={{
            onClick: confirmUpdateActive,
            fill: 'fill',
            type: 'success',
            label: t('CONFIRMATION_MODAL.MODAL_SUCCESS'),
          }}
          portal
          isOpen={activeModalOpen}
          closeAble
          onClose={closeActiveModal}
        />
      ) : null}
    </>
  );
}

export default ManageUser;
