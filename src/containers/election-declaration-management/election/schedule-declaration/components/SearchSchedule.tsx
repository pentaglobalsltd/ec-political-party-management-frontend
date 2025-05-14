import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Table } from '@pentabd/ui';

import { ElectionSearchProps } from '@type/search-types';
import { useElectionDetailsList } from '@hooks/election-schedule-management/election/election-schedule/useGetScheduleDeclarationList';

import { columns, header, searchStruct } from '../constants';
import { getParams } from '@utils';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { SearchComponents } from '@components/application-search/SearchComponents';

const SearchSchedule = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    electionDetailsList,
    loading,
    getElectionDetailsListData,
    activePage,
    totalPage,
  } = useElectionDetailsList();

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getElectionDetailsListData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitSearch = (data: ElectionSearchProps) => {
    getElectionDetailsListData({ searchItems: data });
  };

  // ------------------------------

  const {
    electionDetailsList: downloadElectionDetailsList,
    loading: downloadLoading,
    getElectionDetailsListData: downloadGetElectionDetailsListData,
  } = useElectionDetailsList();

  const onClickDownload = () => {
    downloadGetElectionDetailsListData({
      searchItems: params,
      size: MAX_ROW_SIZE,
    });
  };

  return (
    <div className="pb-10">
      <SearchComponents
        totalCol="grid-cols-lg-9"
        colSpan="col-span-4"
        struct={searchStruct}
        onSubmitHandler={onSubmitSearch}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        ]}
        isActiveElectionSchedule={false}
      />

      <Table
        headerExtension={{
          ...header,
        }}
        download={{
          fileName: 'election-declaration-list',
          columns: columns({
            t,
            getElectionDetailsListData,
            isDownload: true,
          }),
          rows: downloadElectionDetailsList || [],
          onClickDownload: onClickDownload,
          downloadLoading: downloadLoading,
        }}
        rows={electionDetailsList || []}
        columns={columns({ t, getElectionDetailsListData })}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page: number) => {
            getElectionDetailsListData({ searchItems: params, page: page - 1 });
            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
        loading={loading}
        loadingItemCount={10}
      />
    </div>
  );
};

export default SearchSchedule;
