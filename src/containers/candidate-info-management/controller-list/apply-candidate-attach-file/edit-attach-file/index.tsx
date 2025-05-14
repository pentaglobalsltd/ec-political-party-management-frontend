import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Header } from '@pentabd/ui';
import { useDispatch } from 'react-redux';
import { IconCheckCircleBroken, IconRefreshCcw01 } from '@pentabd/icons';

import ImageInput from '@components/inputs/ImageInput';
import { useAttachFile } from '@hooks/candidate-info-management/operator-view/candidate-management/useAttachFile';
import {
  ATTACH_FILE,
  FormData as AttachFileFormData,
  getAttachFileValidation,
} from '@validations/candidate-info-management/operator/attach-file/attachFileValidation';
import { AttachFileType } from '@type/candidate-info-management/operator-view/attach-file';
import { createAttachFileInitialState } from '@actions/candidate-info-management/operator-view/candidate-management/attach-file/attach-file-action';
import { DocumentServiceType } from '@type/candidate-info-management/operator-view/attach-file/document-service-type';
import FileComponent from '@components/inputs/FileComponent';
import { electionNameMapping } from '@helpers/election-type';
import { FILE_CATEGORY } from '@constants/file';
import { ELECTION_INFO } from '@constants/election-info';
import { CANDIDATE_INFO } from '@constants/candidate-info';

function EditAttachFile({ onEdit }: { onEdit?: (data: number) => void }) {
  const { t } = useTranslation();
  const {
    electionSettingsId,
    candidateElectionDetailsId,
    electionTypeId,
    scheduleId,
    candidateTypeId,
  } = useParams();

  const isUnionMemberElection = [
    CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID,
    CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID,
  ].includes(Number(candidateTypeId));

  const hideSignatureField = [
    ELECTION_INFO.UPAZILLA.ID,
    ELECTION_INFO.MUNICIPALITY.ID,
    ELECTION_INFO.UNION_PARISHAD.ID,
  ].includes(Number(electionTypeId));

  const hideCandidateExpenditureField = [
    ELECTION_INFO.UNION_PARISHAD.ID,
  ].includes(Number(electionTypeId));

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const electionTypeKey = electionNameMapping(Number(electionTypeId));

  const { isCreateRequested, isCreateSuccess, addAttachFile, attachFile } =
    useAttachFile({
      electionSettingsId,
      candidateElectionDetailsId,
    });

  const methods = useForm<AttachFileFormData>({
    resolver: yupResolver(
      getAttachFileValidation({
        isHalafnamaRequired: !isUnionMemberElection,
      }),
    ),
    values: attachFile as AttachFileFormData,
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(createAttachFileInitialState());
      if (!onEdit) {
        navigate(-1);
      } else if (onEdit) {
        onEdit(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateSuccess]);

  const handleButtonDisable = (value: boolean) => {
    setDisableButton(value);
  };
  const onSubmit: SubmitHandler<AttachFileFormData> = (
    data: AttachFileType,
  ) => {
    addAttachFile({
      electionSettingsId,
      candidateElectionDetailsId,
      data,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{
          header: `${t('ATTACH_FILE.PAGE_TITLE')}`,
          subHeader: `${t('ATTACH_FILE.PAGE_SUBTITLE')}`,
        }}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="mb-10" />
            <ImageInput
              title={t('ATTACH_FILE.CANDIDATE_TITLE')}
              subtitle={t('ATTACH_FILE.IMAGE_FIELD_SUBTITLE')}
              fileContainerType="image-upload"
              registerName={ATTACH_FILE.CANDIDATE_IMAGE}
              handleButtonDisable={handleButtonDisable}
              required
              candidateImage={attachFile?.candidateImage as DocumentServiceType}
              pathId={scheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />

            {/* হলফনামা */}
            <FileComponent
              title={t('ATTACH_FILE.AFFIDAVIT_TITLE')}
              subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
              registerName={ATTACH_FILE.AFFIDAVIT}
              handleButtonDisable={handleButtonDisable}
              required={!isUnionMemberElection}
              pathId={scheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />
            <FileComponent
              title={t('ATTACH_FILE.POLITICAL_PARTY_NOMINATION')}
              subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
              registerName={ATTACH_FILE.POLITICAL_PARTY_NOMINATION}
              handleButtonDisable={handleButtonDisable}
              pathId={scheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />
            <FileComponent
              title={t('ATTACH_FILE.INCOME_TAX_TITLE')}
              subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
              registerName={ATTACH_FILE.INCOME_TAX_RETURN_COPY}
              handleButtonDisable={handleButtonDisable}
              required
              pathId={scheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />
            {hideSignatureField ? null : (
              <FileComponent
                title={t(`ATTACH_FILE.SIGNATURE_TITLE.${electionTypeKey}`)}
                subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
                registerName={ATTACH_FILE.VOTERS_SUPPORT_SIGNED_LIST}
                handleButtonDisable={handleButtonDisable}
                additionalText={t(
                  `ATTACH_FILE.INDEPENDENT_CANDIDATE_ADDITIONAL_TEXT.${electionTypeKey}`,
                )}
                pathId={scheduleId}
                category={FILE_CATEGORY.CANDIDATES}
              />
            )}

            {hideCandidateExpenditureField ? null : (
              <FileComponent
                title={t('ATTACH_FILE.FUNDS_TITLE')}
                subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
                registerName={ATTACH_FILE.CANDIDATE_EXPENDITURE}
                handleButtonDisable={handleButtonDisable}
                pathId={scheduleId}
                category={FILE_CATEGORY.CANDIDATES}
              />
            )}

            <FileComponent
              title={t('ATTACH_FILE.EDUCATION_LEVEL_TITLE')}
              subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
              registerName={ATTACH_FILE.HIGHEST_EDUCATIONAL_QUALIFICATION}
              handleButtonDisable={handleButtonDisable}
              pathId={scheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />

            <FileComponent
              title={t('ATTACH_FILE.UTILITY_BILL_TITLE')}
              subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
              registerName={ATTACH_FILE.UTILITY_BILL}
              handleButtonDisable={handleButtonDisable}
              pathId={scheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />

            {/* ভোটার তালিকার সিডি কেনার রশিদ  */}
            <FileComponent
              title={t('ATTACH_FILE.BUY_CD')}
              subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
              registerName={ATTACH_FILE.BUY_CD}
              handleButtonDisable={handleButtonDisable}
              required
              pathId={scheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />

            <FileComponent
              title={t('ATTACH_FILE.OTHERS_DOCUMENT_TITLE')}
              subtitle={t('ATTACH_FILE.FILE_FIELD_SUBTITLE')}
              registerName={ATTACH_FILE.OTHER_DOCUMENTS}
              handleButtonDisable={handleButtonDisable}
              pathId={scheduleId}
              category={FILE_CATEGORY.CANDIDATES}
            />
          </div>

          <div className="border-top py-8">
            <div className="col-12 d-flex justify-content-end gap-6">
              <Button
                fill="outline"
                className="border-info"
                type="info"
                onClick={() => reset()}
              >
                {t('NOMINATION_FORM_FIRST_PART.RESET_BUTTON')}
                <IconRefreshCcw01 size="20" fill="info" />
              </Button>
              <Button
                fill="fill"
                className="border-primary"
                type="success"
                loading={isCreateRequested}
                htmlType="submit"
                disabled={disableButton}
              >
                {t('NOMINATION_FORM_FIRST_PART.SUBMIT_BUTTON')}
                <IconCheckCircleBroken size="20" fill="white" />
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EditAttachFile;
