import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { DownloadButtons, Header, Table, Text } from '@pentabd/ui';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useGetMessageSendingList } from '@hooks/result-management/electoral-process/message-sending-list/useGetMessageSendingList';

import { USER_TYPES } from '@constants/user-types';
import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import { MESSAGE_SEND_STATUS } from '@constants/polling-center-results';
import { allSelectedData, searchStruct } from './searchConstants';
import {
  messageSendPublishBreadcrumbs,
  messageSendPublishTableColumnsWaiting,
  messageSendPublishTableColumnsTested,
  messageTestedTableHeader,
  messageWaitingTableHeader,
} from './constant';
import {
  allSelectedDataElectionUser,
  searchStructElectionUser,
} from './searchConstantsElectionUser';
import { getParams } from '@utils';
import { MessageSendListPublishSearch } from './component/MessageSendListPublishSearch';

const MessageSendListPublish = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const { electionTypes: electionTypesRedux } = useFiltersRedux();

  const {
    activePage: activePageWaiting,
    totalPage: totalPageWaiting,
    loading: loadingWaiting,
    messageSendingList: messageSendingListWaiting,
    getMessageSendingList: getMessageSendingListWaiting,
  } = useGetMessageSendingList();

  const {
    activePage: activePageTested,
    totalPage: totalPageTested,
    loading: loadingTested,
    messageSendingList: messageSendingListTested,
    getMessageSendingList: getMessageSendingListTested,
  } = useGetMessageSendingList();

  //for Download
  const {
    messageSendingList: downloadedWaitingList,
    getMessageSendingList: downloadWaitingList,
    loading: downloadWaitingListLoading,
  } = useGetMessageSendingList();

  //for Download
  const {
    messageSendingList: downloadedTestedList,
    getMessageSendingList: downloadTestedList,
    loading: downloadTestedListLoading,
  } = useGetMessageSendingList();

  useEffect(() => {
    if (params?.electionScheduleId && userType === USER_TYPES.ADMIN) {
      getMessageSendingListWaiting({
        scheduleId: params?.electionScheduleId,
        electionSettingsId: params?.electionSettingsId,
        sheetStatus: MESSAGE_SEND_STATUS.FORWARDED,
      });
      getMessageSendingListTested({
        scheduleId: params?.electionScheduleId,
        electionSettingsId: params?.electionSettingsId,
        sheetStatus: MESSAGE_SEND_STATUS.PUBLISHED,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitSearch = (data: any) => {
    if (data?.electionScheduleId) {
      getMessageSendingListWaiting({
        scheduleId: data?.electionScheduleId,
        electionSettingsId: data?.electionSettingsId,
        sheetStatus: MESSAGE_SEND_STATUS.FORWARDED,
      });
      getMessageSendingListTested({
        scheduleId: data?.electionScheduleId,
        electionSettingsId: data?.electionSettingsId,
        sheetStatus: MESSAGE_SEND_STATUS.PUBLISHED,
      });
    }
  };

  // download function
  const handleDownloadWaitingList = () => {
    if (params?.electionScheduleId) {
      downloadWaitingList({
        scheduleId: params?.electionScheduleId,
        electionSettingsId: params?.electionSettingsId,
        sheetStatus: MESSAGE_SEND_STATUS.FORWARDED,
        size: MAX_ROW_SIZE,
      });
    }
  };

  // download function
  const handleDownloadTestedList = () => {
    if (params?.electionScheduleId) {
      downloadTestedList({
        scheduleId: params?.electionScheduleId,
        electionSettingsId: params?.electionSettingsId,
        sheetStatus: MESSAGE_SEND_STATUS.PUBLISHED,
        size: MAX_ROW_SIZE,
      });
    }
  };

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-10 pt-10"
        headerText={{
          header: t('MESSAGE_SEND_LIST_PUBLISH.MESSAGE_SEND_LIST_PUBLISH'),
        }}
        breadcrumbs={messageSendPublishBreadcrumbs(t)}
      />

      <MessageSendListPublishSearch
        onSubmitSearch={onSubmitSearch}
        searchStructAdmin={searchStruct}
        allSelectedDataForSearch={allSelectedData}
        allSelectedDataElectionUser={allSelectedDataElectionUser}
        setSearchParams={setSearchParams}
        searchStructElectionUser={searchStructElectionUser}
      />
      <div className="mb-16">
        <Text weight="semibold" className="display-xs">
          {t('MESSAGE_SEND_LIST_PUBLISH.WAITING_MESSAGE')}
        </Text>
      </div>

      <Table
        headerExtension={{
          ...messageWaitingTableHeader,
          rightComponents: [
            <DownloadButtons
              key={1}
              fileName={'waiting-sheet-list'}
              columns={messageSendPublishTableColumnsWaiting({
                t,
                isDownload: true,
                electionTypeId:
                  userType === USER_TYPES.ADMIN
                    ? Number(params?.electionTypeId)
                    : electionTypesRedux?.[0]?.value,
                candidateTypeId: Number(params?.candidateTypeId),
                getMessageSendingListWaiting,
                getMessageSendingListTested,
              })}
              rows={downloadedWaitingList}
              onClickDownload={handleDownloadWaitingList}
              downloadLoading={downloadWaitingListLoading}
            />,
          ],
        }}
        rows={messageSendingListWaiting}
        columns={messageSendPublishTableColumnsWaiting({
          t,
          isDownload: false,
          electionTypeId:
            userType === USER_TYPES.ADMIN
              ? Number(params?.electionTypeId)
              : electionTypesRedux?.[0]?.value,
          candidateTypeId: Number(params?.candidateTypeId),
          getMessageSendingListWaiting,
          getMessageSendingListTested,
        })}
        loading={loadingWaiting}
        pagination={{
          language: 'bn',
          totalPage: totalPageWaiting,
          activePage: activePageWaiting,

          onClick: (page) => {
            if (params?.electionScheduleId) {
              getMessageSendingListWaiting({
                scheduleId: params?.electionScheduleId,
                electionSettingsId: params?.electionSettingsId,
                sheetStatus: MESSAGE_SEND_STATUS.FORWARDED,
                page: page - 1,
              });
            }
          },
        }}
      />

      <div className="mb-16 mt-14">
        <Text weight="semibold" className="display-xs">
          {t('MESSAGE_SEND_LIST_PUBLISH.TESTED_MESSAGE')}
        </Text>
      </div>

      <Table
        headerExtension={{
          ...messageTestedTableHeader,
          rightComponents: [
            <DownloadButtons
              key={2}
              fileName={'tested-sheet-list'}
              columns={messageSendPublishTableColumnsTested({
                t,
                isDownload: true,
                electionTypeId:
                  userType === USER_TYPES.ADMIN
                    ? Number(params?.electionTypeId)
                    : electionTypesRedux?.[0]?.value,
                candidateTypeId: Number(params?.candidateTypeId),
              })}
              rows={downloadedTestedList}
              onClickDownload={handleDownloadTestedList}
              downloadLoading={downloadTestedListLoading}
            />,
          ],
        }}
        rows={messageSendingListTested}
        columns={messageSendPublishTableColumnsTested({
          t,
          electionTypeId:
            userType === USER_TYPES.ADMIN
              ? Number(params?.electionTypeId)
              : electionTypesRedux?.[0]?.value,
          candidateTypeId: Number(params?.candidateTypeId),
        })}
        loading={loadingTested}
        pagination={{
          language: 'bn',
          totalPage: totalPageTested,
          activePage: activePageTested,

          onClick: (page) => {
            if (params?.electionScheduleId) {
              getMessageSendingListTested({
                scheduleId: params?.electionScheduleId,
                electionSettingsId: params?.electionSettingsId,
                sheetStatus: MESSAGE_SEND_STATUS.PUBLISHED,
                page: page - 1,
              });
            }
          },
        }}
      />
    </div>
  );
};

export default MessageSendListPublish;
