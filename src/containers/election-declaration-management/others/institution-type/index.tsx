import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import { TableBreadcrumbs, Columns } from './constants';
import { useGetInstituteTypeList } from '@hooks/election-schedule-management/other/institute-type/useGetInstituteTypeList';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';

const InstitutionType = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { instituteTypes, getInstituteTypeList, loading } =
    useGetInstituteTypeList();

  // for download
  const {
    instituteTypes: downloadInstituteTypes,
    getInstituteTypeList: downloadGetInstituteTypeList,
    loading: downloadLoading,
  } = useGetInstituteTypeList();

  useEffect(() => {
    getInstituteTypeList({ page: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDownload = () => {
    downloadGetInstituteTypeList({
      size: MAX_ROW_SIZE,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('INSTITUTION_BUILDING_TYPE.INSTITUTION_BUILDING_TYPE'),
        }}
        breadcrumbs={TableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_INSTITUTE_TYPE)}
          >
            <IconPlus size="20" fill="light" />{' '}
            {t('INSTITUTION_BUILDING_TYPE.ADD_NEW')}
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
              fileName="institution-list"
              columns={Columns({
                t,
                isDownload: true,
                navigate,
              })}
              rows={downloadInstituteTypes}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={instituteTypes}
        columns={Columns({ t, navigate })}
        loading={loading}
        pagination={{ language: 'bn', totalPage: 1 }}
      />
    </div>
  );
};

export default InstitutionType;
