import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { DownloadButtons, Header, Table } from '@pentabd/ui';

import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  centerListBreadcrumbs,
  centerListTableColumns,
  centerListTableHeader,
} from './constants';

import { useGetPollingCenterListForARO } from '@hooks/result-management/electoral-process/polling-center-list/useGetPollingCenterListForARO';
import { getParams } from '@utils';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { ELECTION_INFO } from '@constants/election-info';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { searchStruct } from './searchConstants';

const CenterList = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    electionSettings,
    electionTypes,
    electionSchedules,
    zillas,
    upazilas,
  } = useFiltersRedux();

  const {
    activePage,
    totalPage,
    loading,
    pollingCenterList,
    getPollingCenterList,
  } = useGetPollingCenterListForARO();

  const {
    loading: downloadLoading,
    pollingCenterList: downloadedList,
    getPollingCenterList: downloadList,
  } = useGetPollingCenterListForARO();

  const isUnionElection =
    electionTypes?.[0]?.value === ELECTION_INFO.UNION_PARISHAD.ID;

  const electionScheduleId = electionSchedules?.[0]?.value;
  const zillaId = zillas?.[0]?.value;
  const upazilaId = upazilas?.[0]?.value;

  useEffect(() => {
    if (electionSettings && electionSettings.length > 0 && !isUnionElection) {
      let electionSettingsIdsString: string;

      electionSettingsIdsString = electionSettings
        ?.map((item) => item.value)
        .join(',');
      setSearchParams({
        electionSettingsIds: electionSettingsIdsString,
        page: '0',
      });
      getPollingCenterList({
        page: 0,
        size: 10,
        electionSettingsIds: electionSettingsIdsString,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettings]);

  const getPaginatedInstitutes = (page: number) => {
    setSearchParams({
      ...params,
      page: (page - 1).toString(),
    });

    getPollingCenterList({
      page: page - 1,
      electionSettingsIds: params?.electionSettingsIds,
    });
  };

  const handleDownloadList = () => {
    if (params?.electionSettingsIds) {
      downloadList({
        electionSettingsIds: params?.electionSettingsIds,
        size: MAX_ROW_SIZE,
      });
    }
  };

  const handleSubmit = (data: any) => {
    getPollingCenterList(data);
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('CENTER_LIST.CENTER_LIST') }}
        breadcrumbs={centerListBreadcrumbs(t)}
      />
      {isUnionElection ? (
        <SearchComponents
          struct={searchStruct({ electionScheduleId, zillaId, upazilaId })}
          onSubmitHandler={handleSubmit}
        />
      ) : null}

      <Table
        headerExtension={{
          ...centerListTableHeader,
          rightComponents: [
            <DownloadButtons
              key={1}
              fileName={'vote-center-list'}
              columns={centerListTableColumns({ t, isDownload: true })}
              rows={downloadedList}
              onClickDownload={handleDownloadList}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={pollingCenterList}
        columns={centerListTableColumns({ t })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: getPaginatedInstitutes,
        }}
      />
    </div>
  );
};

export default CenterList;
