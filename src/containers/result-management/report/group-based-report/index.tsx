import { useTranslation } from 'react-i18next';

import { Header, Text } from '@pentabd/ui';

import Loader from '@components/Loader';
import { PDFViewer } from '@containers/result-management/electoral-process/message-send-list-prepare/components';
import { groupBasedReportBreadcrumbs, requiredFields } from './constants';
import { useGroupBasedReportPdfGenerator } from '@hooks/result-management/report/group-based-report/useGroupBasedReport';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { allSelectedDataForAdmin, searchStruct } from './searchConstants';
import { CANDIDATE_INFO } from '@constants/candidate-info';

const GroupBasedReport = () => {
  const { t } = useTranslation();
  const { pdfBuffer, getBufferData, downloadGroupBasedReport, error, loading } =
    useGroupBasedReportPdfGenerator();

  const onSubmit = (data: any) => {
    const { electionScheduleId, candidateTypeId } = data;
    if (electionScheduleId && candidateTypeId) {
    }
    getBufferData(electionScheduleId, candidateTypeId);
  };

  const handleDownloadForm = async () => {
    downloadGroupBasedReport();
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('GROUP_BASED_REPORT.GROUP_BASED_REPORT'),
        }}
        breadcrumbs={groupBasedReportBreadcrumbs(t)}
      />

      <SearchComponents
        totalCol="grid-cols-lg-10"
        colSpan="col-span-3"
        struct={searchStruct}
        requiredField={requiredFields}
        onSubmitHandler={onSubmit}
        getElectionSettingsIdForAdmin={true}
        allSelectedData={allSelectedDataForAdmin}
        nonVisibleCandidateType={[
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID,
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID,
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID,
        ]}
      />

      {loading ? <Loader position="align-items-start" /> : null}

      {pdfBuffer ? (
        <PDFViewer
          pdfBuffer={pdfBuffer as any}
          handlePrint={handleDownloadForm}
          showZoom
          // showList
          buttonLabelDownload={t('GROUP_BASED_REPORT.DOWNLOAD_BUTTON')}
        />
      ) : (
        error &&
        error.isError && (
          <div className="bg-light border rounded-5 p-14 text-center">
            <Text color="danger" weight="bold">
              {error.message || ''}
            </Text>
          </div>
        )
      )}
    </div>
  );
};

export default GroupBasedReport;
