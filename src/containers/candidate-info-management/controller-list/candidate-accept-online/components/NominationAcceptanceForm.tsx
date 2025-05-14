import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';
import { useNavigate, useParams } from 'react-router-dom';
import FileComponent from '@components/inputs/FileComponent';
import FormRadio from '@components/inputs/FormRadio';
import FormTextArea from '@components/inputs/FormTextArea';
import { FORM_FIELDS } from '@constants/forms';
import {
  NominationAcceptanceDataType,
  nominationAcceptanceValidation,
} from '@validations/candidate-info-management/controller-list/candidates-applied-online/candidatesAppliedOnlineValidation';
import { radioOptions } from '../../candidate-applied-online/constants';
import { useElectionApplicantUpdate } from '@hooks/candidate-info-management/controller-list/useElectionApplicantUpdate';
import { useAcceptanceRejectionNominationPdf } from '@hooks/candidate-info-management/controller-list/candidate-accept-online/useAcceptanceRejectionNomination';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';
import { FILE_CATEGORY } from '@constants/file';

const NOMINATION_ACCEPTANCE_DECISION =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_APPLIED_ONLINE
    .NOMINATION_ACCEPTANCE_DECISION;

const NominationAcceptanceForm = ({
  candidateDetails,
}: {
  candidateDetails: NominationType;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getAcceptanceRejectionNominationPdfData, downloadLoading } =
    useAcceptanceRejectionNominationPdf();
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionApplicantId,
    electionTypeId,
    candidateTypeId,
  } = useParams();

  const { electionApplicantUpdate, loading, success } =
    useElectionApplicantUpdate();
  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success, navigate]);

  const methods = useForm<NominationAcceptanceDataType>({
    resolver: yupResolver(nominationAcceptanceValidation),
  });

  const { handleSubmit, reset } = methods;

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  const onSubmit: SubmitHandler<NominationAcceptanceDataType> = (data: any) => {
    const formData = {
      ...data,
      id: parseInt(electionApplicantId as string),
      candidateElectionDetailsId: parseInt(
        candidateElectionDetailsId as string,
      ),
    };

    electionApplicantUpdate({
      electionSettingsId,
      candidateElectionDetailsId,
      data: formData,
    });
  };

  return (
    <div className="pb-12 mb-8 border-bottom">
      <div className="border-bottom pb-10 mb-12">
        <Text component="h2" size="lg" weight="semibold" color="dark">
          {t('CANDIDATE_APPLIED_ONLINE.NOMINATION_ACCEPTANCE_DECISION')}
        </Text>
        <Text component="h4" size="sm" weight="normal" color="subtitle1">
          {t('CANDIDATE_APPLIED_ONLINE.FILLED_BY_PROPOSER')}
        </Text>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRadio
            title="CANDIDATE_APPLIED_ONLINE.ACCEPT_NOMINATION_LETTER"
            options={radioOptions(t)}
            name={NOMINATION_ACCEPTANCE_DECISION.ACCEPT_NOMINATION_LETTER}
            id={NOMINATION_ACCEPTANCE_DECISION.ACCEPT_NOMINATION_LETTER}
          />

          <FormTextArea
            title="CANDIDATE_APPLIED_ONLINE.REMARK"
            registerName={NOMINATION_ACCEPTANCE_DECISION.REMARK}
          />

          <div className="d-grid grid-cols-12 mb-12">
            <div className="col-span-3">
              <Text weight="semibold" size="sm" color="title">
                {t(
                  'CANDIDATE_APPLIED_ONLINE.NOMINATION_LETTER_ACCEPTANCE_DECISION_RECEPT',
                )}
              </Text>
            </div>
            <div className="col-span-5">
              <Button
                fill="fill"
                className="border-success"
                type="success"
                htmlType="button"
                onClick={() =>
                  getAcceptanceRejectionNominationPdfData({
                    electionTypeId: Number(electionTypeId),
                    candidateTypeId: Number(candidateTypeId),
                    upazilaNameBn: candidateDetails.constituency,
                    candidateName: candidateDetails.candidateName,
                  })
                }
                loading={downloadLoading}
              >
                <Text size="sm" weight="semibold" color="white">
                  {t(
                    'CANDIDATE_APPLIED_ONLINE.NOMINATION_LETTER_ACCEPTANCE_DECISION_RECEPT_BUTTON',
                  )}
                </Text>
              </Button>
            </div>
          </div>

          <FileComponent
            title={t('CANDIDATE_APPLIED_ONLINE.UPLOAD')}
            registerName={NOMINATION_ACCEPTANCE_DECISION.UPLOAD_DOCUMENT}
            handleButtonDisable={handleButtonDisable}
            pathId={candidateDetails?.electionScheduleId}
            category={FILE_CATEGORY.CIMS}
          />

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              fill="outline"
              className="border-primary"
              type="primary"
              onClick={() => reset()}
            >
              <Text size="sm" weight="semibold" color="primary">
                {t('CANDIDATE_APPLIED_ONLINE.RESET')}
              </Text>
              <IconRefreshCcw01 size="20" fill="primary" />
            </Button>

            <Button
              fill="fill"
              className="border-primary"
              type="primary"
              htmlType="submit"
              disabled={disableButton}
              loading={loading}
            >
              <Text size="sm" weight="semibold" color="white">
                {t('CANDIDATE_APPLIED_ONLINE.SUBMIT')}
              </Text>
              <IconCheckCircleBroken size="20" fill="white" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default NominationAcceptanceForm;
