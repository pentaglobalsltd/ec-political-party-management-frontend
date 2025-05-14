import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Button, Header, Table } from '@pentabd/ui';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useConsolidatedStatementPdfGenerator } from '@hooks/result-management/report/consolidated-statement/useConsolidatedStatement';

import { getParams } from '@utils';
import { voteCenterWiseResultTableColumns } from './constants';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';

const ResultModal = ({
  dynamicColumns,
  candidateResults,
  loading,
  closeResultModal,
}: any) => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    downloadConsolidatedStatementFromModal,
    downloadLoading: pdfDownloadLoading,
  } = useConsolidatedStatementPdfGenerator();

  const handleDownloadPdf = async () => {
    // ফলাফল ও পরিস্থিতি পর্যালোচনা -> ফলাফল -> প্রাপ্ত ফলাফল -> Modal ডাউনলোড পিডিএফ
    const electionScheduledId = params?.electionScheduleId;
    const candidateTypeId = params?.candidateTypeId;
    const electionSettingsId = params?.electionSettingsId;
    if (electionScheduledId && candidateTypeId && electionSettingsId) {
      downloadConsolidatedStatementFromModal(
        electionScheduledId,
        candidateTypeId,
        {
          electionSettingsId: Number(electionSettingsId),
        },
      );
    }
  };

  return (
    <div className="px-14 pb-14">
      <Header
        className="mb-10 pt-4"
        headerText={{
          header: t(
            'RESULT_AND_SITUATION_REVIEW.VOTE_CENTER_WISE_RESULT_TABLE_HEADER',
          ),
        }}
      />

      <Table
        columns={voteCenterWiseResultTableColumns(t, dynamicColumns || [])}
        rows={candidateResults}
        loading={loading}
        loadingItemCount={4}
      />

      <div className="mt-8 d-flex justify-content-end gap-6">
        {permissionsArray?.includes(
          RESULT_MANAGEMENT.REPORT_CONSOLIDATED_REPORT,
        ) ? (
          <Button
            key={1}
            type="success"
            loading={pdfDownloadLoading}
            onClick={handleDownloadPdf}
          >
            {t('RESULT_AND_SITUATION_REVIEW.MODAL_DOWNLOAD_PDF_BUTTON')}
          </Button>
        ) : null}
        <Button
          key={2}
          type="secondary"
          className="bg-purple text-white"
          onClick={closeResultModal}
        >
          {t('RESULT_AND_SITUATION_REVIEW.MODAL_CLOSE_BUTTON')}
        </Button>
      </div>
    </div>
  );
};

export default ResultModal;
