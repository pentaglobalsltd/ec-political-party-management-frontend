import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IconPlus } from '@pentabd/icons';
import { Button, Header, Table, Text } from '@pentabd/ui';

import { SearchComponents } from '@components/application-search/SearchComponents';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useElectionSettings from '@hooks/election-schedule-management/election/election-settings/useElectionSettingsAggregated';

import { ROUTES } from '@constants/routes';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import { searchStruct } from './searchConstants';
import {
  electionSettingsTableColumns,
  electionSettingsTableBreadcrumbs,
  electionSettingsTableHeader,
} from './constants';

import { getParams } from '@utils';
import { getDigitBanglaFromEnglish } from '@utils';
import { ElectionSettingsSearchProps } from '@type/election-declaration-management/election/election-settings/election-settings-types';
import ExtendedDelete from './components/ExtendedDelete';

function ElectionSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const {
    electionSettingsList,
    getElectionSettingsData,
    loading,
    activePage,
    totalPage,
    totalSettings,
  } = useElectionSettings();

  const rowEditHandler = (row: any) => {
    navigate(ROUTES.EDIT_ELECTION_SETTINGS(row.id));
  };

  const onSubmitSearch = (data: ElectionSettingsSearchProps) => {
    getElectionSettingsData({
      searchItems: data,
    });
  };

  // Table right components download
  const {
    electionSettingsList: downloadElectionSettingsList,
    getElectionSettingsData: downloadGetElectionSettingsData,
    loading: downloadLoading,
  } = useElectionSettings();

  const onClickDownload = () => {
    downloadGetElectionSettingsData({
      searchItems: params,
      size: MAX_ROW_SIZE,
    });
  };

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      getElectionSettingsData({
        page: params?.page ? parseInt(params.page, 10) : 0,
        searchItems: params,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{ header: t('ELECTION_SETTINGS.ELECTION_SETTINGS') }}
        breadcrumbs={electionSettingsTableBreadcrumbs(t)}
        actions={[
          <Button
            key={2}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={() => navigate(ROUTES.CREATE_ELECTION_SETTINGS)}
          >
            <IconPlus size="20" fill="light" /> {t('ELECTION_SETTINGS.ADD_NEW')}
          </Button>,
        ]}
      />

      <SearchComponents
        totalCol="grid-cols-lg-9"
        colSpan="col-span-2"
        struct={searchStruct}
        onSubmitHandler={onSubmitSearch}
        requiredField={[
          SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
          SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
          SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
        ]}
      />

      <Table
        check={{
          onCheck: function noRefCheck() {},
          onClickDelete: function noRefCheck() {},
        }}
        header={{
          ...(totalSettings !== 0 && {
            buttons: [
              <Text
                className="d-flex justify-content-end pb-6"
                size="md"
                weight="semibold"
              >
                {t('ELECTION_SETTINGS.SELECTED_SETTINGS')}{' '}
                {getDigitBanglaFromEnglish(totalSettings)}
              </Text>,
            ],
          }),
        }}
        headerExtension={{
          ...electionSettingsTableHeader,
        }}
        download={{
          fileName: 'election-settings-list',
          columns: electionSettingsTableColumns({
            t,
            rowEditHandler,
            isDownload: true,
            getElectionSettingsData,
            permissionsArray,
          }),
          rows: downloadElectionSettingsList || [],
          onClickDownload: onClickDownload,
          downloadLoading: downloadLoading,
        }}
        rows={electionSettingsList || []}
        columns={electionSettingsTableColumns({
          t,
          rowEditHandler,
          getElectionSettingsData,
          permissionsArray,
        })}
        loading={loading}
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
          showExtendedDeleteComponent: <ExtendedDelete />,
          showExtendedDelete: true,
        }}
      />
    </div>
  );
}

export default ElectionSettings;
