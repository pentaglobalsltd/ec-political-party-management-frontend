import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Table, Header, DownloadButtons } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';

import { useGetTimeBasedResult } from '@hooks/result-management/report/time-based-result/useGetTimeBasedResult';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { allSelectedDataForAdmin, searchStruct } from './searchConstants';
import {
  timeBasedResultTableBreadcrumbs,
  timeBasedResultTableHeader,
  timeBasedResultTableColumns,
} from './constants';
import { getParams } from '@utils';

function TimeBasedResult() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { activePage, totalPage, loading, getTimeBasedResultList, resultList } =
    useGetTimeBasedResult();

  const {
    loading: downloadLoading,
    getTimeBasedResultList: downloadResultList,
    resultList: downloadedList,
  } = useGetTimeBasedResult();

  const onSubmitSearch = (data: any) => {
    getTimeBasedResultList({
      page: 0,
      electionScheduleId: data?.electionScheduleId,
      electionSettingsId: data?.electionSettingsId,
    });
    setSearchParams({
      ...data,
      page: '0',
    });
  };

  const getPaginatedResultList = (page: number) => {
    const { electionScheduleId, electionSettingsId } = params;

    if (electionScheduleId && electionSettingsId) {
      setSearchParams({
        ...params,
        page: (page - 1).toString(),
      });

      getTimeBasedResultList({
        page: page - 1,
        electionScheduleId: Number(electionScheduleId),
        electionSettingsId: Number(electionSettingsId),
      });
    }
  };

  const onClickDownload = () => {
    const { electionScheduleId, electionSettingsId } = params;

    if (electionScheduleId && electionSettingsId) {
      downloadResultList({
        electionScheduleId: Number(electionScheduleId),
        electionSettingsId: Number(electionSettingsId),
        size: MAX_ROW_SIZE,
      });
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('TIME_BASED_RESULT.TIME_BASED_RESULT'),
        }}
        breadcrumbs={timeBasedResultTableBreadcrumbs(t)}
      />

      <SearchComponents
        struct={searchStruct}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
        ]}
        onSubmitHandler={onSubmitSearch}
        getElectionSettingsIdForAdmin={true}
        allSelectedData={allSelectedDataForAdmin}
      />

      <Table
        headerExtension={{
          ...timeBasedResultTableHeader,
          rightComponents: [
            <DownloadButtons
              key={1}
              fileName="time-based-report"
              columns={timeBasedResultTableColumns({ t, isDownload: true })}
              rows={downloadedList}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={resultList}
        columns={timeBasedResultTableColumns({ t })}
        loading={loading}
        pagination={{
          language: 'bn',
          activePage: activePage,
          totalPage: totalPage,
          onClick: getPaginatedResultList,
        }}
      />
    </div>
  );
}

export default TimeBasedResult;
