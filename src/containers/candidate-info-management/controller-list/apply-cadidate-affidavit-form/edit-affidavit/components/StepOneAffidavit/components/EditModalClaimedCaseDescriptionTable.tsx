import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Text } from '@pentabd/ui';

import FileComponent from '@components/inputs/FileComponent';
import FormChildInput from '@components/inputs/FormChildInput';

import { useAffidavitStepOne } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useAffidavitStepOne';
import { PresentCaseType } from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';
import { FILE_CATEGORY } from '@constants/file';
import {
  FIRST_STEP_AFFIDAVIT,
  PresentCaseValidationSchemaType,
  presentCaseValidation,
} from '@validations/candidate-info-management/operator/affidavit/firstStepAffidavitFormValidation';

interface ClaimedCaseEditModalProps {
  closeCaseEditModal: () => void;
  caseId?: string | number;
  caseType?: string;
  parentHandleButtonDisabled: (data: boolean) => void;
}

function EditModalClaimedCaseDescriptionTable({
  closeCaseEditModal,
  caseId,
  caseType,
  parentHandleButtonDisabled,
}: ClaimedCaseEditModalProps) {
  const { t } = useTranslation();
  const { electionSettingsId, candidateElectionDetailsId, electionScheduleId } =
    useParams();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { updatePresentCaseHandler, presentCase, isUpdateRequested } =
    useAffidavitStepOne({ electionSettingsId, candidateElectionDetailsId });
  const methods = useForm<PresentCaseValidationSchemaType>({
    resolver: yupResolver(presentCaseValidation),
    values: presentCase as PresentCaseValidationSchemaType,
  });
  const { control, handleSubmit } = methods;

  const updateCaseData: SubmitHandler<PresentCaseValidationSchemaType> = (
    data: PresentCaseType,
  ) => {
    if (caseId) {
      updatePresentCaseHandler({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
        caseId,
        caseType,
      });

      closeCaseEditModal();
    }
  };
  const handleButtonDisable = (value: boolean) => {
    parentHandleButtonDisabled(value);
    setDisableButton(value);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(updateCaseData)}>
        <div className="p-9">
          <div className="mt-8">
            <Text size="lg" weight="semibold" color="title" component="h2">
              {t('AFFIDAVIT_STEP_ONE.EDIT_MODAL_TITLE')}
            </Text>
          </div>
          <div className="d-flex flex-column gap-8 py-9">
            <FormChildInput
              registerName={FIRST_STEP_AFFIDAVIT.ACCUSED_CASE}
              title={t('AFFIDAVIT_STEP_ONE.ACCUSED_CASE')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormChildInput
              registerName={FIRST_STEP_AFFIDAVIT.COURT_NAME}
              title={t('AFFIDAVIT_STEP_ONE.COURT_NAME')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormChildInput
              registerName={FIRST_STEP_AFFIDAVIT.CASE_NUMBER}
              title={t('AFFIDAVIT_STEP_ONE.CASE_NO')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormChildInput
              registerName={FIRST_STEP_AFFIDAVIT.CASE_STATUS}
              title={t('AFFIDAVIT_STEP_ONE.CASE_STATUS')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FileComponent
              registerName={FIRST_STEP_AFFIDAVIT.CASE_FILE}
              handleButtonDisable={handleButtonDisable}
              tableFileComponent
              pathId={electionScheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />
          </div>
          <div className="d-flex justify-content-center gap-7 mt-10">
            <Button
              fill="outline"
              type="light"
              className="flex-fill"
              onClick={closeCaseEditModal}
            >
              {t('AFFIDAVIT_STEP_ONE.CONFIRMATION_DELETE_BUTTON_TEXT')}
            </Button>
            <Button
              fill="fill"
              type="primary"
              className="flex-fill"
              htmlType="submit"
              loading={isUpdateRequested}
              disabled={disableButton}
            >
              {t('AFFIDAVIT_STEP_ONE.CONFIRMATION_BUTTON_TEXT')}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default EditModalClaimedCaseDescriptionTable;
