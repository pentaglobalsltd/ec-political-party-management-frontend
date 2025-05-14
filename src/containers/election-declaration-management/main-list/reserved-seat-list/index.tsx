import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Button,
  DownloadButtons,
  Header,
  InputText,
  Modal,
  Table,
} from '@pentabd/ui';
import { IconPlus, IconSearch } from '@pentabd/icons';

import { useGetReservedWardList } from '@hooks/election-schedule-management/main-list/reserved-ward/useGetReservedWardList';
import { ROUTES } from '@constants/routes';
import {
  reservedSeatListTableBreadcrumbs,
  reservedSeatListTableColumns,
} from './constants';
import DeleteModal from './components/DeleteModal';
import { getParams } from '@utils';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { searchStruct } from './searchStruct';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

function ReservedSeatList() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    getReservedWardList,
    reservedWardList,
    loading,
    activePage,
    totalPage,
  } = useGetReservedWardList();

  // for download
  const {
    getReservedWardList: downloadGetReservedWardList,
    reservedWardList: downloadReservedWardList,
    loading: downloadLoading,
  } = useGetReservedWardList();

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onSubmitSearch = (data: any) => {
    getReservedWardList({
      page: 0,
      ...(data?.municipalityId && { municipalityId: data.municipalityId }),
    });

    setSearchParams({
      ...data,
      page: '0',
    });
  };

  const getPaginatedWardList = (page: number) => {
    const { municipalityId } = params;

    setSearchParams({
      ...params,
      page: (page - 1).toString(),
    });

    getReservedWardList({
      page: page - 1,
      ...(municipalityId && { municipalityId: Number(municipalityId) }),
    });
  };

  useEffect(() => {
    if (params?.municipalityId) {
      getReservedWardList({
        page: Number(params?.page),
        ...(params?.municipalityId && {
          municipalityId: Number(params?.municipalityId),
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.municipalityId]);

  const onClickDownload = () => {
    downloadGetReservedWardList({
      page: 0,
      size: MAX_ROW_SIZE,
      municipalityId: Number(params?.municipalityId),
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('RESERVED_SEAT_LIST.RESERVED_SEAT_LIST') }}
        breadcrumbs={reservedSeatListTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_RESERVED_SEAT_LIST)}
          >
            <IconPlus size="20" fill="light" />
            {t('RESERVED_SEAT_LIST.ADD_NEW')}
          </Button>,
        ]}
      />

      <SearchComponents
        struct={searchStruct}
        totalCol="grid-cols-lg-10"
        colSpan="col-span-3"
        requiredField={[
          SEARCH_FIELD_REQUIRED.REGION_ID,
          SEARCH_FIELD_REQUIRED.ZILLA_ID,
          SEARCH_FIELD_REQUIRED.MUNICIPALITY,
        ]}
        onSubmitHandler={onSubmitSearch}
      />
      <Table
        headerExtension={{
          leftComponents: [
            <InputText
              key={2}
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
              key={3}
              fileName="reserved-ward-list"
              columns={reservedSeatListTableColumns({
                t,
                navigate,
                isDownload: true,
              })}
              rows={downloadReservedWardList}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={reservedWardList}
        columns={reservedSeatListTableColumns({ t, navigate })}
        loading={loading}
        pagination={{
          language: 'bn',
          activePage: activePage,
          totalPage: totalPage,
          onClick: (page: number) => {
            getPaginatedWardList(page);
          },
        }}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        closeAble
        overlay
        onClose={closeDeleteModal}
      >
        <DeleteModal closeDeleteModal={closeDeleteModal} />
      </Modal>
    </div>
  );
}

export default ReservedSeatList;
