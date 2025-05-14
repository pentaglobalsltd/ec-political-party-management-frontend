import { useTranslation } from 'react-i18next';
import { Header, Text } from '@pentabd/ui';

import { PDFViewer } from '@containers/result-management/electoral-process/message-send-list-prepare/components';
import Loader from '@components/Loader';

import { useConsolidatedStatementPdfGenerator } from '@hooks/result-management/report/consolidated-statement/useConsolidatedStatement';
import { consolidatedStatementBreadcrumbs } from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import {
  allSelectedDataForAdmin,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

const ConsolidatedStatement = () => {
  const { t } = useTranslation();
  const { isAdmin } = useFiltersRedux();
  const {
    pdfBuffer,
    getBufferData,
    downloadConsolidatedStatement,
    error,
    loading,
  } = useConsolidatedStatementPdfGenerator();

  const onSubmit = (data: any) => {
    const { electionScheduleId, candidateTypeId, electionSettingsId } = data;
    if (electionScheduleId && candidateTypeId && electionSettingsId)
      getBufferData(electionScheduleId, candidateTypeId, {
        electionSettingsId,
      });
  };

  const handleDownloadForm = async () => {
    downloadConsolidatedStatement();
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('CONSOLIDATED_STATEMENT.CONSOLIDATED_STATEMENT'),
        }}
        breadcrumbs={consolidatedStatementBreadcrumbs(t)}
      />

      {isAdmin ? (
        <SearchComponents
          struct={searchStruct}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
          ]}
          onSubmitHandler={onSubmit}
          getElectionSettingsIdForAdmin={true}
          allSelectedData={allSelectedDataForAdmin}
        />
      ) : (
        <SearchComponents
          struct={searchStructElectionUser}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
          ]}
          onSubmitHandler={onSubmit}
          allSelectedData={allSelectedDataForAdmin}
        />
      )}

      {loading ? <Loader position="align-items-start" /> : null}

      {pdfBuffer ? (
        <PDFViewer
          pdfBuffer={pdfBuffer as any}
          handlePrint={handleDownloadForm}
          showZoom
          buttonLabelDownload={t('CONSOLIDATED_STATEMENT.DOWNLOAD_BUTTON')}
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

export default ConsolidatedStatement;
