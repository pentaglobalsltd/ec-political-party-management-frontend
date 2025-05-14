import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Text } from '@pentabd/ui';

import FormInput from '@components/inputs/FormInput';

import { useContestingCandidatesPdfGenerator } from '@hooks/miscellaneous/reports/contesting-candidates-pdf-generator';
import { CHECK_ONLY_NUMBER_AND_EMPTY } from '@constants/validation-string';
import { FORM_FIELDS } from '@constants/forms';
import {
  ContestingCandidatesModalDataType,
  contestingCandidatesModalValidation,
} from '@validations/candidate-info-management/report/contestingCandidatesPdfDownloadModalValidation';
import { getParams } from '@utils';

const CONTESTING_CANDIDATES_MODAL =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.CONTROLLER_LIST.REPORT
    .CONTESTING_CANDIDATES_MODAL;

const ContestingCandidatesPdfDownloadModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { generatePdf, generatePdfLoading } =
    useContestingCandidatesPdfGenerator();

  const methods = useForm<ContestingCandidatesModalDataType>({
    resolver: yupResolver(contestingCandidatesModalValidation),
  });

  const { handleSubmit } = methods;

  // download Pdf from Actions button
  const onSubmit = (data: any) => {
    generatePdf({
      // Mandatory fields
      electionTypeId: Number(params.electionTypeId) as number,
      nominationStatusCodes: params.nominationStatusCodes as string,
      candidateSerialOrder: Boolean(params.candidateSerialOrder) as boolean,
      voterCount: Number(data.voterCount) as number,
      // Non-mandatory fields
      electionScheduleId: Number(params.electionScheduleId) as number,
      candidateTypeId: Number(params.candidateTypeId) as number,
      zillaId: Number(params.zillaId) as number,
      constituencyId: Number(params.constituencyId) as number,
      bengaliAlphabetOrder: Boolean(params.bengaliAlphabetOrder) as boolean,
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="column p-9 g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column mt-8 gap-8">
          <Text size="xl" weight="bold" color="title">
            {t('CONTESTING_CANDIDATES_LIST.MODAL_TITLE')}
          </Text>
          <FormInput
            title="CONTESTING_CANDIDATES_LIST.VOTER_COUNT"
            registerName={CONTESTING_CANDIDATES_MODAL.VOTER_COUNT}
            formattedValue={CHECK_ONLY_NUMBER_AND_EMPTY}
            placeholder="PLACEHOLDER.ENTER_NUMBER"
            required
          />
        </div>
        <div className="d-flex justify-content-end gap-7">
          <Button
            fill="outline"
            type="light"
            htmlType="button"
            onClick={closeModal}
          >
            {t('CONTESTING_CANDIDATES_LIST.CLOSE')}
          </Button>
          <Button
            fill="fill"
            type="primary"
            loading={generatePdfLoading}
            htmlType="submit"
          >
            {t('CONTESTING_CANDIDATES_LIST.DOWNLOAD')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ContestingCandidatesPdfDownloadModal;
