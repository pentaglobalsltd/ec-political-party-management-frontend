import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Header, Table, Text, Modal, DownloadButtons } from '@pentabd/ui';

import CancelRowModal from './CancelRowModal';

import { MAX_ROW_SIZE } from '@constants/table-download-btns';
import {
  voteCenterHaltBreadcrumbs,
  activeTableHeader,
  activeTableColumns,
  cancelledTableHeader,
  cancelledTableColumns,
} from './constants';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useGetUserProfileById } from '@hooks/user-management/useGetUserProfileById';
import { useGetPollingCenterListForARO } from '@hooks/result-management/electoral-process/polling-center-list/useGetPollingCenterListForARO';
import { getParams } from '@utils';

const VoteCenterHalt = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  let userId = keycloak.tokenParsed?.sub;

  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const { getUserProfileByIdData, userProfileById } = useGetUserProfileById();

  const [rowData, setRowData] = useState<any>();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  const electionTypeId = Number(params?.electionTypeId)

  const {
    pollingCenterList: activePollingCentersList,
    getPollingCenterList: getActivePollingCenters,
    activePage: activePollingCentersActivePage,
    totalPage: activePollingCentersTotalPage,
    loading: activePollingCentersLoading,
  } = useGetPollingCenterListForARO();

  const {
    pollingCenterList: haltedCenters,
    getPollingCenterList: getHaltedCenters,
    loading: haltedLoading,
    activePage: haltedActivePage,
    totalPage: haltedTotalPage,
  } = useGetPollingCenterListForARO();

  const {
    pollingCenterList: downloadedActiveCenters,
    getPollingCenterList: downloadActiveCenters,
    loading: downloadActiveLoading,
  } = useGetPollingCenterListForARO();

  const {
    pollingCenterList: downloadedHaltedCenters,
    getPollingCenterList: downloadHaltedCenters,
    loading: downloadHaltedLoading,
  } = useGetPollingCenterListForARO();

  const openCancelModal = (row: any) => {
    setRowData(row);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const handleHaltSuccess = (isHalted: boolean) => {
    if (isHalted && Object.keys(params).length !== 0) {
      getActivePollingCenters({
        page: 0,
        electionTypeId: Number(params?.electionTypeId),
        electionSettingsIds: params?.electionSettingsIds,
        electionScheduleId: Number(params?.electionScheduleId),
        zillaId: Number(params?.zillaId),
        isActive: true,
      });

      getHaltedCenters({
        page: 0,
        electionTypeId: Number(params?.electionTypeId),
        electionSettingsIds: params?.electionSettingsIds,
        electionScheduleId: Number(params?.electionScheduleId),
        zillaId: Number(params?.zillaId),
        isActive: false,
      });
    }
  };

  const getPaginatedCenters = (page: number, isActive: boolean) => {
    setSearchParams({
      ...params,
      page: (page - 1).toString(),
    });

    if (Object.keys(params).length > 0) {
      if (isActive) {
        getActivePollingCenters({
          page: page - 1,
          electionTypeId: Number(params?.electionTypeId),
          electionSettingsIds: params?.electionSettingsIds,
          electionScheduleId: Number(params?.electionScheduleId),
          zillaId: Number(params?.zillaId),
          isActive: Boolean(params?.isActive),
        });
      } else {
        getHaltedCenters({
          page: page - 1,
          electionTypeId: Number(params?.electionTypeId),
          electionSettingsIds: params?.electionSettingsIds,
          electionScheduleId: Number(params?.electionScheduleId),
          zillaId: Number(params?.zillaId),
          isActive: Boolean(params?.isActive),
        });
      }
    }
  };

  // Downloads active polling centers
  const handleDownloadActiveCenters = () => {
    if (Object.keys(params).length > 0) {
      downloadActiveCenters({
        electionTypeId: Number(params?.electionTypeId),
        electionSettingsIds: params?.electionSettingsIds,
        electionScheduleId: Number(params?.electionScheduleId),
        zillaId: Number(params?.zillaId),
        isActive: true,
        size: MAX_ROW_SIZE,
      });
    }
  };

  // Downloads halted polling centers
  const handleDownloadHaltedCenters = () => {
    if (Object.keys(params).length > 0) {
      downloadHaltedCenters({
        electionTypeId: Number(params?.electionTypeId),
        electionSettingsIds: params?.electionSettingsIds,
        electionScheduleId: Number(params?.electionScheduleId),
        zillaId: Number(params?.zillaId),
        isActive: false,
        size: MAX_ROW_SIZE,
      });
    }
  };

  useEffect(() => {
    if (userId) getUserProfileByIdData({ userId, reduxUpdate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (userProfileById && Object.keys(userProfileById).length > 0) {
      const {
        electionTypeId,
        electionScheduleId,
        electionSettingsIds,
        zillaId,
      } = userProfileById;

      let electionSettingsIdsString;
      if (
        Array.isArray(electionSettingsIds) &&
        electionSettingsIds.length > 0
      ) {
        electionSettingsIdsString = electionSettingsIds.join(',');
      }

      setSearchParams({
        page: '0',
        ...(electionTypeId && { electionTypeId: electionTypeId.toString() }),
        ...(electionScheduleId && {
          electionScheduleId: electionScheduleId.toString(),
        }),
        ...(electionSettingsIdsString && {
          electionSettingsIds: electionSettingsIdsString,
        }),
        ...(zillaId && {
          zillaId: zillaId.toString(),
        }),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfileById]);

  useEffect(() => {
    const isAllParamsPresent =
      params?.electionTypeId && params?.electionScheduleId && params?.zillaId;

    if (isAllParamsPresent) {
      getActivePollingCenters({
        page: 0,
        electionTypeId: Number(params?.electionTypeId),
        electionSettingsIds: params?.electionSettingsIds,
        electionScheduleId: Number(params?.electionScheduleId),
        zillaId: Number(params?.zillaId),
        isActive: true,
      });

      getHaltedCenters({
        page: 0,
        electionTypeId: Number(params?.electionTypeId),
        electionSettingsIds: params?.electionSettingsIds,
        electionScheduleId: Number(params?.electionScheduleId),
        zillaId: Number(params?.zillaId),
        isActive: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params?.electionTypeId,
    params?.electionSettingsIds,
    params?.electionScheduleId,
    params?.zillaId,
  ]);

  return (
    <div className="container-96 mb-24">
      <Header
        className="mb-12 pt-14"
        headerText={{
          header: t('VOTE_CENTER_HALT.TITLE'),
        }}
        breadcrumbs={voteCenterHaltBreadcrumbs(t)}
      />

      <div className="pb-12">
        <Text size="xl" weight="bold">
          {t('VOTE_CENTER_HALT.ACTIVE_TABLE_HEADER')}
        </Text>
      </div>

      <Table
        headerExtension={{
          ...activeTableHeader,
          rightComponents: [
            <DownloadButtons
              key={5}
              fileName="download-active-centers"
              columns={activeTableColumns({
                t,
                openCancelModal,
                isDownload: true,
                electionTypeId
              })}
              rows={downloadedActiveCenters}
              onClickDownload={handleDownloadActiveCenters}
              downloadLoading={downloadActiveLoading}
            />,
          ],
        }}
        columns={activeTableColumns({ t, openCancelModal, isDownload: false, electionTypeId })}
        rows={activePollingCentersList}
        loading={activePollingCentersLoading}
        pagination={{
          language: 'bn',
          activePage: activePollingCentersActivePage,
          totalPage: activePollingCentersTotalPage,
          onClick: (page) => getPaginatedCenters(page, true),
        }}
      />

      {isCancelModalOpen ? (
        <Modal
          key={7}
          isOpen={isCancelModalOpen}
          closeAble
          overlay
          portal
          onClose={closeCancelModal}
        >
          <CancelRowModal
            closeCancelModal={closeCancelModal}
            rowData={rowData}
            handleHaltSuccess={handleHaltSuccess}
          />
        </Modal>
      ) : null}

      <div className="pt-24 pb-12">
        <Text size="xl" weight="bold">
          {t('VOTE_CENTER_HALT.CANCELLED_TABLE_HEADER')}
        </Text>
      </div>

      <Table
        headerExtension={{
          ...cancelledTableHeader,
          rightComponents: [
            <DownloadButtons
              key={6}
              fileName="download-halted-centers"
              columns={cancelledTableColumns({
                t,
                openCancelModal,
                isDownload: true,
                electionTypeId
              })}
              rows={downloadedHaltedCenters}
              onClickDownload={handleDownloadHaltedCenters}
              downloadLoading={downloadHaltedLoading}
            />,
          ],
        }}
        columns={cancelledTableColumns({
          t,
          openCancelModal,
          isDownload: false,
          electionTypeId
        })}
        rows={haltedCenters}
        loading={haltedLoading}
        pagination={{
          language: 'bn',
          activePage: haltedActivePage,
          totalPage: haltedTotalPage,
          onClick: (page) => getPaginatedCenters(page, false),
        }}
      />
    </div>
  );
};

export default VoteCenterHalt;
