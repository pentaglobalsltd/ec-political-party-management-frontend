import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Header, Text } from '@pentabd/ui';

import Loader from '@components/Loader';
import { PDFViewer } from '@containers/result-management/electoral-process/message-send-list-prepare/components';

import { useElectionResultPdfGenerator } from '@hooks/result-management/report/election-result/useElectionResult';
import { BUTTON_TYPE } from '@constants/result-management/report';
import {
  electionResultBreadcrumbs,
  reportOptionsDetailed,
  reportOptionsShort,
  requiredFields,
} from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { allSelectedDataForAdmin, searchStruct } from './searchConstants';

const ElectionResult = () => {
  const { t } = useTranslation();
  const { pdfBuffer, getBufferData, downloadElectionResult, error, loading } =
    useElectionResultPdfGenerator();

  const [buttonType, setButtonType] = useState<string>('');

  const onSubmit = (data: any) => {
    const {
      electionScheduleId,
      candidateTypeId,
      resultType,
      reportType,
      buttonType,
    } = data;

    if (
      electionScheduleId &&
      candidateTypeId &&
      resultType &&
      reportType &&
      !loading
    ) {
      getBufferData(electionScheduleId, candidateTypeId, {
        resultType,
        reportType,
      });
    }
    if (buttonType === BUTTON_TYPE.DOWNLOAD) {
      setButtonType(BUTTON_TYPE.DOWNLOAD);
    } else {
      setButtonType('');
    }
  };

  const handleDownloadForm = async () => {
    downloadElectionResult();
  };

  useEffect(() => {
    if (pdfBuffer && buttonType === BUTTON_TYPE.DOWNLOAD) {
      handleDownloadForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfBuffer]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('ELECTION_RESULT.ELECTION_RESULT'),
        }}
        breadcrumbs={electionResultBreadcrumbs(t)}
      />

      <SearchComponents
        totalCol="grid-cols-lg-6"
        colSpan="col-span-2"
        struct={searchStruct}
        requiredField={requiredFields}
        loading={loading}
        onSubmitHandler={onSubmit}
        isSetSearchParams={false}
        allSelectedData={allSelectedDataForAdmin}
        showSubmitButton={false}
        isDetailedButton
        isBriefButton
        isBriefButtonOptions={reportOptionsShort(t)}
        isDetailedButtonOptions={reportOptionsDetailed(t)}
      />

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

export default ElectionResult;
