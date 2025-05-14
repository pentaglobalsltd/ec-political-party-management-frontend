import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import MainListSearch from '@components/application-search/MainListSearch';

import { ROUTES } from '@constants/routes';
import {
  parliamentarySeatTableBreadcrumbs,
  parliamentarySeatTableColumns,
} from './constants';
import { useGetConstituencyList } from '@hooks/election-schedule-management/main-list/constituency/useGetConstituencyList';
import { getParams } from '@utils';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';

function ParliamentarySeat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    constituencies,
    loading,
    activePage,
    totalPage,
    getConstituencyList,
  } = useGetConstituencyList();

  // for download
  const {
    getConstituencyList: downloadGetConstituencyList,
    constituencies: downloadConstituencies,
    loading: downloadLoading,
  } = useGetConstituencyList();

  const onSubmitSearch = (data: any) => {
    getConstituencyList({ constituencyId: data.constituencyId });
  };

  const onClickDownload = () => {
    downloadGetConstituencyList({
      size: MAX_ROW_SIZE,
      constituencyId: Number(params?.constituencyId),
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('PARLIAMENTARY_SEAT.PARLIAMENTARY_SEAT') }}
        breadcrumbs={parliamentarySeatTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_PARLIAMENTARY_SEAT)}
          >
            <IconPlus size="20" fill="light" />{' '}
            {t('PARLIAMENTARY_SEAT.ADD_NEW')}
          </Button>,
        ]}
      />

      <MainListSearch
        totalCol="grid-cols-lg-10"
        colSpan="col-span-3"
        inputs={{
          region: true,
          district: true,
          constituency: true,
        }}
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
              fileName="parliamentary-seat-list"
              columns={parliamentarySeatTableColumns({
                t,
                navigate,
                isDownload: true,
              })}
              rows={downloadConstituencies}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={constituencies}
        columns={parliamentarySeatTableColumns({ t, navigate })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page) => {
            const { constituencyId } = params;
            if (constituencyId) {
              getConstituencyList({
                page: page - 1,
                constituencyId: Number(constituencyId),
              });
              setSearchParams({
                page: (page - 1).toString(),
                constituencyId: constituencyId,
              });
            }
          },
        }}
      />
    </div>
  );
}

export default ParliamentarySeat;
