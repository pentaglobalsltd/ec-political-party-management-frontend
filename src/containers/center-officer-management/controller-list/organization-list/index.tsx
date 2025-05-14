import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Header, Table } from '@pentabd/ui';

import CreateButton from './components/CreateButton';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { TableDownload } from './components/TableDownload';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useAgencyList } from '@hooks/center-officer-management/controller-list/organization-list/useGetAgencyList';

import { requiredFieldsAdmin, searchStruct } from './searchConstants';
import {
  organizationListBreadcrumbs,
  organizationListTableColumns,
  organizationListTableHeader,
} from './constants';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { getParams } from '@utils';

const OrganizationList = () => {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchItems, setSearchItems] = useState({});
  const params = getParams(searchParams);

  const { agencyList, getAgencyListData, loading, activePage, totalPage } =
    useAgencyList();

  const onSubmitSearch = (data: CenterOfficerManagementSearchProps) => {
    const { regionId, ...filteredSearchItems } = data;
    getAgencyListData({ searchItems: filteredSearchItems });
    setSearchItems(filteredSearchItems);
  };

  const onClickPagination = (page: number) => {
    getAgencyListData({
      page: page - 1,
      searchItems: { ...searchItems, ...params },
    });
    setSearchParams({ ...params, page: (page - 1).toString() });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      const { regionId, ...filteredSearchItems } = params;
      getAgencyListData({ searchItems: filteredSearchItems });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container-96 mb-24">
        <Header
          headerText={{
            header: t('ORGANIZATION_LIST.ORGANIZATION_LIST_NAME_ADDRESS'),
          }}
          actions={[<CreateButton />]}
          breadcrumbs={organizationListBreadcrumbs(t)}
          className="mb-10 pt-10"
        />

        {userType ? (
          <SearchComponents
            title="ORGANIZATION_LIST.ADVANCED_SEARCH"
            struct={searchStruct}
            requiredField={requiredFieldsAdmin}
            onSubmitHandler={onSubmitSearch}
          />
        ) : null}

        <Table
          headerExtension={organizationListTableHeader({ getAgencyListData })}
          download={TableDownload({ getAgencyListData })}
          rows={agencyList}
          columns={organizationListTableColumns({
            t,
            getAgencyListData,
          })}
          pagination={{
            language: 'bn',
            totalPage: totalPage,
            activePage: activePage,
            onClick: (page: number) => onClickPagination(page),
          }}
          loading={loading}
          loadingItemCount={3}
        />
      </div>
    </>
  );
};
export default OrganizationList;
