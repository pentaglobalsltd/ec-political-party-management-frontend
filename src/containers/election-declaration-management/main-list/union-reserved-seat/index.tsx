import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header, Button, Table, DownloadButtons } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';
import {
  unionReservedSeatBreadcrumbs,
  unionReservedSeatTableColumns,
  unionReservedSeatTableHeader,
} from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { allSelectedData, searchStruct } from './search-constants';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import useGetReserveUnionWardList from '@hooks/election-schedule-management/main-list/union-reserved-seat/useGetReserveUnionWardList';
import { getParams } from '@utils';

const UnionReservedSeats = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    reserveUnionWardList,
    getReserveUnionWardList,
    activePage,
    loading,
    totalPage,
  } = useGetReserveUnionWardList();

  const onSubmitSearch = (data: any) => {
    getReserveUnionWardList({
      upazilaId: data?.[SEARCH_FIELD_REQUIRED.UPAZILA_ID],
      unionId: data?.[SEARCH_FIELD_REQUIRED.UNION_OR_WARD],
    });

    // setSearchParams({ ...params, ...rest });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getReserveUnionWardList({
        ...params,
        unionId: Number(params?.[SEARCH_FIELD_REQUIRED.UNION_OR_WARD]),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDownload = () => {};

  return (
    <div className="container-96 mb-24">
      <div className="mb-10 pt-10">
        <Header
          headerText={{
            header: t('UNION_RESERVED_SEAT.SECTION_HEADER'),
          }}
          breadcrumbs={unionReservedSeatBreadcrumbs(t)}
          actions={[
            <Button
              key={1}
              type="primary"
              htmlType="button"
              onClick={() => navigate(ROUTES.ADD_UNION_WARD)}
            >
              <IconPlus size="20" fill="light" />{' '}
              {t('UNION_RESERVED_SEAT.ADD_NEW_UNION_RESERVED_SEAT')}
            </Button>,
          ]}
        />
      </div>

      <SearchComponents
        struct={searchStruct}
        onSubmitHandler={onSubmitSearch}
        requiredField={[
          SEARCH_FIELD_REQUIRED.REGION_ID,
          SEARCH_FIELD_REQUIRED.ZILLA_ID,
          SEARCH_FIELD_REQUIRED.UPAZILA_ID,
          // SEARCH_FIELD_REQUIRED.UNION_OR_WARD,
        ]}
        allSelectedData={allSelectedData}
      />

      <Table
        headerExtension={{
          ...unionReservedSeatTableHeader,
          rightComponents: [
            <DownloadButtons
              key={2}
              fileName="union-reserved-seat-list"
              rows={reserveUnionWardList}
              columns={unionReservedSeatTableColumns({
                t,
                getReserveUnionWardList,
              })}
              downloadLoading={false}
              onClickDownload={onClickDownload}
            />,
          ],
        }}
        rows={reserveUnionWardList}
        columns={unionReservedSeatTableColumns({ t, getReserveUnionWardList })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage,
          activePage,
          onClick: (page: number) => {
            getReserveUnionWardList({
              ...params,
              unionId: Number(params?.[SEARCH_FIELD_REQUIRED.UNION_OR_WARD]),
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

export default UnionReservedSeats;
