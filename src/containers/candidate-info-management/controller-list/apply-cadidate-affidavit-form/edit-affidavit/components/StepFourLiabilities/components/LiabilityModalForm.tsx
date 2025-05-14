import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@pentabd/ui';

import FileComponent from '@components/inputs/FileComponent';
import FormChildInput from '@components/inputs/FormChildInput';

import { FILE_CATEGORY } from '@constants/file';
import { useLiabilities } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useLiabilities';
import { LiabilityChildType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import {
  LIABILITIES,
  liabilities,
  liabilityFormValidationSchemaType,
} from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';

interface EditModalFormPropsType {
  liabilityId?: string | number;
  closeLiabilityEditModal: () => void;
  parentHandleButtonDisabled: (data: boolean) => void;
}

export default function LiabilityModalForm({
  liabilityId,
  closeLiabilityEditModal,
  parentHandleButtonDisabled,
}: EditModalFormPropsType) {
  const { electionSettingsId, candidateElectionDetailsId, electionScheduleId } =
    useParams();

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const { liabilityChild, updateLiabilityChildHandler } = useLiabilities({
    electionSettingsId,
    candidateElectionDetailsId,
  });
  const methods = useForm<liabilityFormValidationSchemaType>({
    resolver: yupResolver(liabilities),
    values: liabilityChild as liabilityFormValidationSchemaType,
  });
  const { handleSubmit, control } = methods;
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<liabilityFormValidationSchemaType> = (
    data: LiabilityChildType,
  ) => {
    if (liabilityId) {
      updateLiabilityChildHandler({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
        liabilityId,
      });
      closeLiabilityEditModal();
    }
  };
  const handleButtonDisable = (value: boolean) => {
    parentHandleButtonDisabled(value);
    setDisableButton(value);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-9">
          <div className="d-flex flex-column gap-9 mt-9">
            <FormChildInput
              registerName={LIABILITIES.NATURE_LIABILITIES_DEBTS}
              title={t('AFFIDAVIT_LIABILITIES.LIABILITIES_TYPE')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormChildInput
              registerName={LIABILITIES.AMOUNT}
              title={t('AFFIDAVIT_LIABILITIES.LIABILITIES_AMOUNT')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FileComponent
              registerName={LIABILITIES.FILE}
              handleButtonDisable={handleButtonDisable}
              fullGridWidth
              colClassNameOne="col-span-12 col-span-lg-12"
              pathId={electionScheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />
            <div className="d-flex gap-5">
              <Button
                fill="outline"
                type="light"
                className="flex-fill"
                onClick={closeLiabilityEditModal}
              >
                {t('CANDIDATE_PERSONAL_INFO.CANCEL_BUTTON_TEXT')}
              </Button>
              <Button
                fill="fill"
                type="primary"
                className="flex-fill"
                htmlType="submit"
                disabled={disableButton}
              >
                {t('CANDIDATE_PERSONAL_INFO.CREATE_BUTTON_TEXT')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
