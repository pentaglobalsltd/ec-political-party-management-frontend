import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import MainListSearch from '@components/application-search/MainListSearch';

import { ROUTES } from '@constants/routes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { districtTableColumns, districtTableBreadcrumbs } from './constants';
import { useGetDistrictList } from '@hooks/election-schedule-management/main-list/district/useGetDistrictList';
import { getParams } from '@utils';

function District() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { districts, loading, getDistrictList } = useGetDistrictList();

  // for download
  const {
    districts: downloadDistricts,
    loading: downloadLoading,
    getDistrictList: downloadGetDistrictList,
  } = useGetDistrictList();

  const onSubmitSearch = (data: any) => {
    if (data.zillaId) {
      getDistrictList({ zillaIds: data.zillaId });
    }
  };

  const onClickDownload = () => {
    downloadGetDistrictList({
      size: MAX_ROW_SIZE,
      zillaIds: params.zillaId,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('DISTRICT.DISTRICT') }}
        breadcrumbs={districtTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_DISTRICT)}
          >
            <IconPlus size="20" fill="light" /> {t('DISTRICT.ADD_NEW')}
          </Button>,
        ]}
      />

      <MainListSearch
        totalCol="grid-cols-lg-9"
        colSpan="col-span-4"
        inputs={{
          region: true,
          district: true,
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
              fileName="district-list"
              columns={districtTableColumns({ t, navigate, isDownload: true })}
              rows={downloadDistricts}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={districts}
        columns={districtTableColumns({ t, navigate })}
        loading={loading}
        pagination={{ language: 'bn', totalPage: 1 }}
      />
    </div>
  );
}

export default District;
