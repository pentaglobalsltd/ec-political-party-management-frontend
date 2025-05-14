import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import MainListSearch from '@components/application-search/MainListSearch';

import { ROUTES } from '@constants/routes';
import {
  municipalityTableBreadcrumbs,
  municipalityTableColumns,
} from './constants';
import { useGetMunicipalityList } from '@hooks/election-schedule-management/main-list/municipality/useGetMunicipalityList';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { getParams } from '@utils';

function Municipality() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { municipalities, loading, getMunicipalityList } =
    useGetMunicipalityList();

  // for download
  const {
    municipalities: downloadMunicipalities,
    loading: downloadLoading,
    getMunicipalityList: downloadGetMunicipalityList,
  } = useGetMunicipalityList();

  const onSubmitSearch = (data: any) => {
    getMunicipalityList({ municipalityIds: data.municipalityId });
  };

  const onClickDownload = () => {
    downloadGetMunicipalityList({
      size: MAX_ROW_SIZE,
      municipalityIds: params.municipalityId,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('MUNICIPALITY.MUNICIPALITY') }}
        breadcrumbs={municipalityTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_MUNICIPALITY)}
          >
            <IconPlus size="20" fill="light" /> {t('MUNICIPALITY.ADD_NEW')}
          </Button>,
        ]}
      />

      <MainListSearch
        totalCol="grid-cols-lg-10"
        colSpan="col-span-3"
        inputs={{
          region: true,
          district: true,
          municipality: true,
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
              fileName="municipality-list"
              columns={municipalityTableColumns({
                t,
                navigate,
                isDownload: true,
              })}
              rows={downloadMunicipalities}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={municipalities}
        columns={municipalityTableColumns({ t, navigate })}
        loading={loading}
        pagination={{ language: 'bn', totalPage: 1 }}
      />
    </div>
  );
}

export default Municipality;
