import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Table } from '@pentabd/ui';

import PublishToDashboard from './components/PublishToDashboard';
import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { searchStruct } from './searchConstants';
import {
  messageBoardBreadcrumbs,
  messageBoardTableHeader,
  messageBoardTableColumns,
} from './constants';
import {
  allSelectedData,
  searchStructElectionUser,
} from './searchConstantsElectionUsers';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useGetMessageSendList } from '@hooks/result-management/electoral-process/message-send-list/useGetMessageSendList';
import { getParams } from '@utils';
import { MessageSendListSearch } from './components/MessageSendListSearch';

const MessageSendList = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;
  const permissionsArray = keycloak.realmAccess?.roles;
  const [searchParams, setSearchParams] = useSearchParams();

  const params = getParams(searchParams);
  const { electionTypes: electionTypesRedux } = useFiltersRedux();

  const { activePage, totalPage, loading, messageList, getMessageSendList } =
    useGetMessageSendList();

  const {
    loading: downloadLoading,
    messageList: downloadedMessageList,
    getMessageSendList: downloadMessageList,
  } = useGetMessageSendList();

  const onSubmitSearch = (data: any) => {
    getMessageSendList({
      page: 0,
      electionScheduleId: data.electionScheduleId,
      electionSettingsId: data.electionSettingsId,
      ...(data?.messageSendStatus && { sheetStatus: data.messageSendStatus }),
    });
    setSearchParams({
      ...data,
      page: '0',
    });
  };

  const getPaginatedMessageList = (page: number) => {
    const { electionScheduleId, electionSettingsId, messageSendStatus } =
      params;

    if (electionScheduleId) {
      setSearchParams({
        ...params,
        page: (page - 1).toString(),
      });

      getMessageSendList({
        page: page - 1,
        electionScheduleId: Number(electionScheduleId),
        electionSettingsId: Number(electionSettingsId),
        ...(messageSendStatus &&
          messageSendStatus !== 'undefined' && {
            sheetStatus: messageSendStatus,
          }),
      });
    }
  };

  const onClickDownload = () => {
    const { electionScheduleId, electionSettingsId, messageSendStatus } =
      params;

    if (electionScheduleId && electionSettingsId) {
      downloadMessageList({
        electionScheduleId: Number(electionScheduleId),
        electionSettingsId: Number(electionSettingsId),
        ...(messageSendStatus && {
          sheetStatus: messageSendStatus,
        }),
        size: MAX_ROW_SIZE,
      });
    }
  };

  const getColumns = (isDownload: boolean) => {
    const tableColumns = messageBoardTableColumns({
      t,
      isAdmin: userType === USER_TYPES.ADMIN,
      permissionsArray,
      electionTypeId:
        userType === USER_TYPES.ADMIN
          ? Number(params?.electionTypeId)
          : electionTypesRedux?.[0]?.value,
      candidateTypeId: Number(params?.candidateTypeId),
      isDownload: isDownload,
      getMessageSendList,
    });

    return tableColumns;
  };

  useEffect(() => {
    if (params?.electionScheduleId && params?.electionSettingsId)
      getMessageSendList({
        page: Number(params?.page),
        electionScheduleId: params?.electionScheduleId,
        electionSettingsId: params?.electionSettingsId,
        ...(params?.messageSendStatus && {
          sheetStatus: params.messageSendStatus,
        }),
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-12 pt-14"
        headerText={{
          header: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.TITLE'),
        }}
        breadcrumbs={messageBoardBreadcrumbs(t)}
      />

      <MessageSendListSearch
        onSubmitSearch={onSubmitSearch}
        allSelectedDataForSearch={allSelectedData}
        searchStructAdmin={searchStruct}
        searchStructElectionUser={searchStructElectionUser}
        setSearchParams={setSearchParams}
      />
      <PublishToDashboard />

      <Table
        headerExtension={{
          ...messageBoardTableHeader,
        }}
        download={{
          fileName: 'message-sending-list',
          columns: getColumns(true),
          rows: downloadedMessageList,
          onClickDownload: onClickDownload,
          downloadLoading: downloadLoading,
        }}
        columns={getColumns(false)}
        rows={messageList}
        loading={loading}
        pagination={{
          language: 'bn',
          activePage: activePage,
          totalPage: totalPage,
          onClick: getPaginatedMessageList,
        }}
      />
    </div>
  );
};

export default MessageSendList;
