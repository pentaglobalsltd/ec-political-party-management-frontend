import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Text } from '@pentabd/ui';
import {
  IconCalendar,
  IconCheckCircleBroken,
  IconRefreshCcw01,
} from '@pentabd/icons';

import FormDate from '@components/inputs/FormDate';
import FormRadio from '@components/inputs/FormRadio';
import FormInput from '@components/inputs/FormInput';
import FormTextArea from '@components/inputs/FormTextArea';
import FileComponent from '@components/inputs/FileComponent';

import { FORM_FIELDS } from '@constants/forms';
import { FILE_CATEGORY } from '@constants/file';
import { APPLICATION_STATUS, submittedByRadioOptions } from '../constants';

import { useElectionApplicantUpdate } from '@hooks/candidate-info-management/controller-list/useElectionApplicantUpdate';
import { useAcknowledgementReceipt } from '@hooks/candidate-info-management/controller-list/candidate-applied-online/useAcknowledgementReceipt';
import {
  AcknowledgementReceiptDataType,
  acknowledgementReceiptValidation,
} from '@validations/candidate-info-management/controller-list/candidates-applied-online/candidatesAppliedOnlineValidation';
import { removeTimeInDate } from '@utils/date-converter';

const ACKNOWLEDGEMENT_RECEIPT =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.CANDIDATE_APPLIED_ONLINE
    .ACKNOWLEDGEMENT_RECEIPT;

const AcknowledgementReceiptForm = ({
  candidateSerial,
  candidateLocation,
  candidateName,
  finalSubmissionDate,
  electionScheduleId,
}: {
  candidateSerial?: string;
  candidateLocation?: string;
  candidateName?: string;
  finalSubmissionDate?: string;
  electionScheduleId?: string | number;
}) => {
  const formattedSubmissionDate = removeTimeInDate({
    dateFormat: finalSubmissionDate as string,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { getAcknowledgementReceiptData, downloadLoading } =
    useAcknowledgementReceipt();
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionApplicantId,
  } = useParams();

  const { electionApplicantUpdate, success, loading } =
    useElectionApplicantUpdate();

  const methods = useForm<AcknowledgementReceiptDataType>({
    resolver: yupResolver(acknowledgementReceiptValidation),
    values: {
      candidateSerial: candidateSerial as string,
      candidateLocation: candidateLocation as string,
      candidateName: candidateName as string,
      finalSubmissionDate: formattedSubmissionDate as string,
    },
  });

  const { handleSubmit, reset, setError, getValues, clearErrors } = methods;

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };

  const handleDownload = () => {
    if (
      getValues(ACKNOWLEDGEMENT_RECEIPT.SUBMITTED_BY) == null ||
      !getValues(ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_DATE) ||
      !getValues(ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_PLACE)
    ) {
      if (getValues(ACKNOWLEDGEMENT_RECEIPT.SUBMITTED_BY) == null) {
        setError(ACKNOWLEDGEMENT_RECEIPT.SUBMITTED_BY, {
          message: 'CANDIDATE_APPLIED_ONLINE.SUBMITTED_BY_REQUIRED',
        });
      }

      if (!getValues(ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_DATE)) {
        setError(ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_DATE, {
          message:
            'CANDIDATE_APPLIED_ONLINE.NOMINATION_SELECTION_DATE_REQUIRED',
        });
      }

      if (!getValues(ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_PLACE)) {
        setError(ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_PLACE, {
          message:
            'CANDIDATE_APPLIED_ONLINE.NOMINATION_SELECTION_PLACE_REQUIRED',
        });
      }
      return;
    } else {
      clearErrors();
    }

    const nominationSubmissionDate = getValues(
      ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SUBMISSION_DATE,
    ) as string;

    const nominationSelectionDate = getValues(
      ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_DATE,
    ) as string;

    getAcknowledgementReceiptData({
      electionSettingsId: electionSettingsId as string,
      electionDetailsId: candidateElectionDetailsId as string,
      serialNo: candidateSerial as string,
      proposedBy: getValues(ACKNOWLEDGEMENT_RECEIPT.SUBMITTED_BY) as string,
      proposedDate: nominationSubmissionDate?.split(' ')?.[0],
      proposedTime: nominationSubmissionDate?.split(' ')?.[1],

      roSelectedDate: nominationSelectionDate?.split(' ')?.[0],
      roSelectedTime: nominationSelectionDate?.split(' ')?.[1],
      roSelectedPlace: getValues(
        ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_PLACE,
      ) as string,
    });
  };

  const onSubmit: SubmitHandler<AcknowledgementReceiptDataType> = (
    data: any,
  ) => {
    const candidateSerial = parseInt(data.candidateSerial);

    const formData = {
      ...data,
      candidateSerial,
      nominationStatusId: APPLICATION_STATUS.ACKNOWLEDGE,
      id: parseInt(electionApplicantId as string),
      candidateElectionDetailsId: parseInt(
        candidateElectionDetailsId as string,
      ),

      acknowledgmentSubmitter: data.proposedBy,
      nominationSelectionDate: dayjs(data.ROSelectedDate).format(
        'YYYY-MM-DDTHH:mm',
      ),
      nominationSelectionPlace: data.ROSelectedPlace,
    };

    electionApplicantUpdate({
      electionSettingsId,
      candidateElectionDetailsId,
      data: formData,
    });
  };

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [navigate, success]);

  return (
    <div className="pb-12 mb-8 border-bottom">
      <div className="border-bottom pb-10 mb-12">
        <Text component="h2" size="lg" weight="semibold" color="dark">
          {t('CANDIDATE_APPLIED_ONLINE.ACKNOWLEDGMENT_RECEIPT_NOTICE')}
        </Text>
        <Text component="h4" size="sm" weight="normal" color="subtitle1">
          {t('CANDIDATE_APPLIED_ONLINE.FILLED_BY_PROPOSER')}
        </Text>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            title="CANDIDATE_APPLIED_ONLINE.SERIAL_NUMBER"
            registerName={ACKNOWLEDGEMENT_RECEIPT.SERIAL_NUMBER}
            disabled
          />

          <FormInput
            title="CANDIDATE_APPLIED_ONLINE.CONSTITUENCY"
            registerName={ACKNOWLEDGEMENT_RECEIPT.CONSTITUENCY}
            disabled
          />

          <FormInput
            title="CANDIDATE_APPLIED_ONLINE.CANDIDATE_NAME"
            registerName={ACKNOWLEDGEMENT_RECEIPT.CANDIDATE_NAME}
            disabled
          />

          <FormDate
            title="CANDIDATE_APPLIED_ONLINE.NOMINATION_SUBMISSION_DATE"
            name={ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SUBMISSION_DATE}
            placeholder={t('PLACEHOLDER.SELECT')}
            registerName={ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SUBMISSION_DATE}
            prefix={<IconCalendar size="20" fill="subtitle2" />}
            isTimePicker
            disabled
          />

          <FormRadio
            title="CANDIDATE_APPLIED_ONLINE.SUBMITTED_BY"
            options={submittedByRadioOptions(t)}
            name={ACKNOWLEDGEMENT_RECEIPT.SUBMITTED_BY}
            id={ACKNOWLEDGEMENT_RECEIPT.SUBMITTED_BY}
            required
          />

          <FormDate
            title="CANDIDATE_APPLIED_ONLINE.NOMINATION_SELECTION_DATE"
            name={ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_DATE}
            placeholder={t('PLACEHOLDER.SELECT')}
            registerName={ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_DATE}
            prefix={<IconCalendar size="20" fill="subtitle2" />}
            isTimePicker
            required
          />

          <FormInput
            title="CANDIDATE_APPLIED_ONLINE.NOMINATION_SELECTION_PLACE"
            placeholder={t('PLACEHOLDER.ENTER')}
            registerName={ACKNOWLEDGEMENT_RECEIPT.NOMINATION_SELECTION_PLACE}
            required
          />

          <div className="d-grid grid-cols-12 mb-12 gap-5">
            <div className="col-span-3">
              <Text weight="semibold" size="sm" color="title">
                {t('CANDIDATE_APPLIED_ONLINE.DOWNLOAD_ACKNOWLEDGMENT_RECEIPT')}
              </Text>
            </div>
            <div className="col-span-5">
              <Button
                fill="fill"
                className="border-success"
                type="success"
                htmlType="button"
                onClick={handleDownload}
                loading={downloadLoading}
              >
                <Text size="sm" weight="semibold" color="white">
                  {t('CANDIDATE_APPLIED_ONLINE.ACKNOWLEDGMENT_RECEIPT_BUTTON')}
                </Text>
              </Button>
            </div>
          </div>

          <FormTextArea
            title="CANDIDATE_APPLIED_ONLINE.REMARK"
            registerName={ACKNOWLEDGEMENT_RECEIPT.REMARK}
          />

          <FileComponent
            title={t('CANDIDATE_APPLIED_ONLINE.UPLOAD')}
            registerName={ACKNOWLEDGEMENT_RECEIPT.UPLOAD_DOCUMENT}
            handleButtonDisable={handleButtonDisable}
            pathId={electionScheduleId}
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

export default AcknowledgementReceiptForm;
