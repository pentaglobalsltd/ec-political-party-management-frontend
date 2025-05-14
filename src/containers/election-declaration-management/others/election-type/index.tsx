import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IconPlus, IconSearch } from '@pentabd/icons';
import { Button, DownloadButtons, Header, InputText, Table } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  electionTypeTableColumns,
  electionTypeTableBreadcrumbs,
} from './constants';

import { useGetElectionTypeList } from '@hooks/election-schedule-management/other/election-type/useGetElectionTypeList';

function ElectionType() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { electionTypes, getElectionTypeList, loading } =
    useGetElectionTypeList();

  // for download
  const {
    electionTypes: downloadElectionTypes,
    getElectionTypeList: downloadGetElectionTypeList,
    loading: downloadLoading,
  } = useGetElectionTypeList();

  useEffect(() => {
    getElectionTypeList({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDownload = () => {
    downloadGetElectionTypeList({
      size: MAX_ROW_SIZE,
    });
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('ELECTION_TYPE.ELECTION_TYPE') }}
        breadcrumbs={electionTypeTableBreadcrumbs(t)}
        actions={[
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_ELECTION_TYPE)}
          >
            <IconPlus size="20" fill="light" /> {t('ELECTION_TYPE.ADD_NEW')}
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
              fileName="election-type-list"
              columns={electionTypeTableColumns({
                t,
                navigate,
                isDownload: true,
              })}
              rows={downloadElectionTypes}
              onClickDownload={onClickDownload}
              downloadLoading={downloadLoading}
            />,
          ],
        }}
        rows={electionTypes}
        columns={electionTypeTableColumns({ t, navigate })}
        loading={loading}
        pagination={{ language: 'bn', totalPage: 1 }}
      />
    </div>
  );
}

export default ElectionType;
