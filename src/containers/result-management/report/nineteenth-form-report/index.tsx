import { useTranslation } from 'react-i18next';
import { Header, Text } from '@pentabd/ui';

import { PDFViewer } from '@containers/result-management/electoral-process/message-send-list-prepare/components';
import Loader from '@components/Loader';

import { nineteenthFormBreadcrumbs } from './constants';
import { useNineteenthFormPdfGenerator } from '@hooks/result-management/report/nineteenth-form/useNineteenthForm';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { allSelectedDataForAdmin, searchStruct } from './searchConstants';

const NineteenthFormReport = () => {
  const { t } = useTranslation();
  const { pdfBuffer, getBufferData, downloadNineteenthForm, error, loading } =
    useNineteenthFormPdfGenerator();

  const onSubmit = (data: any) => {
    const { electionScheduleId, candidateTypeId, constituencyId } = data;
    if (electionScheduleId && candidateTypeId && constituencyId)
      getBufferData(electionScheduleId, candidateTypeId, {
        constituencyId,
      });
  };

  const handleDownloadForm = async () => {
    downloadNineteenthForm();
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('NINETEENTH_FORM.NINETEENTH_FORM'),
        }}
        breadcrumbs={nineteenthFormBreadcrumbs(t)}
      />

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

      {loading ? <Loader position="align-items-start" /> : null}

      {pdfBuffer ? (
        <PDFViewer
          pdfBuffer={pdfBuffer as any}
          handlePrint={handleDownloadForm}
          showZoom
          buttonLabelDownload={t('NINETEENTH_FORM.DOWNLOAD_BUTTON')}
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

export default NineteenthFormReport;
