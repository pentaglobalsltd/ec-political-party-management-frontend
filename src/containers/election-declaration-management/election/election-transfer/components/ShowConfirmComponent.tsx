import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateElectionMigrate } from '@hooks/election-schedule-management/election/election-migrate/useCreateElectionMigrate';
import IconFeatured from '@images/Featured icon.svg';
import { Button, Text } from '@pentabd/ui';
import { ElectionMigrateCreateTypes } from '@type/election-declaration-management/election/election-migrate/election-migrate-types';

export const ShowConfirmComponent = ({
  formData,
  closeModal,
}: {
  formData: ElectionMigrateCreateTypes;
  closeModal: () => void;
}) => {
  const { t } = useTranslation();
  const { electionMigrateCreate, loading, success } =
    useCreateElectionMigrate();

  const confirmTransfer = () => {
    electionMigrateCreate({
      data: formData,
      electionScheduleId: formData?.electionScheduleId as number,
    });
  };

  useEffect(() => {
    if (success) {
      closeModal();
    }
  }, [success]);
  return (
    <div className="p-12">
      <div className="mb-14">
        <IconFeatured />
      </div>

      <div className="mb-16">
        <Text className="mb-4" size="lg" weight="semibold" component="h2">
          {t('ELECTION_TRANSFER.ELECTION_TRANSFER_PROMPT')}
        </Text>
        <Text className="mb-4" size="sm" weight="normal" component="p">
          {t('ELECTION_TRANSFER.ELECTION_TRANSFER_CONFIRMATION_MESSAGE')}
        </Text>
      </div>

      <div className="d-flex gap-6">
        <Button
          className="flex-fill"
          type="light"
          fill="outline"
          onClick={closeModal}
        >
          <Text weight="semibold">
            {t('ELECTION_TRANSFER.MODAL_CANCEL_BUTTON')}
          </Text>
        </Button>

        <Button
          className="flex-fill"
          type="primary"
          fill="fill"
          htmlType="submit"
          loading={loading}
          onClick={confirmTransfer}
        >
          <Text weight="semibold">{t('ELECTION_TRANSFER.CONFIRM')}</Text>
        </Button>
      </div>
    </div>
  );
};
