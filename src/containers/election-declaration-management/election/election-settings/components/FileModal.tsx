import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, Button } from '@pentabd/ui';

import IconUploadIcon from '@images/icons/IconUploadIcon';
import useUpdateElectionSettingsById from '@hooks/election-schedule-management/election/election-settings/useUpdateElectionSettingsById';
import { ElectionSettingsAggregatedType } from '@type/election-declaration-management/election/election-settings/election-settings-types';
import FileComponent from '@components/inputs/FileComponent';
import {
  ELECTION_SETTINGS_FORM_FIELD,
  electionSettingsFileValidation,
} from '@validations/election-declaration-management/election/election-settings-file';
import { yupResolver } from '@hookform/resolvers/yup';
import { FILE_CATEGORY } from '@constants/file';

export interface FileUpload {
  individualData?: ElectionSettingsAggregatedType;
  closeFileModal: () => void;
  getDataOnSuccess: () => void;
}
function FileModal({
  individualData,
  closeFileModal,
  getDataOnSuccess,
}: FileUpload) {
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);

  const { t } = useTranslation();

  const methods = useForm({
    resolver: yupResolver(electionSettingsFileValidation),
  });

  const { handleSubmit } = methods;

  const { updateElectionSettingsById, success, loading } =
    useUpdateElectionSettingsById();

  useEffect(() => {
    if (success) {
      getDataOnSuccess();
      closeFileModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeFileModal, success]);

  const handleButtonDisable = (value: boolean) => {
    setButtonDisable(value);
  };

  const submitSettingsFile = (data: any) => {
    if (individualData?.id) {
      const formData = {
        ...individualData,
        scheduleFile: data.scheduleFile,
      };
      updateElectionSettingsById({
        electionSettingsId: individualData.id,
        data: formData,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="column p-9 g-3"
        onSubmit={handleSubmit(submitSettingsFile)}
      >
        <div className="my-8">
          <IconUploadIcon size="57" fill="none" />
        </div>
        <div className="my-8">
          <Text size="2xl" weight="bold" color="title">
            {t('ELECTION_SETTINGS.FILE_UPLOAD')}
          </Text>
        </div>

        <FileComponent
          registerName={ELECTION_SETTINGS_FORM_FIELD.SCHEDULE_FILE}
          fullGridWidth={true}
          handleButtonDisable={handleButtonDisable}
          category={FILE_CATEGORY.SCHEDULES}
        />
        <div className="d-flex flex-row-reverse mt-8">
          <Button
            htmlType="submit"
            type="primary"
            disabled={buttonDisable}
            loading={loading}
          >
            {t('ELECTION_SETTINGS.SAVE')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default FileModal;
