import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import MainListSearch from '@components/application-search/MainListSearch';

import { ROUTES } from '@constants/routes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { divisionTableBreadcrumbs, divisionTableColumns } from './constants';
import { useGetRegionList } from '@hooks/election-schedule-management/main-list/region/useGetRegionList';
import { getParams } from '@utils';

function Division() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { regions, loading, getRegionList } = useGetRegionList();

  // for download
  const {
    regions: downloadRegions,
    loading: downloadLoading,
    getRegionList: downloadGetRegionList,
  } = useGetRegionList();

  const onSubmitSearch = (data: any) => {
    getRegionList({ regionIds: data.regionId });
  };

  const onClickDownload = () => {
    downloadGetRegionList({
      size: MAX_ROW_SIZE,
      regionIds: params?.regionId,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('DIVISION.DIVISION') }}
        breadcrumbs={divisionTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_DIVISION)}
          >
            <IconPlus size="20" fill="light" /> {t('DIVISION.ADD_NEW')}
          </Button>,
        ]}
      />

      <MainListSearch
        totalCol="grid-cols-lg-9"
        colSpan="col-span-4"
        inputs={{
          region: true,
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
              fileName="division-list"
              columns={divisionTableColumns({ t, isDownload: true, navigate })}
              rows={downloadRegions}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={regions}
        columns={divisionTableColumns({ t, navigate })}
        loading={loading}
        pagination={{ language: 'bn', totalPage: 1 }}
      />
    </div>
  );
}

export default Division;
