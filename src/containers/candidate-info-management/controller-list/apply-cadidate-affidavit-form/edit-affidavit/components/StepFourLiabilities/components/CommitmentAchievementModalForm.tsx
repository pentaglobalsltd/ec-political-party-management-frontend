import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@pentabd/ui';

import FormChildInput from '@components/inputs/FormChildInput';

import { useLiabilities } from '@hooks/candidate-info-management/operator-view/candidate-management/affidavit-form/useLiabilities';
import { CommitmentAchievementChildType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import {
  AFFIDAVIT_COMMITMENT_ACHIEVEMENTS,
  commitmentAchievementFormValidationSchemaType,
  commitmentAchievement,
} from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';

interface EditModalFormPropsType {
  commitmentAchievementId?: string | number;
  closeCommitmentAchievementEditModal: () => void;
}

export default function CommitmentAchievementModalForm({
  commitmentAchievementId,
  closeCommitmentAchievementEditModal,
}: EditModalFormPropsType) {
  const { electionSettingsId, candidateElectionDetailsId } = useParams();

  const {
    commitmentAchievementChild,
    updateCommitmentAchievementChildHandler,
  } = useLiabilities({
    electionSettingsId,
    candidateElectionDetailsId,
  });
  const methods = useForm<commitmentAchievementFormValidationSchemaType>({
    resolver: yupResolver(commitmentAchievement),
    values:
      commitmentAchievementChild as commitmentAchievementFormValidationSchemaType,
  });

  const { handleSubmit, control } = methods;

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<
    commitmentAchievementFormValidationSchemaType
  > = (data: CommitmentAchievementChildType) => {
    if (commitmentAchievementId) {
      updateCommitmentAchievementChildHandler({
        data,
        electionSettingsId,
        candidateElectionDetailsId,
        commitmentAchievementId,
      });
      closeCommitmentAchievementEditModal();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-9">
          <div className="d-flex flex-column gap-9 mt-9">
            <FormChildInput
              registerName={AFFIDAVIT_COMMITMENT_ACHIEVEMENTS.PROMISES}
              title={t('AFFIDAVIT_LIABILITIES.PROMISES')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <FormChildInput
              registerName={AFFIDAVIT_COMMITMENT_ACHIEVEMENTS.ACHIEVEMENTS}
              title={t('AFFIDAVIT_LIABILITIES.ACHIEVEMENTS')}
              control={control}
              placeholder={t('PLACEHOLDER.ENTER')}
            />
            <div className="d-flex gap-5">
              <Button
                fill="outline"
                type="light"
                className="flex-fill"
                onClick={closeCommitmentAchievementEditModal}
              >
                {t('CANDIDATE_PERSONAL_INFO.CANCEL_BUTTON_TEXT')}
              </Button>
              <Button
                fill="fill"
                type="primary"
                className="flex-fill"
                htmlType="submit"
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
