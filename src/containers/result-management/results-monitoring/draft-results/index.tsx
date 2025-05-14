import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { IconSearch } from '@pentabd/icons';
import { Table, Header, Text, InputText, DownloadButtons } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';

import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { allSelectedData, searchStruct } from './searchConstants';
import {
  draftResultsTableBreadcrumbs,
  draftResultsTableColumns,
} from './constants';
import useDraftResult from '@hooks/result-management/result-monitoring/draft-result/useDraftResult';
import { getParams } from '@utils';

function DraftResults() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { draftResults, getDraftResultData, loading, activePage, totalPage } =
    useDraftResult();

  const {
    draftResults: downloadableDraftResults,
    getDraftResultData: downloadDraftResultData,
    loading: downloadLoading,
  } = useDraftResult();

  const handleSubmit = (data: any) => {
    const electionScheduleId = data?.electionScheduleId;
    const settingsId = data?.electionSettingsId;
    const queryParams = {
      resultStatusEnums: data?.status,
    };
    // resultStatusEnums
    getDraftResultData({ electionScheduleId, settingsId, queryParams });
  };

  const getPaginatedDraftResults = (page: number) => {
    const { electionScheduleId, electionSettingsId } = params;

    setSearchParams({
      page: (page - 1).toString(),
      ...params,
    });

    getDraftResultData({
      page: page - 1,
      ...params,
      electionScheduleId,
      settingsId: electionSettingsId,
    });
  };

  //for download table
  const onClickDownload = () => {
    if (Object.keys(params).length > 0) {
      const { electionScheduleId, electionSettingsId, status } = params;

      if (electionScheduleId && electionSettingsId && status) {
        downloadDraftResultData({
          ...params,
          electionScheduleId,
          settingsId: electionSettingsId,
          size: MAX_ROW_SIZE,
          queryParams: {
            resultStatusEnums: status,
          },
        });
      }
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('DRAFT_RESULTS.DRAFT_RESULTS'),
        }}
        breadcrumbs={draftResultsTableBreadcrumbs(t)}
      />

      <SearchComponents
        allSelectedData={allSelectedData}
        struct={searchStruct}
        onSubmitHandler={handleSubmit}
        getElectionSettingsIdForAdmin={true}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
          SEARCH_FIELD_REQUIRED.STATUS,
        ]}
      />

      <div className="mb-12">
        <Text size="md" weight="bold">
          {t('DRAFT_RESULTS.VOTING_STATUS')}
        </Text>
      </div>

      <Table
        headerExtension={{
          leftComponents: [
            <InputText
              key={1}
              name="pre-input"
              outline
              placeholder="Search"
              prefix={<IconSearch size="20" />}
              size="md"
              type="text"
              status="default"
            />,
          ],
          rightComponents: [
            <DownloadButtons
              key={2}
              fileName="draft-results-list"
              columns={draftResultsTableColumns({ t, isDownload: true })}
              rows={downloadableDraftResults}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        columns={draftResultsTableColumns({ t })}
        rows={draftResults}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: getPaginatedDraftResults,
        }}
        loading={loading}
        loadingItemCount={4}
      />
    </div>
  );
}

export default DraftResults;
