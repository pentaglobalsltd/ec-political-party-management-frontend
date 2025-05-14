import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Table, Text } from '@pentabd/ui';

import { voterListModalTableColumns } from './constants';
import { useGetPollingCenterListForAroSummary } from '@hooks/result-management/electoral-process/results/useGetPollingCenterListForAroSummary';
interface Props {
  status?: string;
  scheduleId: string | number;
  userId?: string;
  candidateTypeId?: string | number;
}

const VoteCenterListModal = ({
  status,
  scheduleId,
  userId,
  candidateTypeId,
}: Props) => {
  const { t } = useTranslation();
  const [pollingCenters, setPollingCenters] = useState([]);

  const {
    loading: loadingModalTable,
    pollingCenterList: pollingCenterListModal,
    getPollingCenterListForAroSummary: getPollingCenterListModal,
  } = useGetPollingCenterListForAroSummary();

  const {
    loading: adminLoadingModalTable,
    pollingCenterList: adminPollingCenterListModal,
    getPollingCenterListForAroSummary: adminGetPollingCenterListModal,
  } = useGetPollingCenterListForAroSummary();

  useEffect(() => {
    if (userId) {
      adminGetPollingCenterListModal({
        scheduleId,
        status,
        userId,
        candidateTypeId,
        size: 100000,
      });
    } else if (candidateTypeId) {
      getPollingCenterListModal({
        candidateTypeId,
        scheduleId,
        status,
        size: 100000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateTypeId]);

  useEffect(() => {
    if (pollingCenterListModal && !userId) {
      const dataArray = pollingCenterListModal.map((item: any) => ({
        pollingCenterSerial: item?.serial,
        pollingCenterName: item?.pollingCenterName,
      }));

      const sortedData = dataArray?.sort(
        (item: any, nextItem: any) =>
          item?.pollingCenterSerial - nextItem?.pollingCenterSerial,
      );
      setPollingCenters(sortedData);
    } else if (adminPollingCenterListModal && userId) {
      const dataArray = adminPollingCenterListModal.map((item: any) => ({
        pollingCenterSerial: item?.serial,
        pollingCenterName: item?.pollingCenterName,
      }));

      const sortedData = dataArray?.sort(
        (item: any, nextItem: any) =>
          item?.pollingCenterSerial - nextItem?.pollingCenterSerial,
      );
      setPollingCenters(sortedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollingCenterListModal, adminPollingCenterListModal]);

  return (
    <div className="p-12 d-grid grid-cols-lg-4">
      <div className="col-span-lg-4">
        <Text weight="semibold" size="md">
          {t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.VOTE_CENTER_LIST_CENTER',
          )}
        </Text>

        <div className="mt-16">
          <Table
            columns={voterListModalTableColumns(t)}
            rows={pollingCenters}
            loading={userId ? adminLoadingModalTable : loadingModalTable}
            loadingItemCount={4}
          />
        </div>
      </div>
    </div>
  );
};

export default VoteCenterListModal;
