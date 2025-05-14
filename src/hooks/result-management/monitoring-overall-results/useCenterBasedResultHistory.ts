import { useState } from 'react';
import {
  CenterBasedResultHistoryPropsTypes,
  PollingCenterResultLogs,
} from '@type/result-management/result-monitoring/monitoring-overall-result-types';
import { fetchCenterBasedResultHistory } from '@api/result-management/results-monitoring/monitoring-overall-results/center-based-result-history';

export const useCenterBasedResultHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [centerBasedResultHistory, setCenterBasedResultHistory] =
    useState<PollingCenterResultLogs[]>();
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getCenterBasedResultHistory = async ({
    scheduleId,
    resultId,
    page,
    size = 10,
  }: CenterBasedResultHistoryPropsTypes) => {
    try {
      setLoading(true);
      const response = await fetchCenterBasedResultHistory({
        scheduleId,
        resultId,
        page,
        size,
      });
      if (response?.data?.status === 200) {
        setCenterBasedResultHistory(
          response?.data?.data?.pollingCenterResultLogs,
        );

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );

        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    getCenterBasedResultHistory,
    centerBasedResultHistory,
    totalPage,
    activePage,
  };
};
