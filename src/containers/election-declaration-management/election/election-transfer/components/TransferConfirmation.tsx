import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Text } from '@pentabd/ui';

import { FORM_FIELDS } from '@constants/forms';
import { ShowConfirmComponent } from './ShowConfirmComponent';
import Select from '@components/inputs/Select';
import useElectionSchedules from '@hooks/miscellaneous/core-hook/election-schedule/useElectionSchedules';
import { ElectionMigrateCreateTypes } from '@type/election-declaration-management/election/election-migrate/election-migrate-types';

const ELECTION_TRANSFER_MODAL =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.ELECTION.ELECTION_TRANSFER
    .CONFIRMATION_MODAL;

const TransferConfirmation = ({
  closeModal,
  electionSettingsIds,
  params,
  showConfirmMessage,
  setShowConfirmMessage,
  methods,
}: {
  electionSettingsIds: number[];
  closeModal: () => void;
  showConfirmMessage: boolean;
  setShowConfirmMessage: (data: boolean) => void;
  params?: { [x: string]: string };
  methods: any;
}) => {
  const { t } = useTranslation();
  const { handleSubmit, register } = methods;
  const [formData, setFormData] = useState<ElectionMigrateCreateTypes>({});
  const { electionSchedules, getElectionSchedulesData } =
    useElectionSchedules();

  const onSubmit = (data: any) => {
    const migratedElectionSettings = electionSettingsIds.map((value) => {
      return {
        electionSettingsId: value,
      };
    });
    const submittedData = { ...data, migratedElectionSettings };

    setShowConfirmMessage(true);
    setFormData(submittedData);
  };

  useEffect(() => {
    if (params?.electionTypeId) {
      getElectionSchedulesData(params?.electionTypeId);
    }
  }, [params?.electionTypeId]);

  return showConfirmMessage ? (
    <ShowConfirmComponent formData={formData} closeModal={closeModal} />
  ) : (
    <div className="p-12">
      <div className="mb-14">
        <Text size="lg" weight="semibold" component="h2">
          {t('ELECTION_TRANSFER.ELECTION_TRANSFER_PROMPT')}
        </Text>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <Select
              title={t('ELECTION_TRANSFER.ELECTION_TYPE')}
              name={ELECTION_TRANSFER_MODAL.ELECTION_NAME}
              options={electionSchedules}
            />
          </div>
          <div className="mb-8 d-flex gap-6">
            <input
              type="checkbox"
              id={ELECTION_TRANSFER_MODAL.ELECTION_CANDIDATE}
              {...register(ELECTION_TRANSFER_MODAL.ELECTION_CANDIDATE)}
            />
            <Text size="sm" color="dark" weight="medium" component="p">
              {t('ELECTION_TRANSFER.CANDIDATE')}
            </Text>
          </div>

          <div className="mb-8 d-flex gap-6">
            <input
              type="checkbox"
              id={ELECTION_TRANSFER_MODAL.ELECTION_CENTER}
              {...register(ELECTION_TRANSFER_MODAL.ELECTION_CENTER)}
            />
            <Text size="sm" color="dark" weight="medium" component="p">
              {t('ELECTION_TRANSFER.CENTER')}
            </Text>
          </div>

          <div className="mb-10 d-flex gap-6">
            <input
              type="checkbox"
              id={ELECTION_TRANSFER_MODAL.ELECTION_CENTER_OFFICER}
              {...register(ELECTION_TRANSFER_MODAL.ELECTION_CENTER_OFFICER)}
            />
            <Text size="sm" color="dark" weight="medium" component="p">
              {t('ELECTION_TRANSFER.CENTER_OFFICER')}
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
            >
              <Text weight="semibold">
                {t('ELECTION_TRANSFER.MODAL_MAKE_TRANSFER_BUTTON')}
              </Text>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default TransferConfirmation;
