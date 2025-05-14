import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Header, Table } from '@pentabd/ui';

import { getBreadcrumbs, getColumns } from './components/TableView';
import { ElectionSettingsSearchProps } from '@type/election-declaration-management/election/election-settings/election-settings-types';
import { getParams } from '@utils';
import { searchStruct } from './searchConstants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { useGetElectionSettingsDetails } from '@hooks/election-schedule-management/election-process/data-provider-info/add-schedule-info/useGetElectionSettingsDetails';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

const AddScheduleInfo = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    electionSettingsDetails,
    getElectionSettingsDetailsData,
    loading,
    activePage,
    totalPage,
  } = useGetElectionSettingsDetails();

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getElectionSettingsDetailsData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitSearch = (data: ElectionSettingsSearchProps) => {
    getElectionSettingsDetailsData({ page: 0, searchItems: data });
  };

  return (
    <div className="container-96 mb-24">
      <Header breadcrumbs={getBreadcrumbs(t)} className="mb-10 pt-10" />

      <Header
        className=""
        headerText={{
          header: t('ADD_SCHEDULE_INFO.SECTION_HEADER.SCHEDULE_INFO_ADD'),
        }}
      />

      <SearchComponents
        struct={searchStruct}
        onSubmitHandler={onSubmitSearch}
        getElectionSettingsIdForAdmin
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
          SEARCH_FIELD_REQUIRED.ZILLA_ID,
          SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
        ]}
      />
      
      <div className="my-10">
        <Table
          columns={getColumns({ t })}
          rows={electionSettingsDetails}
          loading={loading}
          loadingItemCount={10}
          pagination={{
            language: 'bn',
            totalPage: totalPage,
            activePage: activePage,
            onClick: (page: number) => {
              getElectionSettingsDetailsData({
                searchItems: params,
                page: page - 1,
              });
              setSearchParams({ ...params, page: (page - 1).toString() });
            },
          }}
        />
      </div>
    </div>
  );
};

export default AddScheduleInfo;
