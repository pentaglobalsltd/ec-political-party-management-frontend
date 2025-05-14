import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Table } from '@pentabd/ui';

import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { officerListBreadcrumbs, officerListTableColumns } from './constants';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useGetOfficerList } from '@hooks/center-officer-management/controller-list/officer-list/useGetOfficerList';
import { getParams } from '@utils';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { searchStruct } from './searchConstants';
import CommonTableSearchInput from '@components/CommonTableSearchInput';
import CreateButton from './components/CreateButton';

const TABLE_SEARCH_KEY: string = 'nameNidPhoneParameter';

const OfficerList = () => {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { officers, getOfficers, loading, activePage, totalPage } =
    useGetOfficerList();

  // for download
  const {
    officers: downloadOfficers,
    getOfficers: downloadGetOfficers,
    loading: downloadLoading,
  } = useGetOfficerList();

  const onSubmitSearch = (data: any) => {
    if (userType) {
      getOfficers({ searchItems: data, page: 0 });
    }
  };

  const onClickDownload = () => {
    downloadGetOfficers({ size: MAX_ROW_SIZE, searchItems: { ...params } });
  };

  const onClickPagination = (page: number) => {
    if (userType) {
      getOfficers({
        page: page - 1,
        searchItems: params,
      });
    }

    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0 && params?.zillaId) {
      getOfficers({ searchItems: params, page: Number(params?.page) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('OFFICER_LIST.OFFICER_LIST') }}
        breadcrumbs={officerListBreadcrumbs(t)}
        actions={[<CreateButton />]}
        className="mb-10 pt-10"
      />
      {userType ? (
        <SearchComponents
          title="ORGANIZATION_LIST.ADVANCED_SEARCH"
          struct={searchStruct}
          onSubmitHandler={onSubmitSearch}
          requiredField={[SEARCH_FIELD_REQUIRED.ZILLA_ID]}
        />
      ) : null}
      <Table
        headerExtension={{
          leftComponents: [
            <CommonTableSearchInput
              key={1}
              callback={getOfficers as any}
              tableSearchKey={TABLE_SEARCH_KEY}
              isSearchAlwaysEnable
            />,
          ],
        }}
        download={{
          fileName: 'officers-list',
          columns: officerListTableColumns({
            t,
            isDownload: true,
            getOfficers,
          }),
          rows: downloadOfficers,
          onClickDownload: onClickDownload,
          downloadLoading: downloadLoading,
        }}
        rows={officers}
        columns={officerListTableColumns({
          t,
          getOfficers,
        })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page) => onClickPagination(page),
        }}
      />
    </div>
  );
};

export default OfficerList;
