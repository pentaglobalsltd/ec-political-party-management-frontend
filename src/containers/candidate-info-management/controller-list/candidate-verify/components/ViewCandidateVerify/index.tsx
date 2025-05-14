import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Header, Table, Text } from '@pentabd/ui';
import { IconCheckCircleBroken } from '@pentabd/icons';

import FormTextArea from '@components/inputs/FormTextArea';

import { STEPS } from '@constants/steps';
import {
  ViewCandidateVerifyNameTableColumns,
  ViewCandidateVerifyNameTableRows,
  ViewCandidateVerifyTableBreadcrumbs,
  ViewCandidateVerifyTableColumns,
  ViewCandidateVerifyTableRows,
} from '../../constants';
import { useElectionApplicantUpdate } from '@hooks/candidate-info-management/controller-list/useElectionApplicantUpdate';
import { useNominationStepsForQuery } from '@hooks/miscellaneous/custom-hook/useNominationStepForQuery';
import { useIndividualCandidateElectionDetails } from '@hooks/candidate-info-management/nomination-list/useIndividualCandidateElectionDetails';
import {
  CANDIDATE_VERIFY,
  CandidateVerifyTypeDataType,
  candidateVerifyValidation,
} from '@validations/candidate-info-management/controller-list/verify/verifyValidation';

export default function ViewCandidateVerify() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { electionSettingsId, candidateElectionDetailsId, candidateId } =
    useParams();

  const { electionApplicantUpdate, success, loading } =
    useElectionApplicantUpdate();
  const { candidateDetails } = useIndividualCandidateElectionDetails({
    electionSettingsId,
    candidateElectionDetailsId,
  });

  const stepId = STEPS.VERIFY;
  const { availableStatuses } = useNominationStepsForQuery({
    stepId,
    filterStatus: true,
    availableStatus: true,
  });

  const methods = useForm<CandidateVerifyTypeDataType>({
    resolver: yupResolver(candidateVerifyValidation),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (success) {
      navigate(-1);
    }
  }, [success, navigate]);

  const onSubmit: SubmitHandler<CandidateVerifyTypeDataType> = (data: any) => {
    data.id = parseInt(candidateId as string);
    data.nominationStatusId = availableStatuses;
    data.candidateElectionDetailsId = parseInt(
      candidateElectionDetailsId as string,
    );
    electionApplicantUpdate({
      data,
      candidateElectionDetailsId,
      electionSettingsId,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('VERIFY.VIEW_CANDIDATE_VERIFY_TITTLE'),
        }}
        breadcrumbs={ViewCandidateVerifyTableBreadcrumbs(t)}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-12">
            <div className="d-grid grid-cols-1 grid-cols-lg-2 gap-10">
              <div className="grid-col-span-1">
                <Table
                  rows={ViewCandidateVerifyTableRows(t, candidateDetails)}
                  columns={ViewCandidateVerifyTableColumns(t)}
                />
              </div>
              <div className="grid-col-span-1">
                <Table
                  rows={ViewCandidateVerifyNameTableRows(t)}
                  columns={ViewCandidateVerifyNameTableColumns(
                    t,
                    register,
                    errors,
                  )}
                />
              </div>
            </div>
          </div>

          <FormTextArea
            title="VERIFY.COMMENT"
            registerName={CANDIDATE_VERIFY.COMMENT}
          />

          <div className="d-flex justify-content-end gap-6 border-top py-12">
            <Button
              fill="fill"
              className="border-primary"
              type="primary"
              htmlType="submit"
              disabled={!stepId}
              loading={loading}
            >
              <Text size="sm" weight="semibold" color="light">
                {t('VERIFY.SUBMIT_BUTTON_TEXT')}
              </Text>
              <IconCheckCircleBroken size="20" fill="light" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
