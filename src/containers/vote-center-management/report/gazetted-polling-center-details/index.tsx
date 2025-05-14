import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { Header, Text } from '@pentabd/ui';

import Loader from '@components/Loader';
import { SearchComponents } from '@components/application-search/SearchComponents';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { usePollingCenterDetailsPdfGenerator } from '@hooks/miscellaneous/reports/polling-center-details-pdf-generator';
import { usePollingCenterDetailsSummaryPdfGenerator } from '@hooks/miscellaneous/reports/polling-center-details-summary-pdf-generator';

import { PDFViewer } from '@containers/result-management/electoral-process/message-send-list-prepare/components';
import { USER_TYPES } from '@constants/user-types';
import { BUTTON_TYPE } from '@constants/result-management/report';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import {
  OPTIONS_TYPE,
  pollingCenterDetailsReportBreadcrumbs,
  reportOptionsListing,
  reportOptionsSummary,
} from './constants';
import {
  allSelectedData,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';

const PollingCenterDetailsReport = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [showListingPdf, setShowListingPdf] = useState<boolean>();
  const [showSummaryPdf, setShowSummaryPdf] = useState<boolean>();
  const [downloadListingPdf, setDownloadListingPdf] = useState<boolean>();
  const [downloadSummaryPdf, setDownloadSummaryPdf] = useState<boolean>();

  // গেজেটেড ভোটকেন্দ্রের তালিকা pdf
  const {
    downloadPollingCenterDetails,
    getBufferData,
    loading: generatePdfLoading,
    pdfBuffer,
    error,
  } = usePollingCenterDetailsPdfGenerator();

  // গেজেটেড ভোটকেন্দ্রের সার-সংক্ষেপ pdf
  const {
    downloadPollingCenterDetailsSummary,
    getBufferData: getSummaryBufferData,
    loading: generatePdfSummaryLoading,
    pdfBuffer: summaryPdfBuffer,
    error: errorSummary,
  } = usePollingCenterDetailsSummaryPdfGenerator();

  const handleDownloadListPdf = async () => {
    downloadPollingCenterDetails();
  };

  const handleDownloadSummaryPdf = async () => {
    downloadPollingCenterDetailsSummary();
  };

  const onSubmitSearch = async (data: any) => {
    if (data.reportType === OPTIONS_TYPE.LISTING) {
      getBufferData({
        electionScheduleId: data?.electionScheduleId,
        electionSettingsId: data?.electionSettingsId,
      });

      if (data.buttonType === BUTTON_TYPE.SEARCH) {
        setShowListingPdf(true);
        setShowSummaryPdf(false);

        setDownloadListingPdf(false);
        setDownloadSummaryPdf(false);
      } else {
        setDownloadListingPdf(true);
        setDownloadSummaryPdf(false);

        setShowListingPdf(false);
        setShowSummaryPdf(false);
      }
    } else {
      getSummaryBufferData({
        electionScheduleId: data?.electionScheduleId,
        electionSettingsId: data?.electionSettingsId,
      });

      if (data.buttonType === BUTTON_TYPE.SEARCH) {
        setShowListingPdf(false);
        setShowSummaryPdf(true);

        setDownloadListingPdf(false);
        setDownloadSummaryPdf(false);
      } else {
        setDownloadListingPdf(false);
        setDownloadSummaryPdf(true);

        setShowListingPdf(false);
        setShowSummaryPdf(false);
      }
    }
  };

  useEffect(() => {
    if (pdfBuffer && downloadListingPdf) downloadPollingCenterDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfBuffer]);

  useEffect(() => {
    if (summaryPdfBuffer && downloadSummaryPdf)
      downloadPollingCenterDetailsSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryPdfBuffer]);

  return (
    <div className="container-96 mb-24 mb-20">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t(
            'POLLING_CENTER_DETAILS_REPORT.POLLING_CENTER_DETAILS_REPORT_TITLE',
          ),
        }}
        breadcrumbs={pollingCenterDetailsReportBreadcrumbs(t)}
      />

      {userType === USER_TYPES.ADMIN && (
        <SearchComponents
          totalCol="grid-cols-lg-6"
          colSpan="col-span-2"
          struct={searchStruct}
          selectAny
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
            SEARCH_FIELD_REQUIRED.CONSTITUENCY_ID,
          ]}
          getElectionSettingsIdForAdmin
          showSubmitButton={false}
          isDetailedButton
          isBriefButton
          isDetailedButtonOptions={reportOptionsListing(t)}
          isBriefButtonOptions={reportOptionsSummary(t)}
          isDetailedButtonLabel="POLLING_CENTER_DETAILS_REPORT.LIST_DOWNLOAD_SEARCH"
          isBriefButtonLabel="POLLING_CENTER_DETAILS_REPORT.SUMMARY_DOWNLOAD_SEARCH"
        />
      )}

      {userType !== USER_TYPES.ADMIN && (
        <SearchComponents
          totalCol="grid-cols-lg-6"
          colSpan="col-span-2"
          struct={searchStructElectionUser}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
          ]}
          allSelectedData={allSelectedData}
          onSubmitHandler={onSubmitSearch}
          showSubmitButton={false}
          isDetailedButton
          isBriefButton
          isDetailedButtonOptions={reportOptionsListing(t)}
          isBriefButtonOptions={reportOptionsSummary(t)}
          isDetailedButtonLabel="POLLING_CENTER_DETAILS_REPORT.LIST_DOWNLOAD_SEARCH"
          isBriefButtonLabel="POLLING_CENTER_DETAILS_REPORT.SUMMARY_DOWNLOAD_SEARCH"
        />
      )}

      {generatePdfLoading || generatePdfSummaryLoading ? (
        <Loader position="align-items-start" />
      ) : null}

      {pdfBuffer && showListingPdf ? (
        <>
          <PDFViewer
            pdfBuffer={pdfBuffer}
            // showList
            showZoom
            handlePrint={handleDownloadListPdf}
          />
        </>
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

      {summaryPdfBuffer && showSummaryPdf ? (
        <>
          <PDFViewer
            pdfBuffer={summaryPdfBuffer}
            showList
            showZoom
            handlePrint={handleDownloadSummaryPdf}
          />
        </>
      ) : (
        errorSummary &&
        errorSummary.isError && (
          <div className="bg-light border rounded-5 p-14 text-center">
            <Text color="danger" weight="bold">
              {errorSummary.message || ''}
            </Text>
          </div>
        )
      )}
    </div>
  );
};

export default PollingCenterDetailsReport;
