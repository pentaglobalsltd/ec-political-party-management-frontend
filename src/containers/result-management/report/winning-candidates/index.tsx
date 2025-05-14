import { useTranslation } from 'react-i18next';
import { Header, Text } from '@pentabd/ui';

import { PDFViewer } from '@containers/result-management/electoral-process/message-send-list-prepare/components';
import { SearchComponents } from '@components/application-search/SearchComponents';
import Loader from '@components/Loader';

import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useWinningCandidatesPdfGenerator } from '@hooks/result-management/report/winning-candidates/useWinningCandidates';
import {
  allSelectedDataForAdmin,
  conditionalRequiredField,
  searchStruct,
  searchStructElectionUser,
} from './searchConstants';
import { winningCandidatesBreadcrumbs } from './constants';

const WinningCandidatesReport = () => {
  const { t } = useTranslation();
  const { isAdmin } = useFiltersRedux();

  const {
    pdfBuffer,
    getBufferData,
    downloadWinningCandidates,
    error,
    loading,
  } = useWinningCandidatesPdfGenerator();

  const onSubmit = (data: any) => {
    const {
      electionTypeId,
      electionScheduleId,
      municipalityId,
      upazilaId,
      unionOrWardId,
    } = data;

    getBufferData({
      electionTypeId,
      electionScheduleId,
      queryParams: {
        municipalityId,
        upazilaId,
        unionOrWardId,
      },
    });
  };

  const handleDownloadForm = async () => {
    downloadWinningCandidates();
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('WINNING_CANDIDATES.WINNING_CANDIDATES'),
        }}
        breadcrumbs={winningCandidatesBreadcrumbs(t)}
      />

      {/** TODO: ask Nazia
       * eikhane to search er 'requiredFields' dei nai,
       * to kivabe upazila nadewa porjonto, 'search' btn disable ase ?
       *  */}
      {isAdmin ? (
        <SearchComponents
          struct={searchStruct}
          conditionalRequiredField={conditionalRequiredField}
          onSubmitHandler={onSubmit}
          allSelectedData={allSelectedDataForAdmin}
        />
      ) : (
        <SearchComponents
          struct={searchStructElectionUser}
          conditionalRequiredField={conditionalRequiredField}
          onSubmitHandler={onSubmit}
          getElectionSettingsIdForAdmin={true}
          allSelectedData={allSelectedDataForAdmin}
        />
      )}

      {loading ? <Loader position="align-items-start" /> : null}

      {pdfBuffer ? (
        <PDFViewer
          pdfBuffer={pdfBuffer as any}
          handlePrint={handleDownloadForm}
          showZoom
          buttonLabelDownload={t('WINNING_CANDIDATES.DOWNLOAD_BUTTON')}
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

export default WinningCandidatesReport;
