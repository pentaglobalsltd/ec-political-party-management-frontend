import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DownloadButtons, Header, Table, Text } from '@pentabd/ui';

import {
  electionTransferBreadcrumbs,
  electionTransferTableColumns,
  electionTransferTableHeader,
  searchStruct,
} from './constants';
import { SearchComponents } from '@components/application-search/SearchComponents';
import useElectionSettings from '@hooks/election-schedule-management/election/election-settings/useElectionSettingsAggregated';
import { ElectionSettingsSearchProps } from '@type/election-declaration-management/election/election-settings/election-settings-types';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '@utils';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { Actions } from './components/Actions';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { ELECTION_SCHEDULE_DECLARATION } from '@constants/permissions/election-schedule-declaration';

const ElectionTransfer = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const [electionSettingsIds, setElectionSettingsIds] = useState([]);

  const {
    electionSettingsList,
    getElectionSettingsData,
    loading,
    activePage,
    totalPage,
  } = useElectionSettings();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOnCheck = (data: any) => {
    setElectionSettingsIds(data);
  };

  const handleOnDelete = () => {
    setElectionSettingsIds([]);
  };

  const onSubmitSearch = (data: ElectionSettingsSearchProps) => {
    getElectionSettingsData({
      searchItems: data,
    });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0)
      getElectionSettingsData({ searchItems: params });
  }, []);

  return (
    <div className="container-96 mb-24">
      <Header
        headerText={{ header: t('ELECTION_TRANSFER.ELECTION_TRANSFER') }}
        breadcrumbs={electionTransferBreadcrumbs(t)}
        className="mb-10 pt-10"
      />

      <SearchComponents
        totalCol="grid-cols-lg-9"
        colSpan="col-span-2"
        struct={searchStruct}
        onSubmitHandler={onSubmitSearch}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
        ]}
      />
      <Table
        check={{
          onCheck: handleOnCheck,
          onClickDelete: handleOnDelete,
        }}
        headerExtension={{
          ...electionTransferTableHeader,
          rightComponents: [
            <DownloadButtons
              key={1}
              fileName={'election transfer'}
              columns={electionTransferTableColumns(t)}
              rows={electionSettingsList || []}
            />,
          ],
        }}
        rows={electionSettingsList}
        loading={loading}
        columns={electionTransferTableColumns(t)}
        pagination={{
          language: 'bn',
          totalPage: totalPage,
          activePage: activePage,
          onClick: (page: number) => {
            getElectionSettingsData({ searchItems: params, page: page - 1 });
            setSearchParams({ ...params, page: (page - 1).toString() });
          },
        }}
        showExtendedDeleteView={{
          showExtendedDelete: true,
          showExtendedDeleteComponent: (
            <div>
              <Button onClick={openModal} htmlType="button" size="xs">
                <Text color="primary">{t('ELECTION_TRANSFER.TRANSFER')}</Text>
              </Button>
            </div>
          ),
        }}
      />
      {params?.electionTypeId &&
      permissionsArray?.includes(
        ELECTION_SCHEDULE_DECLARATION.CREATE_MIGRATE_SETTINGS,
      ) ? (
        <Actions
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          electionSettingsIds={electionSettingsIds}
          params={params}
        />
      ) : null}
    </div>
  );
};

export default ElectionTransfer;
