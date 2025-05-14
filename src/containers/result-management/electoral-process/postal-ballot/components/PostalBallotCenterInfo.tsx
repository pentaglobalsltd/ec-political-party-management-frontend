import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { Button, Modal } from '@pentabd/ui';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { ReportRoSearchFiltersType } from '@hooks/candidate-info-management/report/useRoReportFilters';
import { usePostPostalBallotCenter } from '@hooks/result-management/electoral-process/postal-ballot/usePostPostalBallotCenter';

import { USER_TYPES } from '@constants/user-types';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import { PostalBallotCenterType } from '@type/result-management/electoral-process/postal-ballot/postal-ballot-type';
// import FileComponent from '@components/inputs/FileComponent';
import TotalVoteSummary from './TotalVoteSummary';
import PreviewUploadFileModal from './PreviewUploadFileModal';
import CandidatesVoteDetailForm from './CandidatesVoteDetailForm';
import { SUBMIT_RESULTS } from '@validations/result-management/submit-results/submitResultsOpFormValidation';
import {
  PostalBallotValidationType,
  postalBallotValidation,
} from '@validations/result-management/electoral-process/postalBallotValidation';
import { getParams } from '@utils';

interface Props {
  postalBallotCenter: PostalBallotCenterType;
  getPostalBallotCenter: (obj: any) => void;
  roReportFilters: ReportRoSearchFiltersType;
  showCenterInfo: boolean;
  setShowCenterInfo: (x: any) => void;
  loading: boolean;
}

const PostalBallotCenterInfo = ({
  roReportFilters,
  showCenterInfo,
  setShowCenterInfo,
  getPostalBallotCenter,
  postalBallotCenter,
  loading,
}: Props) => {
  const { t } = useTranslation();
  const resultRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const [disableButton] = useState({
    pdfPreview: true,
    submit: false,
  });
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  const [totalLegalVotes, setTotalLegalVotes] = useState<number>(0);

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const userType = keycloak?.tokenParsed?.userType;

  const {
    postPostalBallotCenter,
    loading: postPostalBallotLoading,
    success,
  } = usePostPostalBallotCenter();

  const {
    // downloadAttachFileHandler,
    fileUrl,
    // loading: pdfLoading,
  } = useDownloadAttachFile();

  const methods = useForm<PostalBallotValidationType>({
    resolver: yupResolver(postalBallotValidation),
    values: {
      [SUBMIT_RESULTS.SCHEDULE]: roReportFilters?.electionSchedule?.[0]?.value,
      [SUBMIT_RESULTS.CONSTITUENCY]: roReportFilters?.constituency?.[0]?.value,
      [SUBMIT_RESULTS.CANDIDATE_TYPE]:
        roReportFilters?.candidateType?.[0]?.value,
      candidateVoteDetails: postalBallotCenter?.candidateVoteCounts || [],
      [SUBMIT_RESULTS.TOTAL_POSTAL_VOTE_COUNT]:
        postalBallotCenter?.totalVoteCount || '0',
      // [SUBMIT_RESULTS.RESULT_FILE_POSTAL]: postalBallotCenter?.fileFromRo,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    // trigger,
    setValue,
    // formState: { errors },
  } = methods;

  const { fields: candidateVoteDetailsFields } = useFieldArray({
    name: SUBMIT_RESULTS.CANDIDATE_VOTE_DETAILS,
    control,
  });

  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

  // const handleButtonDisable = (value: boolean) => {
  //   setDisableButton({ pdfPreview: value, submit: value });
  // };

  // for PDF preview
  // const uploadedPdfData: any = watch(SUBMIT_RESULTS.RESULT_FILE_POSTAL);

  // const handlePreviewButton = async () => {
  //   await trigger(SUBMIT_RESULTS.RESULT_FILE_POSTAL);
  //   if (Object.keys(errors).length === 0) {
  //     await downloadAttachFileHandler({
  //       documentId: uploadedPdfData?.documentId,
  //       fileId: uploadedPdfData?.fileId,
  //       fileType: uploadedPdfData?.fileType,
  //       formatId: 2,
  //       generateLinkOnly: true,
  //       filePath: uploadedPdfData?.filePath,
  //     });

  //     setIsPreviewModalOpen(true);
  //   }
  // };

  const onSubmit = async (data: any) => {
    if (data?.schedule && data?.constituency && data?.candidateVoteDetails) {
      postPostalBallotCenter({
        scheduleId: data?.[SUBMIT_RESULTS.SCHEDULE],
        settingsId: data?.[SUBMIT_RESULTS.CONSTITUENCY],
        data: {
          candidateVoteCounts: data?.candidateVoteDetails,
          [SUBMIT_RESULTS.RESULT_FILE_POSTAL]:
            data?.[SUBMIT_RESULTS.RESULT_FILE_POSTAL] &&
            Object.keys(data?.[SUBMIT_RESULTS.RESULT_FILE_POSTAL])?.length === 0
              ? null
              : data?.[SUBMIT_RESULTS.RESULT_FILE_POSTAL],
        },
      });
    } else {
      const { electionScheduleId, electionSettingsId } = params;

      if (
        electionScheduleId &&
        electionSettingsId &&
        data?.candidateVoteDetails
      ) {
        const payload = {
          scheduleId: electionScheduleId,
          settingsId: electionSettingsId,
          data: {
            candidateVoteCounts: data?.candidateVoteDetails,
            [SUBMIT_RESULTS.RESULT_FILE_POSTAL]:
              data?.[SUBMIT_RESULTS.RESULT_FILE_POSTAL] &&
              Object.keys(data?.[SUBMIT_RESULTS.RESULT_FILE_POSTAL])?.length ===
                0
                ? null
                : data?.[SUBMIT_RESULTS.RESULT_FILE_POSTAL],
          },
        };

        postPostalBallotCenter(payload);
      }
    }
  };

  const candidateVoteDetailsWatch = watch(
    SUBMIT_RESULTS.CANDIDATE_VOTE_DETAILS,
  ) as [];

  // calculation of total votes
  let totalCandidateVotes: number = 0;
  let grandTotal: number = 0;

  if (candidateVoteDetailsWatch.length) {
    candidateVoteDetailsWatch?.forEach((item: any) => {
      if (item?.voteCount) {
        totalCandidateVotes += parseInt(item?.voteCount, 10);
      }
    });
    grandTotal = totalLegalVotes;
  }

  // setting the total votes
  useEffect(() => {
    setTotalLegalVotes(totalCandidateVotes);
    setValue(SUBMIT_RESULTS.TOTAL_POSTAL_VOTE_COUNT, totalCandidateVotes);
  }, [setValue, totalCandidateVotes, totalLegalVotes, grandTotal]);

  useEffect(() => {
    if (success) {
      if (
        roReportFilters?.electionSchedule?.[0]?.value &&
        roReportFilters?.constituency?.[0]?.value
      ) {
        getPostalBallotCenter({
          scheduleId: roReportFilters?.electionSchedule?.[0]?.value,
          settingsId: roReportFilters?.constituency?.[0]?.value,
        });
      } else if (params?.electionScheduleId && params?.electionSettingsId) {
        getPostalBallotCenter({
          scheduleId: params?.electionScheduleId,
          settingsId: params?.electionSettingsId,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    if (
      userType === USER_TYPES.ADMIN &&
      params?.electionScheduleId &&
      params?.electionSettingsId
    ) {
      getPostalBallotCenter({
        scheduleId: params?.electionScheduleId,
        settingsId: params?.electionSettingsId,
      });

      setShowCenterInfo(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {showCenterInfo &&
        postalBallotCenter &&
        Object.keys(postalBallotCenter).length !== 0 && (
          <FormProvider {...methods}>
            <form
              className="d-flex flex-column box-ex rounded-5 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div ref={resultRef} className="vh-100">
                {/* Dynamic Candidate Vote details Form */}
                <CandidatesVoteDetailForm
                  loading={loading}
                  candidateVoteDetailsFields={candidateVoteDetailsFields}
                  watch={watch}
                  setValue={setValue}
                />

                {/* Static Total Vote Form */}
                <TotalVoteSummary loading={loading} />

                {/* File upload with open preview modal button */}
                {/* {!loading && (
                  <div className="d-grid grid-cols-1 grid-cols-lg-10">
                    <div className="col-span-9">
                      <FileComponent
                        title={t('SUBMIT_RESULTS.UPLOAD')}
                        additionalText={t('SUBMIT_RESULTS.UPLOAD_WARNINGS')}
                        registerName={SUBMIT_RESULTS.RESULT_FILE_POSTAL}
                        handleButtonDisable={handleButtonDisable}
                      />
                    </div>
                    <div className="col-span-1">
                      <div className="d-flex justify-content-end">
                        <Button
                          key={5}
                          fill="fill"
                          type="primary"
                          loading={pdfLoading}
                          disabled={!Object.keys(uploadedPdfData || {})?.length}
                          onClick={handlePreviewButton}
                        >
                          {t('SUBMIT_RESULTS.PREVIEW')}
                        </Button>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* Open submit modal button */}
                {!loading &&
                permissionsArray?.includes(RESULT_MANAGEMENT.POSTAL_BALLOT) ? (
                  <div className="d-flex justify-content-end align-items-center border-top pt-8">
                    <Button
                      key={2}
                      htmlType="submit"
                      type="success"
                      loading={loading || postPostalBallotLoading}
                      disabled={disableButton?.submit}
                    >
                      {t('SUBMIT_RESULTS.SUBMIT_RESULT')}
                    </Button>
                  </div>
                ) : null}
              </div>
            </form>
          </FormProvider>
        )}

      {/* preview file upload modal */}
      <Modal
        key={1}
        isOpen={isPreviewModalOpen}
        closeAble
        overlay
        portal
        onClose={closePreviewModal}
      >
        <PreviewUploadFileModal fileUrl={fileUrl} />
      </Modal>
    </div>
  );
};

export default PostalBallotCenterInfo;
