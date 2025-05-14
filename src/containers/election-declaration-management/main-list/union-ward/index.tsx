import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, DownloadButtons, Header, Table } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';
import {
  allSelectedData,
  searchStruct,
  unionWardBreadcrumbs,
  unionWardTableColumns,
} from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { useGetUnionWardList } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionsWardsList';
import { getParams } from '@utils';
import CommonTableSearchInput from '@components/CommonTableSearchInput';

const UnionWard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    unionsWardsList,
    loading,
    activePage,
    totalPage,
    getUnionsWardsList,
  } = useGetUnionWardList();

  const onSubmitSearch = (data: any) => {
    getUnionsWardsList({ ...data });
  };

  const onClickDownload = () => {};

  const handleTableSearch = (data: any) => {
    getUnionsWardsList({ ...params, nameBn: data?.searchItems?.nameBn });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0) getUnionsWardsList({ ...params });
  }, []);

  return (
    <div className="container-96 mb-24">
      <div className="mb-10 pt-10">
        <Header
          headerText={{
            header: t('UNION_WARD.SECTION_HEADER'),
          }}
          breadcrumbs={unionWardBreadcrumbs(t)}
          actions={[
            <Button
              key={1}
              type="primary"
              htmlType="button"
              onClick={() => navigate(ROUTES.ADD_UNION_WARD)}
            >
              <IconPlus size="20" fill="light" />{' '}
              {t('UNION_WARD.ADD_NEW_UNION_WARD')}
            </Button>,
          ]}
        />
      </div>

      <SearchComponents
        struct={searchStruct}
        onSubmitHandler={onSubmitSearch}
        requiredField={[SEARCH_FIELD_REQUIRED.UPAZILA_ID]}
        allSelectedData={allSelectedData}
      />

      <Table
        headerExtension={{
          leftComponents: [
            <CommonTableSearchInput
              key={5}
              callback={handleTableSearch}
              tableSearchKey={'nameBn'}
            />,
          ],
          rightComponents: [
            <DownloadButtons
              key={2}
              fileName="union-ward-list"
              rows={unionsWardsList}
              columns={unionWardTableColumns({ getUnionsWardsList })}
              onClickDownload={onClickDownload}
              downloadLoading={false}
            />,
          ],
        }}
        rows={unionsWardsList}
        columns={unionWardTableColumns({ getUnionsWardsList })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page: number) => {
            getUnionsWardsList({
              ...params,
              page: page - 1,
              size: 10,
            });

            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
      />
    </div>
  );
};

export default UnionWard;
