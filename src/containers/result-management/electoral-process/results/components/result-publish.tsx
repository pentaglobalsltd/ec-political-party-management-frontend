import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { IconCheckCircleBroken } from '@pentabd/icons';
import {
  Button,
  Header,
  TableData,
  TableRow,
  TableSecondary,
  Text,
} from '@pentabd/ui';

import Loader from '@components/Loader';
import PDFViewer from '@components/PDFViewer';
import FormTextArea from '@components/inputs/FormTextArea';

import { ROUTES } from '@constants/routes';
import { FORM_FIELDS } from '@constants/forms';
import { ACTION_VIEW_MODE } from './constants';
import { USER_TYPES } from '@constants/user-types';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import { POLLING_CENTER_RESULT_STATUS } from '@constants/polling-center-results';
import { centerBasedResultPublishBreadcrumbs } from '@containers/result-management/results-monitoring/center-based-monitoring-results/constants';
import {
  resultPublishColumn,
  resultPublishBreadcrumbs,
  resultSummaryPublishBreadcrumbs,
} from '../constants';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useRoReportFilters from '@hooks/candidate-info-management/report/useRoReportFilters';
import { useDownloadAttachFile } from '@hooks/miscellaneous/documents/useDownloadAttachFIle';
import { useGetCandidateTypeById } from '@hooks/election-schedule-management/other/candidate-type/useGetCandidateTypeById';
import { useGetPollingCenterInfo } from '@hooks/result-management/electoral-process/results/useGetPollingCenterInfo';
import { useGetElectionScheduleById } from '@hooks/election-schedule-management/election/election-schedule/useGetElectionScheduleById';
import { useUpdatePollingCenterResultStatus } from '@hooks/result-management/electoral-process/results/useUpdatepollingCenterResultStatus';

import {
  ResultApproveByARODataType,
  resultApproveByAROValidation,
} from '@validations/result-management/result/result';
import { getParams } from '@utils';

const RESULT_MANAGEMENT_COMMENT_BY_ARO =
  FORM_FIELDS.RESULT_MANAGEMENT_COMMENT_BY_ARO;

const ResultPublish = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    id: centerId,
    scheduleId: adminScheduleId,
    candidateTypeId: adminCandidateTypeId,
    electionUserCandidateTypeId,
  } = useParams();

  const { keycloak } = useAuthWrapper();

  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;
  const {
    downloadAttachFileHandler,
    fileUrl,
    loading: showPdfLoading,
  } = useDownloadAttachFile();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { pollingCenterInfo, getPollingCenterInfo } = useGetPollingCenterInfo();
  const { updatePollingCenterResultStatus, loading, isSuccess } =
    useUpdatePollingCenterResultStatus();

  const [showCommentAndButton, setShowCommentAndButton] =
    useState<boolean>(false);

  const [approveStatus, setApproveStatus] = useState<string>('');

  const { roReportFilters } = useRoReportFilters();
  const scheduleId = roReportFilters?.electionSchedule?.[0]?.value;
  const electionScheduleLabel = roReportFilters?.electionSchedule?.[0]?.label;
  const candidateTypeLabel = roReportFilters?.candidateType?.find(
    (item) =>
      item?.value ===
      Number(electionUserCandidateTypeId || adminCandidateTypeId),
  )?.label;

  // get schedule-name for admin users
  const {
    electionSchedule: adminElectionScheduleLabel,
    getElectionScheduleData,
  } = useGetElectionScheduleById();

  // get candidate-type-name for admin users
  const { candidateType, getCandidateTypeData } = useGetCandidateTypeById();

  useEffect(() => {
    if (adminScheduleId && userType === USER_TYPES.ADMIN) {
      getElectionScheduleData(adminScheduleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminScheduleId]);

  useEffect(() => {
    if (adminCandidateTypeId && userType === USER_TYPES.ADMIN) {
      getCandidateTypeData(Number(adminCandidateTypeId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const electionName =
    userType !== USER_TYPES.ADMIN
      ? `${electionScheduleLabel} (${candidateTypeLabel})`
      : `${adminElectionScheduleLabel?.name} (${candidateType?.name})`;

  const methods = useForm<ResultApproveByARODataType>({
    resolver: yupResolver(resultApproveByAROValidation),
    values: pollingCenterInfo,
  });

  const { handleSubmit } = methods;

  const status = pollingCenterInfo?.status;

  useEffect(() => {
    //for election user
    const candidateTypeShow =
      electionUserCandidateTypeId || adminCandidateTypeId;

    if (
      scheduleId &&
      candidateTypeShow &&
      centerId &&
      userType !== USER_TYPES.ADMIN
    ) {
      getPollingCenterInfo({
        scheduleId,
        candidateTypeId: candidateTypeShow,
        centerId,
      });
    }

    //for admin
    if (
      adminScheduleId &&
      adminCandidateTypeId &&
      centerId &&
      userType === USER_TYPES.ADMIN
    ) {
      getPollingCenterInfo({
        scheduleId: adminScheduleId,
        candidateTypeId: adminCandidateTypeId,
        centerId,
      });
    }
    if (
      status &&
      status === POLLING_CENTER_RESULT_STATUS.FORWARDED_BY_OP &&
      params?.viewMode !== ACTION_VIEW_MODE.CENTER_BASED
    ) {
      setShowCommentAndButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    scheduleId,
    adminScheduleId,
    electionUserCandidateTypeId,
    adminCandidateTypeId,
    centerId,
    status,
    userType,
  ]);

  const onSubmit: SubmitHandler<ResultApproveByARODataType> = (data: any) => {
    const __data = {
      ...data,
      status: approveStatus,
    };
    const resultId = pollingCenterInfo?.id;
    if (centerId && resultId) {
      updatePollingCenterResultStatus({ data: __data, centerId, resultId });
    }
  };

  function hasUndefinedValues(data: any) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (typeof data[key] === 'undefined') {
          return false;
        }
      }
    }
    return true;
  }

  useEffect(() => {
    if (
      pollingCenterInfo?.fileFromOp &&
      hasUndefinedValues(pollingCenterInfo?.fileFromOp) &&
      !fileUrl
    ) {
      downloadAttachFileHandler({
        documentId: pollingCenterInfo?.fileFromOp?.documentId,
        fileId: pollingCenterInfo?.fileFromOp?.fileId,
        fileType: pollingCenterInfo?.fileFromOp?.fileType,
        formatId: 2,
        generateLinkOnly: true,
        filePath: pollingCenterInfo?.fileFromOp?.filePath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollingCenterInfo?.fileFromOp]);

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: location?.pathname?.includes(
            ROUTES.CENTER_BASED_MONITORING_RESULTS,
          )
            ? t('CENTER_BASED_MONITORING_RESULTS.RESULT_PUBLISH')
            : location?.pathname?.includes(ROUTES.RESULTS_SUMMARY)
            ? t('RESULTS.RESULT_SUMMARY_PUBLISH')
            : t('RESULTS.RESULT_PUBLISH'),
        }}
        breadcrumbs={
          location?.pathname?.includes(ROUTES.CENTER_BASED_MONITORING_RESULTS)
            ? centerBasedResultPublishBreadcrumbs(t)
            : location?.pathname?.includes(ROUTES.RESULTS_SUMMARY)
            ? resultSummaryPublishBreadcrumbs(t)
            : resultPublishBreadcrumbs(t)
        }
      />
      <div className="mb-8">
        <Text
          size="xl"
          weight="semibold"
          color="title"
          component="p"
          className="mb-2"
        >
          {t('RESULTS.ELECTION_NAME')} {electionName}
        </Text>
        <Text size="md" weight="normal" color="subtitle1" component="p">
          {t('RESULTS.CENTER_NAME')} {pollingCenterInfo?.pollingInstituteNameBn}
        </Text>
      </div>

      <div className="d-grid grid-cols-2 gap-6">
        <div className="overflow-y-auto pdf-viewer-modal col-span-1">
          <div className="mb-16 overflow-y-auto">
            <TableSecondary columns={resultPublishColumn(t)}>
              {pollingCenterInfo?.candidateVoteCounts &&
                pollingCenterInfo?.candidateVoteCounts?.length > 0 &&
                pollingCenterInfo?.candidateVoteCounts?.map((item: any) => (
                  <TableRow key={item?.id}>
                    <TableData>{item?.candidateName}</TableData>
                    <TableData>{item?.symbolName}</TableData>
                    <TableData>{item?.legalVoteCount}</TableData>
                    <TableData>{item?.challengedLegalVoteCount}</TableData>
                    <TableData>{item?.totalLegalVoteCount}</TableData>
                  </TableRow>
                ))}
            </TableSecondary>
          </div>
          <div className="mb-16 overflow-y-auto">
            <TableSecondary columns={[]}>
              <TableRow>
                <TableData>{t('RESULTS.TOTAL_VOTE_RECEIVED')}</TableData>
                <TableData>{pollingCenterInfo?.totalLegalVoteCount}</TableData>
              </TableRow>
              <TableRow>
                <TableData>{t('RESULTS.TOTAL_INVALID_VOTE')}</TableData>
                <TableData>
                  {pollingCenterInfo?.totalIllegalVoteCount}
                </TableData>
              </TableRow>
              <TableRow>
                <TableData>{t('RESULTS.TOTAL_VOTE_CAST')}</TableData>
                <TableData>
                  {pollingCenterInfo?.totalLegalVoteCount +
                    pollingCenterInfo?.totalIllegalVoteCount}
                </TableData>
              </TableRow>
              <TableRow>
                <TableData>{t('RESULTS.TOTAL_VOTER_NUMBER')}</TableData>
                <TableData>
                  {pollingCenterInfo?.pollingCenter?.totalVoter}
                </TableData>
              </TableRow>
            </TableSecondary>
          </div>
          <div className="mb-16"></div>
        </div>
        {showPdfLoading ? <Loader position="align-items-start" /> : null}
        <div className="overflow-y-auto pdf-viewer-modal col-span-1">
          <div className="h-100">
            {fileUrl ? <PDFViewer pdfURL={fileUrl} showZoom /> : null}
          </div>
        </div>

        {showCommentAndButton &&
        permissionsArray?.includes(
          RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_PUBLISH,
        ) ? (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <FormTextArea
                  title="RESULTS.COMMENT"
                  registerName={RESULT_MANAGEMENT_COMMENT_BY_ARO.COMMENT}
                />
                <div className="d-flex gap-6 pt-10">
                  <Button
                    size="md"
                    key={4}
                    type="secondary"
                    className="bg-purple text-white"
                    htmlType="button"
                    onClick={() => navigate(-1)}
                  >
                    {t('RESULTS.RETURN_BUTTON')}
                  </Button>

                  <Button
                    size="md"
                    key={3}
                    fill="fill"
                    type="danger"
                    htmlType="submit"
                    onClick={() =>
                      setApproveStatus(
                        POLLING_CENTER_RESULT_STATUS.RETURNED_BY_ARO,
                      )
                    }
                    disabled={isSuccess}
                    loading={loading}
                  >
                    {t('RESULTS.REJECT_BUTTON')}
                  </Button>

                  <Button
                    size="md"
                    key={2}
                    fill="fill"
                    type="success"
                    htmlType="submit"
                    onClick={() =>
                      setApproveStatus(
                        POLLING_CENTER_RESULT_STATUS.APPROVED_BY_ARO,
                      )
                    }
                    disabled={isSuccess}
                    loading={loading}
                  >
                    {t('RESULTS.APPROVE_BUTTON')}
                    <IconCheckCircleBroken size="20" fill="light" />
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormTextArea
                title="RESULTS.COMMENT"
                registerName={RESULT_MANAGEMENT_COMMENT_BY_ARO.COMMENT}
                disabled
              />
              <div className="d-flex gap-6 pt-10">
                <Button
                  size="md"
                  key={1}
                  type="secondary"
                  className="bg-purple text-white"
                  onClick={() => navigate(-1)}
                >
                  {t('RESULTS.RETURN_BUTTON')}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default ResultPublish;
