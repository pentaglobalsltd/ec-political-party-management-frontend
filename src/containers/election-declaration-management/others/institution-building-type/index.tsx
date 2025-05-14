import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Header, Button, Table, InputText, DownloadButtons } from '@pentabd/ui';

import { useGetBuildingTypeList } from '@hooks/election-schedule-management/other/building-type/useGetBuildingTypeList';

import { ROUTES } from '@constants/routes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { TableBreadcrumbs, Columns } from './constants';

const InstitutionBuildingType = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    buildingTypeList,
    getBuildingTypeList,
    loading,
    activePage,
    totalPage,
  } = useGetBuildingTypeList();

  // for download
  const {
    buildingTypeList: downloadBuildingTypeList,
    getBuildingTypeList: downloadGetBuildingTypeList,
    loading: downloadLoading,
  } = useGetBuildingTypeList();

  useEffect(() => {
    getBuildingTypeList({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDownload = () => {
    downloadGetBuildingTypeList({
      size: MAX_ROW_SIZE,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('INSTITUTION_TYPE.INSTITUTION_TYPE') }}
        breadcrumbs={TableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_INSTITUTION_BUILDING_TYPE)}
          >
            <IconPlus size="20" fill="light" /> {t('INSTITUTION_TYPE.ADD_NEW')}
          </Button>,
        ]}
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
              fileName="institution-building-type-list"
              columns={Columns({ t, isDownload: true, navigate })}
              rows={downloadBuildingTypeList}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={buildingTypeList}
        columns={Columns({ t, navigate })}
        loading={loading}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page) => {
            getBuildingTypeList({
              page: page - 1,
            });
          },
        }}
      />
    </div>
  );
};

export default InstitutionBuildingType;
